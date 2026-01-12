import Hero from "@/components/sections/Hero";
import React from "react";
import WhyChoose from "@/components/sections/WhyChoose";
import HowItWorks from "@/components/sections/HowItWorks";
import Impact from "@/components/sections/Impact";
import GetInTouch from "@/components/sections/GetInTouch";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
  <>
  <Hero />
  <WhyChoose />
  <HowItWorks />
  <Impact />
  <GetInTouch />
  <FinalCTA />
  </>
);
}