import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ── Configure your SMTP provider here ─────────────────────
   Options:
   A) Gmail: host: "smtp.gmail.com", port: 587, user: yourEmail, pass: App Password
   B) Resend SMTP: host: "smtp.resend.com", port: 465, user: "resend", pass: RE_API_KEY
   C) Set env vars in .env.local (recommended)
   ─────────────────────────────────────────────────────────── */
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const useResendApi = smtpHost === "smtp.resend.com";
const defaultFromEmail = useResendApi
  ? process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"
  : smtpUser;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const SPCTA_EMAILS = ["charles@spcta.green", "tunji.alade@spcta.green"];
const HUBSPOT_API_BASE = "https://api.hubapi.com";

type ContactPayload = {
  stakeholderType: string;
  fullName: string;
  jobTitle: string;
  companyName: string;
  city: string;
  country: string;
  email: string;
  phone?: string;
  request: string;
};

type EmailPayload = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function hubspotRequest<T>(path: string, init: RequestInit): Promise<T> {
  const token = requireEnv("HUBSPOT_ACCESS_TOKEN");
  const res = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HubSpot request failed (${res.status}): ${errorText}`);
  }

  return res.json() as Promise<T>;
}

async function upsertHubSpotContact(data: ContactPayload) {
  const [firstname, ...restName] = data.fullName.trim().split(/\s+/);
  const lastname = restName.join(" ");
  const properties = {
    email: data.email,
    firstname: firstname || data.fullName,
    lastname,
    company: data.companyName,
    city: data.city,
    country: data.country,
    phone: data.phone || "",
    jobtitle: data.jobTitle,
  };

  const contact = await hubspotRequest<{ results?: Array<{ id: string }> }>(
    "/crm/v3/objects/contacts/batch/upsert",
    {
      method: "POST",
      body: JSON.stringify({
        inputs: [
          {
            idProperty: "email",
            id: data.email,
            properties,
          },
        ],
      }),
    },
  );

  const contactId = contact.results?.[0]?.id;
  if (!contactId) {
    throw new Error("HubSpot upsert did not return a contact id");
  }

  return contactId;
}

async function syncHubSpotContact(data: ContactPayload) {
  await upsertHubSpotContact(data);
}

async function sendResendEmail({ from, to, subject, html, replyTo }: EmailPayload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${smtpPass}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      reply_to: replyTo,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend API request failed (${res.status}): ${errorText}`);
  }
}

async function sendEmail(payload: EmailPayload) {
  if (useResendApi) {
    await sendResendEmail(payload);
    return;
  }

  await transporter.sendMail({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    replyTo: payload.replyTo,
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      stakeholderType, fullName, jobTitle, companyName,
      city, country, email, phone, request,
    } = data;

    const submission: ContactPayload = {
      stakeholderType,
      fullName,
      jobTitle,
      companyName,
      city,
      country,
      email,
      phone,
      request,
    };

    const submissionHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#1A69B2;padding:32px;text-align:center">
          <h2 style="color:#fff;margin:0;letter-spacing:0.05em">SPCTA Industrial</h2>
          <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:13px">New Partnership Enquiry</p>
        </div>
        <div style="padding:32px;background:#f9f9f9;border:1px solid #e5e5e5">
          <table style="width:100%;border-collapse:collapse">
            ${[
              ["Stakeholder Type", stakeholderType],
              ["Full Name",        fullName],
              ["Job Title",        jobTitle],
              ["Company",          companyName],
              ["Location",         `${city}, ${country}`],
              ["Email",            email],
              ["Phone",            phone || "-"],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:10px 16px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#666;width:160px;border-bottom:1px solid #e5e5e5">${label}</td>
                <td style="padding:10px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #e5e5e5">${value}</td>
              </tr>`).join("")}
          </table>
          <div style="margin-top:24px;padding:20px;background:#fff;border:1px solid #e5e5e5;border-radius:4px">
            <p style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#666;margin:0 0 10px">Request</p>
            <p style="font-size:14px;color:#1a1a1a;margin:0;line-height:1.7">${request}</p>
          </div>
        </div>
        <div style="padding:20px 32px;background:#f0f0f0;text-align:center">
          <p style="font-size:12px;color:#888;margin:0">Submitted via spcta.green contact form</p>
        </div>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#1A69B2;padding:40px;text-align:center">
          <h2 style="color:#fff;margin:0 0 8px;letter-spacing:0.05em">SPCTA Industrial</h2>
          <p style="color:rgba(255,255,255,0.75);margin:0;font-size:14px">Infrastructure for Circular Supply Chains</p>
        </div>
        <div style="padding:40px 48px;background:#fff;border:1px solid #e5e5e5">
          <p style="font-size:16px;color:#1a1a1a;margin:0 0 16px">Dear ${fullName},</p>
          <p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 20px">
            Thank you for your interest in SPCTA Industrial. A member of our team will reach out to you shortly.
          </p>
          <p style="font-size:14px;line-height:1.7;color:#666;margin:0 0 32px">
            We look forward to exploring how SPCTA can support your circular supply chain goals.
          </p>
          <div style="background:#f9f9f9;border-left:3px solid #1A69B2;padding:16px 20px;margin-bottom:32px">
            <p style="font-size:13px;font-weight:600;color:#1a1a1a;margin:0 0 4px">SPCTA Industrial</p>
            <p style="font-size:13px;color:#666;margin:0">charles@spcta.green</p>
          </div>
        </div>
        <div style="padding:24px 48px;background:#f0f0f0;text-align:center">
          <p style="font-size:12px;color:#888;margin:0">© 2026 SPCTA Industrial. Infrastructure for circular supply chains.</p>
        </div>
      </div>
    `;

    await syncHubSpotContact(submission);

    // Send to SPCTA team
    await sendEmail({
      from: `"SPCTA Website" <${defaultFromEmail}>`,
      to: SPCTA_EMAILS,
      subject: `New Partnership Enquiry - ${fullName} (${companyName})`,
      html: submissionHtml,
      replyTo: email,
    });

    // Send confirmation to submitter
    await sendEmail({
      from: `"SPCTA Industrial" <${defaultFromEmail}>`,
      to: email,
      subject: "Thank you for your interest in SPCTA Industrial",
      html: confirmationHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
