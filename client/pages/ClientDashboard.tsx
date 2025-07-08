import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  Search,
  Plus,
  Bot,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import dashboard components
import { MyRequests } from "@/components/dashboard/my-requests";
import { AgentProposals } from "@/components/dashboard/agent-proposals";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { DocumentUpload } from "@/components/dashboard/document-upload";
import { MessagingPanel } from "@/components/dashboard/messaging-panel";
import { AIAssistant } from "@/components/dashboard/ai-assistant";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { FloatingAIAssistant } from "@/components/dashboard/floating-ai-assistant";
import { RatingsReviews } from "@/components/dashboard/ratings-reviews";

type DashboardView =
  | "overview"
  | "my-requests"
  | "proposals"
  | "applications"
  | "documents"
  | "chat";

export default function ClientDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<DashboardView>("overview");
  const [notifications, setNotifications] = useState(3);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "vm-visa-dashboard-state",
        JSON.stringify({
          currentView,
          sidebarCollapsed,
          timestamp: Date.now(),
        }),
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentView, sidebarCollapsed]);

  // Restore saved state
  useEffect(() => {
    const saved = localStorage.getItem("vm-visa-dashboard-state");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const timeDiff = Date.now() - state.timestamp;

        // Only restore if less than 24 hours old
        if (timeDiff < 24 * 60 * 60 * 1000) {
          setCurrentView(state.currentView);
          setSidebarCollapsed(state.sidebarCollapsed);
        }
      } catch (error) {
        console.error("Failed to restore dashboard state:", error);
      }
    }
  }, []);

  const tabItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "my-requests",
      label: "My Requests",
      icon: FileText,
      badge: "3",
    },
    {
      id: "proposals",
      label: "Proposals",
      icon: CheckCircle,
      badge: "5",
    },
    {
      id: "applications",
      label: "Applications",
      icon: Clock,
      badge: "2",
    },
    {
      id: "documents",
      label: "Documents",
      icon: Upload,
      badge: null,
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageCircle,
      badge: "8",
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <DashboardOverview />;
      case "my-requests":
        return <MyRequests />;
      case "proposals":
        return <AgentProposals />;
      case "applications":
        return <ProgressTracker />;
      case "documents":
        return <DocumentUpload />;
      case "chat":
        return <MessagingPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20 flex">
      {/* Enhanced Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? "80px" : "320px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-white shadow-2xl z-50 overflow-hidden border-r border-cool-gray-200"
      >
        {/* Toggle Button */}
        <div className="absolute -right-4 top-6 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-cool-gray-600 hover:shadow-xl transition-all duration-200 border border-cool-gray-200"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Sidebar Header */}
        <div className="p-6 border-b border-cool-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-cool-gray-800">Client</h1>
                <p className="text-sm text-cool-gray-600">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-cool-gray-100">
          {!sidebarCollapsed ? (
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-cool-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <User className="w-8 h-8 text-cool-gray-500" />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* User Info */}
              <h3 className="text-xl font-bold text-cool-gray-800 mb-1">
                John Doe
              </h3>
              <p className="text-sm text-cool-gray-600 mb-3">
                Client ID: #VM2024001
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Verified Member
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cool-gray-800">2</div>
                  <div className="text-sm text-cool-gray-600">
                    Active Requests
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">20</div>
                  <div className="text-sm text-cool-gray-600">Proposals</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-cool-gray-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">1</div>
                  <div className="text-sm text-cool-gray-600">Completed</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 bg-cool-gray-200 rounded-full flex items-center justify-center mx-auto">
                <User className="w-6 h-6 text-cool-gray-500" />
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Sections */}
        <div className="p-6">
          {!sidebarCollapsed && (
            <h4 className="text-sm font-semibold text-cool-gray-800 mb-4 uppercase tracking-wide">
              Dashboard Sections
            </h4>
          )}

          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView("overview")}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
                currentView === "overview"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-cool-gray-700 hover:bg-cool-gray-50",
              )}
              title={sidebarCollapsed ? "Overview" : undefined}
            >
              <BarChart3 className="w-5 h-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Overview</span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView("my-requests")}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
                currentView === "my-requests"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-cool-gray-700 hover:bg-cool-gray-50",
              )}
              title={sidebarCollapsed ? "My Requests" : undefined}
            >
              <FileText className="w-5 h-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">My Requests</span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView("proposals")}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
                currentView === "proposals"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-cool-gray-700 hover:bg-cool-gray-50",
              )}
              title={sidebarCollapsed ? "Proposals" : undefined}
            >
              <MessageCircle className="w-5 h-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Proposals</span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView("applications")}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
                currentView === "applications"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-cool-gray-700 hover:bg-cool-gray-50",
              )}
              title={sidebarCollapsed ? "Applications" : undefined}
            >
              <CheckCircle className="w-5 h-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Applications</span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView("documents")}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
                currentView === "documents"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-cool-gray-700 hover:bg-cool-gray-50",
              )}
              title={sidebarCollapsed ? "Documents" : undefined}
            >
              <Upload className="w-5 h-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Documents</span>
              )}
            </motion.button>
          </div>

          {/* Contact Information */}
          {!sidebarCollapsed && (
            <div className="mt-8 pt-6 border-t border-cool-gray-100 space-y-3 text-sm text-cool-gray-600">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4" />
                <span>john.doe@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4" />
                <span>United States</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4" />
                <span>Member since Jan 2024</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            {!sidebarCollapsed && (
              <Button className="w-full bg-cool-gray-100 text-cool-gray-700 hover:bg-cool-gray-200">
                <Eye className="w-4 h-4 mr-2" />
                View Documents
              </Button>
            )}

            <Button
              onClick={() => setCurrentView("my-requests")}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              title={sidebarCollapsed ? "Post New Request" : undefined}
            >
              <Plus className="w-4 h-4 mr-2" />
              {!sidebarCollapsed && "Post New Request"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? "80px" : "320px" }}
      >
        {/* Top Navigation Pills */}
        <div className="sticky top-0 z-40 bg-white border-b border-cool-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-cool-gray-800 mb-1">
                {tabItems.find((tab) => tab.id === currentView)?.label ||
                  "Dashboard"}
              </h1>
              <p className="text-cool-gray-600">
                {currentView === "overview" &&
                  "Dashboard with stats, recent activity, and upcoming deadlines"}
                {currentView === "my-requests" &&
                  "Shows all visa requests with status tracking"}
                {currentView === "proposals" &&
                  "Displays received proposals with accept/decline options"}
                {currentView === "applications" &&
                  "Shows pending applications with progress tracking"}
                {currentView === "documents" &&
                  "Document management with upload functionality"}
                {currentView === "chat" &&
                  "Real-time chat interface with agents"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>

              {/* Profile Menu */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-cool-gray-400 rotate-90" />
              </div>
            </div>
          </div>

          {/* Enhanced Pill Navigation */}
          <div className="flex items-center justify-between bg-cool-gray-50 rounded-2xl p-2">
            {tabItems.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView(tab.id as DashboardView)}
                className={cn(
                  "flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex-1 relative",
                  currentView === tab.id
                    ? "bg-white text-cool-gray-900 shadow-md"
                    : "text-cool-gray-600 hover:text-cool-gray-900 hover:bg-white/50",
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge && (
                  <Badge
                    className={cn(
                      "text-xs",
                      currentView === tab.id
                        ? "bg-green-500 text-white"
                        : "bg-cool-gray-200 text-cool-gray-700",
                    )}
                  >
                    {tab.badge}
                  </Badge>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />
    </div>
  );
}
