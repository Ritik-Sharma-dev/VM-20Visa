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
  Edit,
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
import { BrowseAgentsFiltered } from "@/components/dashboard/browse-agents-filtered";
import { UserProfile } from "@/components/dashboard/user-profile";
import {
  MyBio,
  DocumentCenter,
  RequestHistory,
  SettingsPage,
} from "@/components/dashboard/sidebar-components";
import { useAuth } from "@/components/auth/auth-context";

type DashboardView =
  | "overview"
  | "my-requests"
  | "proposals"
  | "applications"
  | "documents"
  | "chat"
  | "browse-agents"
  | "profile"
  | "my-bio"
  | "document-center"
  | "request-history"
  | "settings"
  | "messages";

export default function ClientDashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>("overview");
  const [notifications, setNotifications] = useState(3);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

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
          setSidebarCollapsed(state.sidebarCollapsed || false);
        }
      } catch (error) {
        console.error("Failed to restore dashboard state:", error);
      }
    }
  }, []);

  // Click outside handler for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

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
      id: "browse-agents",
      label: "Browse Agents",
      icon: Users,
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
        return <DashboardOverview onNavigate={setCurrentView} />;
      case "my-requests":
        return <MyRequests />;
      case "applications":
        return <ProgressTracker />;
      case "documents":
        return <DocumentUpload />;
      case "browse-agents":
        return <BrowseAgentsFiltered />;
      case "chat":
        return <MessagingPanel />;
      case "profile":
        return <UserProfile />;
      case "my-bio":
        return <MyBio />;
      case "document-center":
        return <DocumentCenter />;
      case "request-history":
        return <RequestHistory />;
      case "settings":
        return <SettingsPage />;
      case "messages":
        return <MessagingPanel />;
      default:
        return <DashboardOverview onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20 flex">
      {/* Clean Minimal Sidebar - Matching Image Design */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? "64px" : "280px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-white shadow-lg z-50 overflow-hidden border-r border-gray-100"
      >
        {/* Cyan Accent Border */}
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-cyan-500"></div>

        {/* Toggle Button */}
        <div className="absolute -right-3 top-6 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </motion.button>
        </div>

        {!sidebarCollapsed ? (
          /* Expanded Sidebar */
          <div className="flex flex-col h-full pl-6 pr-4 py-8">
            {/* Main Navigation */}
            <div className="space-y-2 mb-8">
              {/* Dashboard - Active State */}
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("overview")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  currentView === "overview"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </motion.button>

              {/* My Bio */}
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("my-bio")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  currentView === "my-bio"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                  <Calendar className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">My Bio</span>
              </motion.button>

              {/* Request History */}
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("request-history")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  currentView === "request-history"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <FileText className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">Request History</span>
              </motion.button>

              {/* Settings */}
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("settings")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  currentView === "settings"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="w-5 h-5 bg-cyan-500 rounded flex items-center justify-center">
                  <Settings className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">Settings</span>
              </motion.button>

              {/* Messages */}
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("messages")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  currentView === "messages"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">Messages</span>
                <Badge className="bg-red-500 text-white text-xs ml-auto">
                  5
                </Badge>
              </motion.button>
            </div>

            {/* Account Pages Section */}
            <div className="border-t border-gray-100 pt-6">
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4 px-4">
                Account Pages
              </div>

              {/* Profile */}
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("profile")}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  currentView === "profile"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="font-medium">Profile</span>
              </motion.button>

              {/* User Email Display */}
              <div className="px-4 py-3 mt-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      John Doe
                    </div>
                    <div className="text-xs text-gray-500">
                      john.doe@email.com
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-left mt-4"
              >
                <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                  <LogOut className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">Sign Out</span>
              </motion.button>
            </div>
          </div>
        ) : (
          /* Collapsed Sidebar */
          <div className="flex flex-col h-full items-center py-6 pl-2">
            {/* Collapsed Navigation Icons */}
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: BarChart3,
                  action: () => setCurrentView("overview"),
                  tooltip: "Dashboard",
                  isActive: currentView === "overview",
                  bgColor: "bg-blue-500",
                },
                {
                  icon: Calendar,
                  action: () => setCurrentView("my-bio"),
                  tooltip: "My Bio",
                  isActive: currentView === "my-bio",
                  bgColor: "bg-orange-500",
                },
                {
                  icon: FileText,
                  action: () => setCurrentView("request-history"),
                  tooltip: "Request History",
                  isActive: currentView === "request-history",
                  bgColor: "bg-green-500",
                },
                {
                  icon: Settings,
                  action: () => setCurrentView("settings"),
                  tooltip: "Settings",
                  isActive: currentView === "settings",
                  bgColor: "bg-cyan-500",
                },
                {
                  icon: MessageCircle,
                  action: () => setCurrentView("messages"),
                  tooltip: "Messages",
                  isActive: currentView === "messages",
                  bgColor: "bg-red-500",
                  badge: true,
                },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={item.action}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 relative group ${
                    item.isActive ? "bg-blue-500" : "hover:bg-gray-100"
                  }`}
                  title={item.tooltip}
                >
                  {item.isActive ? (
                    <item.icon className="w-5 h-5 text-white" />
                  ) : (
                    <div
                      className={`w-5 h-5 ${item.bgColor} rounded flex items-center justify-center`}
                    >
                      <item.icon className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">5</span>
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.tooltip}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Mini Profile */}
            <div className="mb-4">
              <div
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-medium group cursor-pointer"
                title="John Doe"
              >
                JD
                <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  John Doe
                </div>
              </div>
            </div>

            {/* Logout Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 transition-all duration-200 group"
              title="Sign Out"
            >
              <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                <LogOut className="w-3 h-3 text-white" />
              </div>
              <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                Sign Out
              </div>
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? "72px" : "300px" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-2">
          <div className="flex items-center justify-between mb-2">
            {/* Left: Hello Message */}
            <div>
              <h1 className="text-2xl font-heading font-bold text-cool-gray-800">
                Hello, John Doe! 👋
              </h1>
              <p className="text-sm text-cool-gray-600">
                Welcome back to your immigration dashboard
              </p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>

              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-royal rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">JD</span>
                  </div>
                  <ChevronLeft
                    className={cn(
                      "w-4 h-4 text-cool-gray-400 transition-transform",
                      showProfileDropdown ? "rotate-180" : "rotate-90",
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-white/20 z-50 backdrop-blur-xl"
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-white/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-royal rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-medium">
                            JD
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-cool-gray-800">
                            John Doe
                          </h3>
                          <p className="text-sm text-cool-gray-600">
                            Premium Member
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setCurrentView("profile");
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-royal-blue-50 transition-colors text-left"
                      >
                        <User className="w-5 h-5 text-royal-blue-600" />
                        <span className="font-medium text-cool-gray-700">
                          View Profile
                        </span>
                      </button>

                      <button
                        onClick={() => setShowProfileDropdown(false)}
                        className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-sage-green-50 transition-colors text-left"
                      >
                        <Bell className="w-5 h-5 text-sage-green-600" />
                        <span className="font-medium text-cool-gray-700">
                          Notifications
                        </span>
                        <Badge className="bg-red-500 text-white text-xs ml-auto">
                          3
                        </Badge>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView("settings");
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gold-50 transition-colors text-left"
                      >
                        <Settings className="w-5 h-5 text-gold-600" />
                        <span className="font-medium text-cool-gray-700">
                          Settings
                        </span>
                      </button>

                      <div className="border-t border-white/20 mt-2 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowProfileDropdown(false);
                          }}
                          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left group"
                        >
                          <LogOut className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-red-600">
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
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
                  "flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex-1 relative",
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
                      "text-xs ml-1",
                      currentView === tab.id
                        ? "bg-gradient-to-r from-sage-green-500 to-sky-blue-500 text-white"
                        : "bg-gradient-to-r from-sage-green-400 to-sky-blue-400 text-white",
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
