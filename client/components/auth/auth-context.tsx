import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "agent" | "organization";
  avatar?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: string) => Promise<void>;
  logout: () => void;
  signup: (userData: any, userType: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("vm-visa-auth-token");
        const userData = localStorage.getItem("vm-visa-user-data");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);

          // Auto-redirect based on role
          const currentPath = window.location.pathname;
          if (
            currentPath === "/" ||
            currentPath === "/login" ||
            currentPath === "/signup"
          ) {
            redirectToDashboard(parsedUser.role);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("vm-visa-auth-token");
        localStorage.removeItem("vm-visa-user-data");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const redirectToDashboard = (role: string) => {
    switch (role) {
      case "client":
        navigate("/dashboard", { replace: true });
        break;
      case "agent":
        navigate("/agent-dashboard", { replace: true });
        break;
      case "organization":
        navigate("/org-dashboard", { replace: true });
        break;
      default:
        navigate("/dashboard", { replace: true });
    }
  };

  const login = async (email: string, password: string, userType: string) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data based on type
      const mockUser: User = {
        id: "user-123",
        name:
          userType === "client"
            ? "John Doe"
            : userType === "agent"
              ? "Sarah Chen"
              : "VM Visa Corp",
        email: email,
        role: userType as "client" | "agent" | "organization",
        avatar:
          userType === "client" ? "👨‍💼" : userType === "agent" ? "👩‍💼" : "🏢",
        isVerified: true,
      };

      // Store auth data
      const token = "mock-jwt-token-" + Date.now();
      localStorage.setItem("vm-visa-auth-token", token);
      localStorage.setItem("vm-visa-user-data", JSON.stringify(mockUser));

      setUser(mockUser);

      // Show welcome message
      setTimeout(() => {
        showWelcomeToast(mockUser.name, mockUser.role);
      }, 100);

      // Redirect to appropriate dashboard
      redirectToDashboard(mockUser.role);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any, userType: string) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newUser: User = {
        id: "user-" + Date.now(),
        name: userData.fullName || userData.adminName || userData.orgName,
        email: userData.email,
        role: userType as "client" | "agent" | "organization",
        avatar:
          userType === "client" ? "👨‍💼" : userType === "agent" ? "👩‍💼" : "🏢",
        isVerified: userType !== "agent", // Agents need verification
      };

      // Store auth data
      const token = "mock-jwt-token-" + Date.now();
      localStorage.setItem("vm-visa-auth-token", token);
      localStorage.setItem("vm-visa-user-data", JSON.stringify(newUser));

      setUser(newUser);

      // Show welcome message
      setTimeout(() => {
        showWelcomeToast(newUser.name, newUser.role, true);
      }, 100);

      // Redirect to appropriate dashboard
      redirectToDashboard(newUser.role);
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("vm-visa-auth-token");
    localStorage.removeItem("vm-visa-user-data");
    localStorage.removeItem("vm-visa-dashboard-state");
    setUser(null);
    navigate("/", { replace: true });

    // Show logout message
    showToast("Logged out successfully", "info");
  };

  const showWelcomeToast = (name: string, role: string, isNewUser = false) => {
    const message = isNewUser
      ? `Welcome to VM Visa, ${name}! Your ${role} account has been created successfully.`
      : `Welcome back, ${name}!`;

    showToast(message, "success");
  };

  const showToast = (message: string, type: "success" | "info" = "success") => {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className = `fixed top-6 right-6 z-50 p-4 rounded-xl shadow-xl border max-w-sm transform transition-all duration-300 ${
      type === "success"
        ? "bg-sage-green-50 text-sage-green-800 border-sage-green-200"
        : "bg-sky-blue-50 text-sky-blue-800 border-sky-blue-200"
    }`;
    toast.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-6 h-6 rounded-full ${
          type === "success" ? "bg-sage-green-500" : "bg-sky-blue-500"
        } flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${
              type === "success"
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
            }
          </svg>
        </div>
        <p class="font-medium">${message}</p>
      </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 5000);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Protected Route Component
export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
    } else if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard if user doesn't have access
      switch (user.role) {
        case "client":
          navigate("/dashboard", { replace: true });
          break;
        case "agent":
          navigate("/agent-dashboard", { replace: true });
          break;
        case "organization":
          navigate("/org-dashboard", { replace: true });
          break;
      }
    }
  }, [user, isLoading, allowedRoles, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-heading font-bold text-cool-gray-800 mb-2">
            Loading...
          </h2>
          <p className="text-cool-gray-600">
            Please wait while we set up your dashboard
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
