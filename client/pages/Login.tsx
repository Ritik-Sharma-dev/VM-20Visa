import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Globe,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  CheckCircle,
  Plane,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"client" | "agent" | "organization">(
    "client",
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    { value: "client", label: "Client", icon: Users },
    { value: "agent", label: "Agent", icon: Shield },
    { value: "organization", label: "Organization", icon: Globe },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password, userType);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-royal-blue-900 via-royal-blue-700 to-sky-blue-600 text-white p-12 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center space-x-3 mb-8"
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold">VM Visa</h1>
              <p className="text-sky-blue-200 text-sm">Global Immigration</p>
            </div>
          </motion.div>

          {/* Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative w-64 h-48 mx-auto">
              {/* Animated airplane */}
              <motion.div
                animate={{
                  x: [0, 200, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-16 left-8"
              >
                <Plane className="w-8 h-8 text-gold-400 transform rotate-45" />
              </motion.div>

              {/* World dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="w-3 h-3 bg-gold-400 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="w-2 h-2 bg-sky-blue-300 rounded-full absolute top-8 left-16"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="w-2 h-2 bg-mint-green-400 rounded-full absolute bottom-8 right-16"
                />
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Your Gateway to Global Opportunities
            </h2>
            <p className="text-sky-blue-200 text-lg leading-relaxed">
              Join thousands of successful applicants who achieved their
              immigration dreams with VM Visa.
            </p>
          </motion.div>

          {/* Success Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 mt-12"
          >
            {[
              { stat: "50K+", label: "Success Stories" },
              { stat: "150+", label: "Countries" },
              { stat: "98%", label: "Success Rate" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-heading font-bold text-gold-400 mb-1">
                  {item.stat}
                </div>
                <div className="text-sky-blue-200 text-sm">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-br from-white to-royal-blue-50/30"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-royal rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold gradient-text">
                VM Visa
              </h1>
              <p className="text-xs text-cool-gray-600">Global Immigration</p>
            </div>
          </div>

          {/* Form Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-cool-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-cool-gray-600">
              Sign in to access your immigration dashboard
            </p>
          </motion.div>

          {/* User Type Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <Label className="text-sm font-medium text-cool-gray-700 mb-3 block">
              Login as:
            </Label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-cool-gray-100 rounded-xl">
              {userTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setUserType(type.value as typeof userType)}
                  className={cn(
                    "flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                    userType === type.value
                      ? "bg-white text-royal-blue-700 shadow-sm"
                      : "text-cool-gray-600 hover:text-cool-gray-800",
                  )}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="hidden sm:block">{type.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your email"
                className={cn(
                  "mt-1",
                  errors.email && "border-red-500 focus:border-red-500",
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Enter your password"
                  className={cn(
                    "pr-12",
                    errors.password && "border-red-500 focus:border-red-500",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cool-gray-500 hover:text-cool-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-royal-blue-600 hover:text-royal-blue-700 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cool-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-cool-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
          </motion.form>

          {/* Signup Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-cool-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-royal-blue-600 hover:text-royal-blue-700 font-semibold hover:underline transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
