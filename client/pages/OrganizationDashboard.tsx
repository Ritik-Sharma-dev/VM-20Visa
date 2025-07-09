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
  Calendar,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  User,
  LogOut,
  FileText,
  Upload,
  Star,
  MessageCircle,
  Menu,
  Eye,
  Edit,
  Shield,
  Home,
  Briefcase,
  Building,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  Award,
  MapPin,
  Mail,
  Phone,
  Globe,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import organization dashboard components
import { OrganizationOverview } from "@/components/dashboard/organization/organization-overview";
import { ManageAgents } from "@/components/dashboard/organization/manage-agents";
import { CaseManagement } from "@/components/dashboard/organization/case-management";
import { OrganizationAnalytics } from "@/components/dashboard/organization/organization-analytics";
import { OrganizationSettings } from "@/components/dashboard/organization/organization-settings";
import { OrganizationNotifications } from "@/components/dashboard/organization/organization-notifications";
import { useAuth } from "@/components/auth/auth-context";

type OrganizationDashboardView =
  | "dashboard"
  | "manage-agents"
  | "case-requests"
  | "analytics"
  | "settings"
  | "notifications";

export default function OrganizationDashboard() {
  const [currentView, setCurrentView] =
    useState<OrganizationDashboardView>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Start collapsed
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState(8);
  const [autoCollapseTimer, setAutoCollapseTimer] =
    useState<NodeJS.Timeout | null>(null);
  const { logout } = useAuth();

  // Auto-save functionality
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "vm-visa-org-dashboard-state",
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
    const saved = localStorage.getItem("vm-visa-org-dashboard-state");
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
        console.error("Failed to restore organization dashboard state:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Auto-collapse functionality
  const startAutoCollapseTimer = () => {
    if (autoCollapseTimer) {
      clearTimeout(autoCollapseTimer);
    }
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 10000); // 10 seconds
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
      // If expanding, start the auto-collapse timer
      startAutoCollapseTimer();
    } else {
      // If collapsing manually, clear the timer
      clearAutoCollapseTimer();
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      clearAutoCollapseTimer();
    };
  }, [autoCollapseTimer]);

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

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null,
    },
    {
      id: "manage-agents",
      label: "Manage Agents",
      icon: Users,
      badge: "12",
    },
    {
      id: "case-requests",
      label: "Case Requests",
      icon: Briefcase,
      badge: "24",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      badge: "8",
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <OrganizationOverview />;
      case "manage-agents":
        return <ManageAgents />;
      case "case-requests":
        return <CaseManagement />;
      case "analytics":
        return <OrganizationAnalytics />;
      case "settings":
        return <OrganizationSettings />;
      case "notifications":
        return <OrganizationNotifications />;
      default:
        return <OrganizationOverview />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Organization Dashboard";
      case "manage-agents":
        return "Manage Agents";
      case "case-requests":
        return "Case Requests";
      case "analytics":
        return "Analytics & Reports";
      case "settings":
        return "Organization Settings";
      case "notifications":
        return "Notifications";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F4F6FA" }}>
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? "80px" : "320px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-white shadow-xl z-50 overflow-hidden"
        style={{ borderRight: "1px solid #D9D9D9" }}
      >
        {/* Toggle Button */}
        <div className="absolute -right-4 top-8 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSidebarToggle}
            className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:text-gray-800 transition-all duration-200"
            style={{
              color: "#1A1A1A",
              border: "1px solid #D9D9D9",
            }}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {!sidebarCollapsed ? (
          /* Expanded Sidebar */
          <div className="flex flex-col h-full">
            {/* Organization Header */}
            <div className="p-6" style={{ borderBottom: "1px solid #D9D9D9" }}>
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                  style={{
                    background:
                      "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
                  }}
                >
                  GI
                </div>
                <div>
                  <h2
                    className="font-bold text-lg"
                    style={{ color: "#1A1A1A" }}
                  >
                    Global Immigration
                  </h2>
                  <p className="text-sm" style={{ color: "#666666" }}>
                    License: ICCRC-12345
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="text-center p-3 rounded-lg"
                  style={{ backgroundColor: "#EAF2FF" }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "#0052CC" }}
                  >
                    12
                  </p>
                  <p className="text-xs" style={{ color: "#666666" }}>
                    Active Agents
                  </p>
                </div>
                <div
                  className="text-center p-3 rounded-lg"
                  style={{ backgroundColor: "#EAF2FF" }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "#0052CC" }}
                  >
                    89
                  </p>
                  <p className="text-xs" style={{ color: "#666666" }}>
                    Active Cases
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 px-4 py-4">
              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setCurrentView(item.id as OrganizationDashboardView)
                    }
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                      currentView === item.id
                        ? "text-white shadow-lg"
                        : "hover:bg-gray-50",
                    )}
                    style={{
                      backgroundColor:
                        currentView === item.id ? "#0052CC" : "transparent",
                      color: currentView === item.id ? "white" : "#1A1A1A",
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        className="text-xs font-medium"
                        style={{
                          backgroundColor:
                            currentView === item.id
                              ? "rgba(255,255,255,0.2)"
                              : "#0052CC",
                          color: "white",
                        }}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div
              className="p-4 space-y-2"
              style={{ borderTop: "1px solid #D9D9D9" }}
            >
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
                style={{ color: "#1A1A1A" }}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Help Center</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                style={{ color: "#1A1A1A" }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </div>
        ) : (
          /* Collapsed Sidebar */
          <div
            className="flex flex-col h-full items-center py-6"
            onMouseEnter={handleSidebarExpand}
          >
            {/* Collapsed Organization Logo */}
            <div className="mb-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer shadow-lg"
                style={{
                  background:
                    "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
                }}
              >
                GI
              </motion.div>
            </div>

            {/* Collapsed Navigation */}
            <div className="space-y-3 flex-1">
              {sidebarItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrentView(item.id as OrganizationDashboardView)
                  }
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 relative group",
                    currentView === item.id
                      ? "text-white shadow-lg"
                      : "hover:bg-gray-50",
                  )}
                  style={{
                    backgroundColor:
                      currentView === item.id ? "#0052CC" : "transparent",
                    color: currentView === item.id ? "white" : "#1A1A1A",
                  }}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5" />
                  {item.badge && (
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: "#0052CC" }}
                    >
                      {item.badge}
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Collapsed Bottom Actions */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                style={{ color: "#1A1A1A" }}
                title="Help Center"
              >
                <HelpCircle className="w-5 h-5" />
                <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  Help Center
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200 group"
                style={{ color: "#1A1A1A" }}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  Logout
                </div>
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Content Area */}
      <div
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "320px",
        }}
      >
        {/* Top Header */}
        <header
          className="bg-white shadow-sm px-8 py-4"
          style={{ borderBottom: "1px solid #D9D9D9" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
                {getPageTitle()}
              </h1>
              <p className="text-sm mt-1" style={{ color: "#666666" }}>
                {currentView === "dashboard"
                  ? "Monitor your organization's immigration services"
                  : `Manage your ${getPageTitle().toLowerCase()}`}
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: "#666666" }}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: "#F4F6FA",
                    border: "1px solid #D9D9D9",
                    color: "#1A1A1A",
                  }}
                />
              </div>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                style={{ color: "#1A1A1A" }}
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: "#0052CC" }}
                  >
                    {notifications > 9 ? "9+" : notifications}
                  </div>
                )}
              </motion.button>

              {/* Organization Profile Dropdown */}
              <div className="relative profile-dropdown">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                    style={{
                      background:
                        "linear-gradient(90deg, #0052CC 0%, #3B82F6 100%)",
                    }}
                  >
                    GI
                  </div>
                  <div className="text-left hidden sm:block">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#1A1A1A" }}
                    >
                      Global Immigration
                    </p>
                    <p className="text-xs" style={{ color: "#666666" }}>
                      Organization Admin
                    </p>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg z-10 min-w-48 overflow-hidden"
                      style={{ border: "1px solid #D9D9D9" }}
                    >
                      <div
                        className="p-4"
                        style={{ borderBottom: "1px solid #D9D9D9" }}
                      >
                        <p className="font-medium" style={{ color: "#1A1A1A" }}>
                          Global Immigration Services
                        </p>
                        <p className="text-sm" style={{ color: "#666666" }}>
                          admin@globalimmig.com
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => setCurrentView("settings")}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                          style={{ color: "#1A1A1A" }}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Organization Settings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 hover:text-red-600 transition-colors"
                          style={{ color: "#1A1A1A" }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
