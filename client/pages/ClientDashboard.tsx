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
      {/* Premium Digital ID Card Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? "80px" : "340px" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden border-r border-royal-blue-100"
      >
        {/* Toggle Button */}
        <div className="absolute -right-4 top-8 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-royal-blue-600 hover:shadow-xl transition-all duration-200 border border-royal-blue-200 hover:bg-royal-blue-50"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {!sidebarCollapsed ? (
          /* Expanded Sidebar - Premium Digital ID Card */
          <div className="p-6 h-full overflow-y-auto">
            {/* Digital ID Card Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-royal-blue-500 via-royal-blue-600 to-sage-green-600 rounded-3xl p-8 mb-8 shadow-xl relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:20px_20px]"></div>

              {/* Profile Picture */}
              <div className="relative text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg border border-white/30">
                    JD
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="text-center text-white space-y-2 relative z-10">
                <h3 className="text-xl font-bold mb-1">John Doe</h3>
                <p className="text-royal-blue-100 text-sm">
                  john.doe@email.com
                </p>
                <p className="text-royal-blue-100 text-sm">+1 (555) 123-4567</p>
                <p className="text-royal-blue-100 text-sm mb-3">
                  🇺🇸 United States
                </p>

                {/* Visa Goal */}
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                  🎯 Permanent Residence
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-center mt-4">
                <Badge className="bg-green-500/90 text-white border-0 px-4 py-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />✅ Verified
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-white/90">Profile Completion</span>
                  <span className="font-bold text-white">85%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-green-400 to-green-300 h-3 rounded-full shadow-sm"
                  />
                </div>
              </div>

              {/* Edit Profile Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("profile")}
                className="w-full mt-6 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl border border-white/30 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </motion.button>
            </motion.div>

            {/* Premium Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("my-bio")}
                className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-royal-blue-50 hover:to-sage-green-50 transition-all duration-300 text-left group border border-transparent hover:border-royal-blue-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-royal-blue-500 to-royal-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-cool-gray-800">
                    My Bio / About Me
                  </h4>
                  <p className="text-xs text-cool-gray-600">
                    View & edit short bio
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("request-history")}
                className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-sage-green-50 hover:to-mint-green-50 transition-all duration-300 text-left group border border-transparent hover:border-sage-green-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-sage-green-500 to-sage-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-cool-gray-800">
                    Request History
                  </h4>
                  <p className="text-xs text-cool-gray-600">
                    All past visa requests + statuses
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("settings")}
                className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-gold-50 hover:to-sandstone-50 transition-all duration-300 text-left group border border-transparent hover:border-gold-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-cool-gray-800">Settings</h4>
                  <p className="text-xs text-cool-gray-600">
                    Password, notifications, etc.
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("messages")}
                className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-sky-blue-50 hover:to-mint-green-50 transition-all duration-300 text-left group border border-transparent hover:border-sky-blue-200 relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-sky-blue-500 to-sky-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-cool-gray-800">Messages</h4>
                  <p className="text-xs text-cool-gray-600">
                    Chat with agents & history
                  </p>
                </div>
                <Badge className="bg-red-500 text-white text-xs">5</Badge>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 text-left group border border-transparent hover:border-red-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <LogOut className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-700">Logout</h4>
                  <p className="text-xs text-red-600">
                    Clear session & redirect
                  </p>
                </div>
              </motion.button>
            </motion.div>
          </div>
        ) : (
          /* Collapsed Sidebar - Minimal Icons with Tooltips */
          <div className="p-4 h-full overflow-y-auto">
            {/* Mini Profile Avatar */}
            <div className="text-center mb-8 mt-4">
              <div
                className="w-12 h-12 bg-gradient-to-br from-royal-blue-500 to-sage-green-600 rounded-xl flex items-center justify-center text-white text-lg font-bold mx-auto shadow-lg relative"
                title="John Doe - Verified"
              >
                JD
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Collapsed Navigation Icons */}
            <div className="space-y-4">
              {[
                {
                  icon: User,
                  action: () => setCurrentView("my-bio"),
                  tooltip: "My Bio / About Me",
                  color: "from-royal-blue-500 to-royal-blue-600",
                },
                {
                  icon: FileText,
                  action: () => setCurrentView("request-history"),
                  tooltip: "Request History",
                  color: "from-sage-green-500 to-sage-green-600",
                },
                {
                  icon: Settings,
                  action: () => setCurrentView("settings"),
                  tooltip: "Settings",
                  color: "from-gold-500 to-gold-600",
                },
                {
                  icon: MessageCircle,
                  action: () => setCurrentView("messages"),
                  tooltip: "Messages",
                  color: "from-sky-blue-500 to-sky-blue-600",
                },
                {
                  icon: LogOut,
                  action: logout,
                  tooltip: "Logout",
                  color: "from-red-500 to-red-600",
                },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={item.action}
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 mx-auto relative group`}
                  title={item.tooltip}
                >
                  <item.icon className="w-5 h-5" />
                  {item.tooltip === "Messages" && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                      5
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-cool-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.tooltip}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-cool-gray-800"></div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div
        className="flex-1 transition-all duration-400"
        style={{ marginLeft: sidebarCollapsed ? "80px" : "340px" }}
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
