import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Simple footer for now */}
      <section className="py-12 bg-cool-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 VM Visa. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}
