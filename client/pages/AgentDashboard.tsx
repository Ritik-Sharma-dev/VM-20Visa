import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Search,
  Plus,
  Calendar,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
  User,
  LogOut,
  FileText,
  Users,
  Upload,
  Star,
  MessageCircle,
  Menu,
  Eye,
  Edit,
  Shield,
  Home,
  Inbox,
  Briefcase,
  MessagesSquare,
  HelpCircle,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  UserCheck,
  Building,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import dashboard components for agent
import { AgentOverview } from "@/components/dashboard/agent/agent-overview";
import { IncomingRequests } from "@/components/dashboard/agent/incoming-requests";
import { MyProposals } from "@/components/dashboard/agent/my-proposals";
import { ActiveProjects } from "@/components/dashboard/agent/active-projects";
import { ClientChat } from "@/components/dashboard/agent/client-chat";
import { AgentDocuments } from "@/components/dashboard/agent/agent-documents";
import { AgentAnalytics } from "@/components/dashboard/agent/agent-analytics";
import { AgentSettings } from "@/components/dashboard/agent/agent-settings";
import { ProfessionalSidebar } from "@/components/dashboard/shared/ProfessionalSidebar";
import { useAuth } from "@/components/auth/auth-context";

type AgentDashboardView =
  | "overview"
  | "incoming-requests"
  | "my-proposals"
  | "active-projects"
  | "documents"
  | "analytics";

type FilterPeriod = "today" | "7days" | "month" | "year";

export default function AgentDashboard() {
  const [currentView, setCurrentView] =
    useState<AgentDashboardView>("overview");
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("month");
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [autoCollapseTimer, setAutoCollapseTimer] =
    useState<NodeJS.Timeout | null>(null);
  const { logout } = useAuth();

  // Auto-save functionality
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "vm-visa-agent-dashboard-state",
        JSON.stringify({
          currentView,
          sidebarCollapsed,
          filterPeriod,
          timestamp: Date.now(),
        }),
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentView, sidebarCollapsed, filterPeriod]);

  // Restore saved state
  useEffect(() => {
    const saved = localStorage.getItem("vm-visa-agent-dashboard-state");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const timeDiff = Date.now() - state.timestamp;

        // Only restore if less than 24 hours old
        if (timeDiff < 24 * 60 * 60 * 1000) {
          setCurrentView(state.currentView);
          setSidebarCollapsed(state.sidebarCollapsed || false);
          setFilterPeriod(state.filterPeriod || "month");
        }
      } catch (error) {
        console.error("Failed to restore agent dashboard state:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Navigation handler for sidebar
  const handleSidebarNavigation = (page: string) => {
    if (page === "overview") {
      setCurrentView("overview");
    } else if (
      ["chat", "messages", "calendar", "support", "settings"].includes(page)
    ) {
      navigate(`/${page}`);
    }
  };

  // Auto-collapse functionality
  const startAutoCollapseTimer = () => {
    if (autoCollapseTimer) {
      clearTimeout(autoCollapseTimer);
    }
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 10000);
    setAutoCollapseTimer(timer);
  };

  const clearAutoCollapseTimer = () => {
    if (autoCollapseTimer) {
      clearTimeout(autoCollapseTimer);
      setAutoCollapseTimer(null);
    }
  };

  const handleSidebarToggle = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);

    if (!newState) {
      startAutoCollapseTimer();
    } else {
      clearAutoCollapseTimer();
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      clearAutoCollapseTimer();
    };
  }, [autoCollapseTimer]);

  const filterTabs = [
    { id: "today", label: "Today" },
    { id: "7days", label: "7 Days" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ] as const;

  const tabItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "incoming-requests",
      label: "Incoming Requests",
      icon: Inbox,
      badge: "12",
    },
    {
      id: "my-proposals",
      label: "My Proposals",
      icon: FileText,
      badge: "8",
    },
    {
      id: "active-projects",
      label: "Active Projects",
      icon: Briefcase,
      badge: "5",
    },
    {
      id: "documents",
      label: "Documents",
      icon: Upload,
      badge: null,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null,
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <AgentOverview filterPeriod={filterPeriod} />;
      case "incoming-requests":
        return <IncomingRequests />;
      case "my-proposals":
        return <MyProposals />;
      case "active-projects":
        return <ActiveProjects />;
      case "documents":
        return <AgentDocuments />;
      case "analytics":
        return <AgentAnalytics filterPeriod={filterPeriod} />;
      default:
        return <AgentOverview filterPeriod={filterPeriod} />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "overview":
        return "Dashboard Overview";
      case "incoming-requests":
        return "Incoming Requests";
      case "my-proposals":
        return "My Proposals";
      case "active-projects":
        return "Active Projects";
      case "documents":
        return "Document Center";
      case "analytics":
        return "Analytics & Reports";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FEFEFE" }}>
      {/* Professional Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <ProfessionalSidebar
          userType="agent"
          currentPage={currentView}
          onNavigate={handleSidebarNavigation}
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "320px",
        }}
      >
        {/* Top Header */}
        <header
          className="shadow-sm px-8 py-4"
          style={{
            backgroundColor: "#FEFEFE",
            borderBottom: "1px solid #E1E8ED",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#455A64" }}>
                {getPageTitle()}
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "#455A64", opacity: 0.7 }}
              >
                Manage your immigration services and client relationships
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Filter Period Tabs */}
              {(currentView === "overview" || currentView === "analytics") && (
                <div className="flex border border-gray-300 rounded-lg p-1">
                  {filterTabs.map((tab) => (
                    <Button
                      key={tab.id}
                      onClick={() => setFilterPeriod(tab.id)}
                      variant="ghost"
                      size="sm"
                      className={`rounded-md ${
                        filterPeriod === tab.id ? "bg-white shadow-sm" : ""
                      }`}
                      style={{
                        backgroundColor:
                          filterPeriod === tab.id ? "#E0F2E7" : "transparent",
                        color: "#455A64",
                      }}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Actions */}
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300"
                style={{ color: "#455A64" }}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>

              {/* Notifications */}
              <Button
                variant="outline"
                size="sm"
                className="relative border-gray-300"
                style={{ color: "#455A64" }}
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center">
                  8
                </Badge>
              </Button>

              {/* Profile */}
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: "#0288D1" }}
                >
                  SA
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#455A64" }}
                >
                  Sarah Ahmad
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-8">
          {/* Tab Navigation */}
          <div className="mb-6 flex space-x-1 border-b border-gray-200">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentView === tab.id;

              return (
                <Button
                  key={tab.id}
                  onClick={() => setCurrentView(tab.id as AgentDashboardView)}
                  variant="ghost"
                  className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                    isActive
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{
                    color: isActive ? "#0288D1" : "#455A64",
                    backgroundColor: "transparent",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.badge && (
                    <Badge
                      className="ml-1"
                      style={{
                        backgroundColor: isActive ? "#0288D1" : "#F3E5F5",
                        color: isActive ? "white" : "#455A64",
                      }}
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
