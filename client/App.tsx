import "./global.css";

import { Toaster } from "@/components/ui/toaster";
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
          {/* Placeholder routes for agent and org dashboards */}
          <Route
            path="/agent-dashboard"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20">
                  <div className="text-center">
                    <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-4">
                      Agent Dashboard
                    </h1>
                    <p className="text-cool-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/org-dashboard"
            element={
              <ProtectedRoute allowedRoles={["organization"]}>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20">
                  <div className="text-center">
                    <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-4">
                      Organization Dashboard
                    </h1>
                    <p className="text-cool-gray-600">Coming soon...</p>
                  </div>
                </div>
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
