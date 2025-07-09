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
import { useAuth } from "@/components/auth/auth-context";

type AgentDashboardView =
  | "home"
  | "incoming-requests"
  | "my-proposals"
  | "active-projects"
  | "chat"
  | "documents"
  | "analytics"
  | "settings";

type FilterPeriod = "today" | "7days" | "month" | "year";

export default function AgentDashboard() {
  const [currentView, setCurrentView] = useState<AgentDashboardView>("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Start collapsed
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

  const filterTabs = [
    { id: "today", label: "Today" },
    { id: "7days", label: "7 Days" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ] as const;

  const sidebarItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
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
      id: "chat",
      label: "Chat with Clients",
      icon: MessagesSquare,
      badge: "3",
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
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null,
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <AgentOverview filterPeriod={filterPeriod} />;
      case "incoming-requests":
        return <IncomingRequests />;
      case "my-proposals":
        return <MyProposals />;
      case "active-projects":
        return <ActiveProjects />;
      case "chat":
        return <ClientChat />;
      case "documents":
        return <AgentDocuments />;
      case "analytics":
        return <AgentAnalytics filterPeriod={filterPeriod} />;
      case "settings":
        return <AgentSettings />;
      default:
        return <AgentOverview filterPeriod={filterPeriod} />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "home":
        return "Dashboard Overview";
      case "incoming-requests":
        return "Incoming Requests";
      case "my-proposals":
        return "My Proposals";
      case "active-projects":
        return "Active Projects";
      case "chat":
        return "Client Communications";
      case "documents":
        return "Document Center";
      case "analytics":
        return "Analytics & Reports";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F7F3E9" }}>
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? "80px" : "320px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-screen shadow-xl z-50 ${
          sidebarCollapsed
            ? "overflow-hidden"
            : "overflow-x-hidden overflow-y-auto"
        }`}
        style={{
          backgroundColor: "#FFF9E6",
          borderRight: "1px solid #E0E0E0",
        }}
      >
        {/* Toggle Button */}
        <div className="absolute -right-4 top-8 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSidebarToggle}
            className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 border border-gray-200 transition-all duration-200"
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
            {/* Profile Section - ID Card Style */}
            <div className="p-6 border-b border-gray-100">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowProfileCard(true)}
                className="rounded-2xl p-4 cursor-pointer shadow-sm transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: "#E3F2FD",
                  border: "1px solid #E0E0E0",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: "#455A64" }}
                      >
                        SA
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-lg"
                        style={{ color: "#455A64" }}
                      >
                        Sarah Ahmad
                      </h3>
                      <p className="text-sm" style={{ color: "#455A64" }}>
                        Premium Agent
                      </p>
                    </div>
                  </div>
                  <Edit className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    <span>Global Immigration Services</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Toronto, Canada</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-600">
                      <UserCheck className="w-4 h-4 mr-2" />
                      <span className="font-medium">Verified Agent</span>
                    </div>
                    <Badge
                      className="hover:bg-blue-100"
                      style={{ backgroundColor: "#61A5FF", color: "white" }}
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              </motion.div>
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
                      setCurrentView(item.id as AgentDashboardView)
                    }
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                      currentView === item.id
                        ? "text-white shadow-lg"
                        : "hover:bg-white/60",
                    )}
                    style={{
                      backgroundColor:
                        currentView === item.id ? "#1F3A93" : "transparent",
                      color: currentView === item.id ? "white" : "#4A4A4A",
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        className={cn(
                          "text-xs font-medium",
                          currentView === item.id
                            ? "bg-white/20 text-white hover:bg-white/20"
                            : "hover:bg-blue-100",
                        )}
                        style={{
                          backgroundColor:
                            currentView === item.id
                              ? "rgba(255,255,255,0.2)"
                              : "#61A5FF",
                          color: currentView === item.id ? "white" : "white",
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
            <div className="p-4 border-t border-gray-100 space-y-2">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/60 transition-all duration-200"
                style={{ color: "#4A4A4A" }}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Help Center</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                style={{ color: "#4A4A4A" }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </div>
        ) : (
          /* Collapsed Sidebar */
          <div className="flex flex-col h-full items-center py-6">
            {/* Collapsed Profile */}
            <div className="mb-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowProfileCard(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold cursor-pointer shadow-lg"
                style={{ backgroundColor: "#1F3A93" }}
              >
                SA
              </motion.div>
            </div>

            {/* Collapsed Navigation */}
            <div className="space-y-3 flex-1">
              {sidebarItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentView(item.id as AgentDashboardView)}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 relative group",
                    currentView === item.id
                      ? "text-white shadow-lg"
                      : "hover:bg-white/60",
                  )}
                  style={{
                    backgroundColor:
                      currentView === item.id ? "#1F3A93" : "transparent",
                    color: currentView === item.id ? "white" : "#4A4A4A",
                  }}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5" />
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {item.badge}
                      </span>
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
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/60 transition-all duration-200 group"
                style={{ color: "#4A4A4A" }}
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
                style={{ color: "#4A4A4A" }}
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
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {currentView === "home"
                  ? "Monitor your immigration business performance"
                  : `Manage your ${getPageTitle().toLowerCase()}`}
              </p>
            </div>

            {/* Filter Tabs - Show only on relevant pages */}
            {(currentView === "home" || currentView === "analytics") && (
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterPeriod(tab.id)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                      filterPeriod === tab.id
                        ? "text-white shadow-sm"
                        : "hover:text-gray-800",
                    )}
                    style={{
                      backgroundColor:
                        filterPeriod === tab.id ? "#1F3A93" : "transparent",
                      color: filterPeriod === tab.id ? "white" : "#4A4A4A",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Notifications */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">5</span>
                </div>
              </motion.button>
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

      {/* Profile Card Modal */}
      <AnimatePresence>
        {showProfileCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProfileCard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4"
                  style={{ backgroundColor: "#1F3A93" }}
                >
                  SA
                </div>
                <h2 className="text-xl font-bold text-gray-900">Sarah Ahmad</h2>
                <p className="text-gray-600">Immigration Agent</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Global Immigration Services
                    </p>
                    <p className="text-sm text-gray-600">
                      Senior Immigration Consultant
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Toronto, Canada</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    sarah.ahmad@globalimmig.com
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">8 years experience</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Specialized in work permits, study visas, and permanent
                    residency applications for North America and Europe.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  className="flex-1"
                  style={{ backgroundColor: "#1F3A93", color: "white" }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowProfileCard(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
