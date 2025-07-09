import "./global.css";

import { Toaster } from "@/components/ui/toaster";

// Suppress Recharts defaultProps warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args[0]?.toString?.() || "";
  const fullMessage = args.join(" ");

  // Suppress all defaultProps warnings (includes template string patterns)
  if (
    message.includes("defaultProps will be removed from function components") ||
    fullMessage.includes(
      "defaultProps will be removed from function components",
    ) ||
    message.includes("Support for defaultProps will be removed")
  ) {
    return;
  }

  // Suppress specific Recharts component warnings by name
  if (
    fullMessage.includes("XAxis") ||
    fullMessage.includes("YAxis") ||
    fullMessage.includes("CartesianGrid") ||
    fullMessage.includes("Tooltip") ||
    fullMessage.includes("Area") ||
    fullMessage.includes("Line") ||
    fullMessage.includes("Bar") ||
    fullMessage.includes("Pie") ||
    fullMessage.includes("Cell") ||
    fullMessage.includes("ResponsiveContainer") ||
    fullMessage.includes("Legend") ||
    fullMessage.includes("ReferenceLine") ||
    fullMessage.includes("ReferenceArea") ||
    fullMessage.includes("Brush")
  ) {
    return;
  }

  // Suppress any warning that contains Recharts-related keywords
  if (
    fullMessage.includes("recharts") ||
    fullMessage.includes("Recharts") ||
    (message.includes("%s") &&
      args.some(
        (arg) =>
          typeof arg === "string" &&
          (arg.includes("Axis") ||
            arg.includes("Chart") ||
            arg.includes("Grid") ||
            arg.includes("Tooltip")),
      ))
  ) {
    return;
  }

  originalWarn.apply(console, args);
};
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/ui/navigation";
import { AuthProvider, ProtectedRoute } from "@/components/auth/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import ChatPage from "./pages/ChatPage";
import MessagesPage from "./pages/MessagesPage";
import CalendarPage from "./pages/CalendarPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const hideNavigation = [
    "/signup",
    "/login",
    "/dashboard",
    "/agent-dashboard",
    "/org-dashboard",
    "/chat",
    "/messages",
    "/calendar",
    "/support",
    "/settings",
    "/profile",
  ].includes(location.pathname);

  return (
    <>
      {!hideNavigation && <Navigation />}
      <main className={!hideNavigation ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent-dashboard"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/org-dashboard"
            element={
              <ProtectedRoute allowedRoles={["organization"]}>
                <OrganizationDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <CalendarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <SupportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
