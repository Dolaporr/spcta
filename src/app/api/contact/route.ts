import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ── Configure your SMTP provider here ─────────────────────
   Options:
   A) Gmail: host: "smtp.gmail.com", port: 587, user: yourEmail, pass: App Password
   B) Resend SMTP: host: "smtp.resend.com", port: 465, user: "resend", pass: RE_API_KEY
   C) Set env vars in .env.local (recommended)
   ─────────────────────────────────────────────────────────── */
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST     || "smtp.gmail.com",
  port:   Number(process.env.SMTP_PORT)  || 587,
  secure: process.env.SMTP_SECURE   === "true",
  auth: {
    user: process.env.SMTP_USER     || "",
    pass: process.env.SMTP_PASS     || "",
  },
});

const SPCTA_EMAILS = ["charles@spcta.green", "tunji.alade@spcta.green"];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      stakeholderType, fullName, jobTitle, companyName,
      city, country, email, phone, request,
    } = data;

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
              ["Phone",            phone || "—"],
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

    // Send to SPCTA team
    await transporter.sendMail({
      from:    `"SPCTA Website" <${process.env.SMTP_USER}>`,
      to:      SPCTA_EMAILS.join(", "),
      subject: `New Partnership Enquiry — ${fullName} (${companyName})`,
      html:    submissionHtml,
    });

    // Send confirmation to submitter
    await transporter.sendMail({
      from:    `"SPCTA Industrial" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: "Thank you for your interest in SPCTA Industrial",
      html:    confirmationHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
