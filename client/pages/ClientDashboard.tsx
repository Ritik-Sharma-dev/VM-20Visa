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
      {/* Streamlined Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? "80px" : "280px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-gradient-to-b from-royal-blue-900 via-royal-blue-700 to-sage-green-600 z-50 overflow-hidden border-r border-white/20"
      >
        {/* Toggle Button */}
        <div className="absolute -right-4 top-6 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-8 h-8 bg-gradient-royal rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-200"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6 text-white">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Globe className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-heading font-bold text-white">
                  VM Visa
                </h1>
                <p className="text-xs text-sky-blue-200">Client Portal</p>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h3 className="font-semibold text-white">John Doe</h3>
                  <p className="text-sm text-sky-blue-200">Premium Client</p>
                  <Badge className="bg-gold-500 text-white text-xs mt-1">
                    Verified
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView("my-requests")}
              className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 group"
              title={sidebarCollapsed ? "New Request" : undefined}
            >
              <div className="flex items-center space-x-3">
                <Plus className="w-5 h-5 text-gold-400" />
                {!sidebarCollapsed && (
                  <span className="font-medium">New Request</span>
                )}
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 relative group"
              title={sidebarCollapsed ? "Messages" : undefined}
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-mint-green-400" />
                {!sidebarCollapsed && (
                  <span className="font-medium">Messages</span>
                )}
                <Badge className="bg-red-500 text-white text-xs ml-auto">
                  5
                </Badge>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 relative group"
              title={sidebarCollapsed ? "Notifications" : undefined}
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-sky-blue-400" />
                {!sidebarCollapsed && (
                  <span className="font-medium">Notifications</span>
                )}
                <Badge className="bg-red-500 text-white text-xs ml-auto">
                  3
                </Badge>
              </div>
            </motion.button>
          </div>

          {/* Settings & Logout */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200"
              title={sidebarCollapsed ? "Settings" : undefined}
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-creamy-beige-300" />
                {!sidebarCollapsed && (
                  <span className="font-medium">Settings</span>
                )}
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-white/10 hover:bg-red-500/20 rounded-xl backdrop-blur-sm transition-all duration-200 group"
              title={sidebarCollapsed ? "Logout" : undefined}
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                {!sidebarCollapsed && (
                  <span className="font-medium group-hover:text-red-300">
                    Logout
                  </span>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarCollapsed ? "ml-20" : "ml-70",
        )}
        style={{ marginLeft: sidebarCollapsed ? "80px" : "280px" }}
      >
        {/* Top Navigation Pills */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-heading font-bold text-cool-gray-800">
              User Dashboard
            </h1>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white/60 border border-white/30 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Pill Navigation */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {tabItems.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView(tab.id as DashboardView)}
                className={cn(
                  "flex items-center space-x-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 whitespace-nowrap relative",
                  currentView === tab.id
                    ? "bg-gradient-royal text-white shadow-lg"
                    : "bg-white/60 text-cool-gray-700 hover:bg-white/80 hover:text-royal-blue-700 backdrop-blur-sm",
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <Badge
                    className={cn(
                      "text-xs ml-2",
                      currentView === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-royal-blue-100 text-royal-blue-700",
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
        <div className="p-6">
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
