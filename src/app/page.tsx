"use client";
import { useState } from "react";
import SiteHeader from "@/components/ui/SiteHeader";
import ContactModal from "@/components/ui/ContactModal";
import Hero from "@/components/sections/Hero";
import {
  Problem, Positioning, SystemOverview, Products,
  HowItWorks, Outcomes, WhySPCTA, Proof,
  Audiences, FinalCTA, FAQ, SiteFooter,
} from "@/components/sections/Sections";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const open  = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <>
      <SiteHeader onOpenModal={open} />
      <ContactModal isOpen={modalOpen} onClose={close} />
      <main id="main-content">
        <Hero onOpenModal={open} />
        <Problem />
        <Positioning />
        <SystemOverview />
        <Products onOpenModal={open} />
        <HowItWorks />
        <Outcomes />
        <WhySPCTA />
        <Proof />
        <Audiences />
        <FinalCTA onOpenModal={open} />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}
