import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Test Hero Section */}
      <section className="py-24 bg-gradient-to-b from-white to-royal-blue-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
              Your Gateway to{" "}
              <span className="gradient-text">Global Dreams</span>
            </h1>
            <p className="text-xl text-cool-gray-600 max-w-3xl mx-auto mb-8">
              Navigate your immigration journey with confidence. Expert guidance
              for all your visa needs.
            </p>
            <Button variant="premium" size="lg">
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
