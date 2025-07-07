import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  GraduationCap,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
}

interface FormData {
  // Common fields
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;

  // Agent specific
  experience?: string;
  expertise?: string[];
  license?: File | null;
  bio?: string;

  // Organization specific
  orgName?: string;
  adminName?: string;
  website?: string;
}

interface MultiStepFormProps {
  type: "client" | "agent" | "organization";
  onSubmit: (data: FormData) => void;
  onBack?: () => void;
}

export function MultiStepForm({ type, onSubmit, onBack }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
    experience: "",
    expertise: [],
    license: null,
    bio: "",
    orgName: "",
    adminName: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load saved form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`vm-visa-signup-${type}`);
    if (saved) {
      setFormData({ ...formData, ...JSON.parse(saved) });
    }
  }, [type]);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem(`vm-visa-signup-${type}`, JSON.stringify(formData));
  }, [formData, type]);

  const expertiseOptions = [
    "Canada PR",
    "Study Visa",
    "Work Permit",
    "Business Immigration",
    "Family Sponsorship",
    "Tourist Visa",
    "Asylum & Refugee",
    "Express Entry",
  ];

  const getSteps = (): Step[] => {
    if (type === "client") {
      return [
        {
          title: "Personal Information",
          subtitle: "Let's start with your name",
          icon: User,
        },
        {
          title: "Account Details",
          subtitle: "Create your secure account",
          icon: Mail,
        },
        {
          title: "Contact Information",
          subtitle: "How can we reach you?",
          icon: Phone,
        },
        { title: "Complete Setup", subtitle: "Review and submit", icon: Check },
      ];
    } else if (type === "agent") {
      return [
        {
          title: "Personal Information",
          subtitle: "Let's start with your name",
          icon: User,
        },
        {
          title: "Account Details",
          subtitle: "Create your secure account",
          icon: Mail,
        },
        {
          title: "Contact Information",
          subtitle: "How can we reach you?",
          icon: Phone,
        },
        {
          title: "Professional Experience",
          subtitle: "Tell us about your expertise",
          icon: Briefcase,
        },
        {
          title: "Areas of Expertise",
          subtitle: "What services do you specialize in?",
          icon: GraduationCap,
        },
        {
          title: "Professional Profile",
          subtitle: "Complete your profile",
          icon: Upload,
        },
        { title: "Complete Setup", subtitle: "Review and submit", icon: Check },
      ];
    } else {
      return [
        {
          title: "Organization Details",
          subtitle: "Tell us about your organization",
          icon: Building,
        },
        {
          title: "Contact Information",
          subtitle: "How can we reach you?",
          icon: Mail,
        },
        {
          title: "Additional Details",
          subtitle: "Complete your setup",
          icon: Globe,
        },
        { title: "Complete Setup", subtitle: "Review and submit", icon: Check },
      ];
    }
  };

  const steps = getSteps();

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (type === "client") {
      switch (step) {
        case 0:
          if (!formData.fullName.trim())
            newErrors.fullName = "Full name is required";
          break;
        case 1:
          if (!formData.email.trim()) newErrors.email = "Email is required";
          if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email format";
          if (!formData.password) newErrors.password = "Password is required";
          if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
          if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords don't match";
          break;
        case 2:
          if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
          break;
        case 3:
          if (!formData.agreeToTerms)
            newErrors.agreeToTerms = "You must agree to the terms";
          break;
      }
    } else if (type === "agent") {
      switch (step) {
        case 0:
          if (!formData.fullName.trim())
            newErrors.fullName = "Full name is required";
          break;
        case 1:
          if (!formData.email.trim()) newErrors.email = "Email is required";
          if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email format";
          if (!formData.password) newErrors.password = "Password is required";
          if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
          if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords don't match";
          break;
        case 2:
          if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
          break;
        case 3:
          if (!formData.experience?.trim())
            newErrors.experience = "Experience is required";
          break;
        case 4:
          if (!formData.expertise?.length)
            newErrors.expertise =
              "Please select at least one area of expertise";
          break;
        case 6:
          if (!formData.agreeToTerms)
            newErrors.agreeToTerms = "You must agree to the terms";
          break;
      }
    } else {
      switch (step) {
        case 0:
          if (!formData.orgName?.trim())
            newErrors.orgName = "Organization name is required";
          if (!formData.adminName?.trim())
            newErrors.adminName = "Admin name is required";
          break;
        case 1:
          if (!formData.email.trim()) newErrors.email = "Email is required";
          if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email format";
          if (!formData.email.includes("@vmvisa.com"))
            newErrors.email = "Must be a @vmvisa.com email";
          if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
          break;
        case 2:
          if (!formData.password) newErrors.password = "Password is required";
          if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
          if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords don't match";
          break;
        case 3:
          if (!formData.agreeToTerms)
            newErrors.agreeToTerms = "You must agree to the terms";
          break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.removeItem(`vm-visa-signup-${type}`);
    onSubmit(formData);
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderStepContent = () => {
    if (type === "client") {
      switch (currentStep) {
        case 0:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className={cn(errors.fullName && "border-red-500")}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
            </div>
          );

        case 1:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="Enter your email address"
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Create a secure password"
                  className={cn(errors.password && "border-red-500")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  className={cn(errors.confirmPassword && "border-red-500")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          );

        case 2:
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={cn(errors.phone && "border-red-500")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-heading font-bold mb-4">
                  Review Your Information
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Name:</strong> {formData.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    updateFormData("agreeToTerms", checked)
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-royal-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-royal-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
              )}
            </div>
          );
      }
    }

    // Add similar cases for agent and organization types...
    // This is a simplified version focusing on the client flow

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    index <= currentStep
                      ? "bg-gradient-royal text-white border-royal-blue-500"
                      : "bg-white text-cool-gray-500 border-cool-gray-300",
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  <step.icon className="w-5 h-5" />
                </motion.div>

                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-6 left-12 w-full h-0.5 transition-colors duration-300",
                      index < currentStep
                        ? "bg-royal-blue-500"
                        : "bg-cool-gray-300",
                    )}
                    style={{ width: "calc(100% + 3rem)" }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-cool-gray-800 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-cool-gray-600">{steps[currentStep].subtitle}</p>
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          className="glass-card p-8 rounded-3xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-cool-gray-200">
            <Button
              variant="ghost"
              onClick={currentStep === 0 ? onBack : handlePrevious}
              className="group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {currentStep === 0 ? "Back to Selection" : "Previous"}
            </Button>

            <Button variant="premium" onClick={handleNext} className="group">
              {currentStep === steps.length - 1
                ? "Complete Signup"
                : "Next Step"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
