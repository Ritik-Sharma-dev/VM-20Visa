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
import { PostVisaRequest } from "@/components/dashboard/post-visa-request";
import { BrowseAgents } from "@/components/dashboard/browse-agents";
import { AgentProposals } from "@/components/dashboard/agent-proposals";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { DocumentUpload } from "@/components/dashboard/document-upload";
import { MessagingPanel } from "@/components/dashboard/messaging-panel";
import { AIAssistant } from "@/components/dashboard/ai-assistant";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { FloatingAIAssistant } from "@/components/dashboard/floating-ai-assistant";

type DashboardView =
  | "my-requests"
  | "browse-agents"
  | "proposals"
  | "track-progress"
  | "documents"
  | "ratings"
  | "ai-assistant";

export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<DashboardView>("overview");
  const [notifications, setNotifications] = useState(3);

  // Auto-save functionality
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "vm-visa-dashboard-state",
        JSON.stringify({
          currentView,
          sidebarOpen,
          timestamp: Date.now(),
        }),
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentView, sidebarOpen]);

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
          setSidebarOpen(state.sidebarOpen);
        }
      } catch (error) {
        console.error("Failed to restore dashboard state:", error);
      }
    }
  }, []);

  const sidebarItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: Home,
      badge: null,
      description: "Overview & Statistics",
    },
    {
      id: "post-request",
      label: "Post Request",
      icon: Plus,
      badge: null,
      description: "Create New Visa Request",
    },
    {
      id: "browse-agents",
      label: "Browse Agents",
      icon: Users,
      badge: "New",
      description: "Find Immigration Experts",
    },
    {
      id: "proposals",
      label: "Proposals",
      icon: FileText,
      badge: "3",
      description: "Agent Proposals & Offers",
    },
    {
      id: "track-progress",
      label: "Track Progress",
      icon: BarChart3,
      badge: null,
      description: "Application Status",
    },
    {
      id: "documents",
      label: "Documents",
      icon: Upload,
      badge: null,
      description: "Upload & Manage Files",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageCircle,
      badge: "5",
      description: "Chat with Agents",
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: Bot,
      badge: "AI",
      description: "Smart Immigration Help",
    },
  ];

  const quickActions = [
    {
      label: "Post Request",
      icon: Plus,
      action: () => setCurrentView("post-request"),
      color: "from-royal-blue-500 to-sky-blue-400",
    },
    {
      label: "Smart Write",
      icon: Bot,
      action: () => setCurrentView("ai-assistant"),
      color: "from-sage-green-500 to-mint-green-400",
    },
    {
      label: "Upload Docs",
      icon: Upload,
      action: () => setCurrentView("documents"),
      color: "from-gold-500 to-sandstone-400",
    },
    {
      label: "Schedule Call",
      icon: Calendar,
      action: () => {
        /* Open calendar modal */
      },
      color: "from-royal-blue-600 to-royal-blue-500",
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <DashboardOverview onNavigate={setCurrentView} />;
      case "post-request":
        return <PostVisaRequest />;
      case "browse-agents":
        return <BrowseAgents />;
      case "proposals":
        return <AgentProposals />;
      case "track-progress":
        return <ProgressTracker />;
      case "documents":
        return <DocumentUpload />;
      case "messages":
        return <MessagingPanel />;
      case "ai-assistant":
        return <AIAssistant />;
      default:
        return <DashboardOverview onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50/30 to-sage-green-50/20">
      {/* Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: sidebarOpen ? 0 : -320 }}
          animate={{ x: sidebarOpen ? 0 : -320 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 h-screen w-80 glass-card border-r border-white/20 z-50 overflow-y-auto"
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-royal rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-heading font-bold gradient-text">
                    VM Visa
                  </h1>
                  <p className="text-xs text-cool-gray-600">Client Dashboard</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* User Profile */}
            <div className="mt-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-cool-gray-800">John Doe</h3>
                  <p className="text-sm text-cool-gray-600">Premium Client</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentView(item.id as DashboardView)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 group",
                    currentView === item.id
                      ? "bg-white/30 text-royal-blue-700 shadow-sm"
                      : "hover:bg-white/20 text-cool-gray-700 hover:text-royal-blue-700",
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-cool-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  {item.badge && (
                    <Badge
                      variant={item.badge === "AI" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-cool-gray-600 mb-4 uppercase tracking-wide">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.action}
                    className={`p-4 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    <action.icon className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-xs font-medium">{action.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Logout */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <Button variant="ghost" className="w-full justify-start group">
                <LogOut className="w-4 h-4 mr-3 group-hover:text-red-500" />
                <span className="group-hover:text-red-500">Logout</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          sidebarOpen ? "ml-80" : "ml-0",
        )}
      >
        {/* Top Bar */}
        <div className="h-16 glass-card border-b border-white/20 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}

            <h2 className="text-2xl font-heading font-bold text-cool-gray-800">
              {sidebarItems.find((item) => item.id === currentView)?.label ||
                "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
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
    </div>
  );
}
