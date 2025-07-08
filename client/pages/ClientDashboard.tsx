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
      {/* Professional Web Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? "72px" : "300px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-slate-900 shadow-xl z-50 overflow-hidden border-r border-slate-700"
      >
        {/* Toggle Button */}
        <div className="absolute -right-3 top-6 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-6 h-6 bg-slate-800 rounded-full shadow-md flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200 border border-slate-600"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </motion.button>
        </div>

        {!sidebarCollapsed ? (
          /* Expanded Sidebar - Professional Layout */
          <div className="flex flex-col h-full">
            {/* Header Section */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">VM Visa</h2>
                  <p className="text-slate-400 text-sm">Client Portal</p>
                </div>
              </div>
            </div>

            {/* User Profile Section */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">
                    John Doe
                  </h3>
                  <p className="text-slate-400 text-sm truncate">
                    john.doe@email.com
                  </p>
                  <p className="text-slate-400 text-xs">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Status and Goal */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    🇺🇸 United States
                  </span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                    Verified
                  </Badge>
                </div>
                <div className="text-slate-300 text-sm">
                  <span className="text-slate-400">Goal:</span> Permanent
                  Residence
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Profile Completion</span>
                  <span className="text-slate-300 font-medium">85%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Edit Profile Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView("profile")}
                className="w-full mt-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </motion.button>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3 px-2">
                Navigation
              </div>

              {[
                {
                  icon: User,
                  label: "My Bio",
                  sublabel: "Personal information",
                  action: () => setCurrentView("my-bio"),
                  color: "text-blue-400",
                },
                {
                  icon: FileText,
                  label: "Request History",
                  sublabel: "Past applications",
                  action: () => setCurrentView("request-history"),
                  color: "text-emerald-400",
                },
                {
                  icon: Settings,
                  label: "Settings",
                  sublabel: "Preferences & security",
                  action: () => setCurrentView("settings"),
                  color: "text-amber-400",
                },
                {
                  icon: MessageCircle,
                  label: "Messages",
                  sublabel: "Chat with agents",
                  action: () => setCurrentView("messages"),
                  color: "text-cyan-400",
                  badge: "5",
                },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-all duration-200 text-left group"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-200 font-medium text-sm">
                      {item.label}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {item.sublabel}
                    </div>
                  </div>
                  {item.badge && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Logout Section */}
            <div className="p-4 border-t border-slate-700">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-900/20 transition-all duration-200 text-left group"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-red-400 font-medium text-sm">Logout</div>
                  <div className="text-red-500/70 text-xs">
                    Sign out of account
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        ) : (
          /* Collapsed Sidebar - Clean Icons */
          <div className="flex flex-col h-full items-center py-4">
            {/* Mini Logo */}
            <div className="mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Mini Profile */}
            <div className="mb-6">
              <div
                className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold relative group cursor-pointer"
                title="John Doe - Verified"
              >
                JD
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-slate-900"></div>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex-1 space-y-3">
              {[
                {
                  icon: User,
                  action: () => setCurrentView("my-bio"),
                  tooltip: "My Bio",
                  color: "text-blue-400",
                },
                {
                  icon: FileText,
                  action: () => setCurrentView("request-history"),
                  tooltip: "Request History",
                  color: "text-emerald-400",
                },
                {
                  icon: Settings,
                  action: () => setCurrentView("settings"),
                  tooltip: "Settings",
                  color: "text-amber-400",
                },
                {
                  icon: MessageCircle,
                  action: () => setCurrentView("messages"),
                  tooltip: "Messages",
                  color: "text-cyan-400",
                  badge: true,
                },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={item.action}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-all duration-200 relative group"
                  title={item.tooltip}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                      <span className="text-white text-xs font-bold">5</span>
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none border border-slate-700">
                    {item.tooltip}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Logout Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-900/20 transition-all duration-200 group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-red-400" />
              <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none border border-slate-700">
                Logout
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
