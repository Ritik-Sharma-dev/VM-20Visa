import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  FileText,
  Calendar,
  MessageCircle,
  Star,
  Upload,
  Bot,
  ArrowRight,
  Plus,
  Globe,
  Award,
} from "lucide-react";

interface DashboardOverviewProps {
  onNavigate: (view: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const stats = [
    {
      label: "Active Requests",
      value: "3",
      change: "+2 this month",
      icon: FileText,
      color: "from-royal-blue-500 to-sky-blue-400",
      trend: "up",
    },
    {
      label: "Proposals Received",
      value: "12",
      change: "+5 new",
      icon: Users,
      color: "from-sage-green-500 to-mint-green-400",
      trend: "up",
    },
    {
      label: "Documents Uploaded",
      value: "24",
      change: "8 pending review",
      icon: Upload,
      color: "from-gold-500 to-sandstone-400",
      trend: "neutral",
    },
  ];

  const recentActivity = [
    {
      type: "proposal",
      message: "New proposal from Sarah Chen for Canada PR",
      time: "2 hours ago",
      icon: Users,
      color: "text-sage-green-600",
    },
    {
      type: "document",
      message: "Passport copy uploaded successfully",
      time: "4 hours ago",
      icon: Upload,
      color: "text-royal-blue-600",
    },
    {
      type: "message",
      message: "New message from immigration advisor",
      time: "1 day ago",
      icon: MessageCircle,
      color: "text-gold-600",
    },
    {
      type: "progress",
      message: "Application status updated to 'Under Review'",
      time: "2 days ago",
      icon: Clock,
      color: "text-cool-gray-600",
    },
  ];

  const activeApplications = [
    {
      id: 1,
      title: "Canada Permanent Residence",
      agent: "Sarah Chen",
      status: "Documents Review",
      progress: 75,
      dueDate: "Dec 15, 2024",
      priority: "high",
    },
    {
      id: 2,
      title: "UK Student Visa",
      agent: "James Wilson",
      status: "Application Submitted",
      progress: 90,
      dueDate: "Jan 10, 2025",
      priority: "medium",
    },
    {
      id: 3,
      title: "Australia Work Permit",
      agent: "Maria Rodriguez",
      status: "Initial Review",
      progress: 45,
      dueDate: "Feb 20, 2025",
      priority: "low",
    },
  ];

  const quickActions = [
    {
      title: "Post New Request",
      description: "Start a new visa application",
      icon: Plus,
      action: () => onNavigate("my-requests"),
      color: "from-royal-blue-500 to-sky-blue-400",
    },
    {
      title: "AI Smart Write",
      description: "Generate application text",
      icon: Bot,
      action: () => onNavigate("ai-assistant"),
      color: "from-sage-green-500 to-mint-green-400",
    },
    {
      title: "Upload Documents",
      description: "Add required documents",
      icon: Upload,
      action: () => onNavigate("documents"),
      color: "from-gold-500 to-sandstone-400",
    },
    {
      title: "Schedule Call",
      description: "Book agent consultation",
      icon: Calendar,
      action: () => {
        /* Open calendar modal */
      },
      color: "from-royal-blue-600 to-royal-blue-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 rounded-3xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-cool-gray-800 mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-lg text-cool-gray-600 mb-4">
              You have 3 active applications and 5 new messages from agents.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-sage-green-100 text-sage-green-700">
                Premium Member
              </Badge>
              <Badge className="bg-gold-100 text-gold-700">
                Success Rate: 98%
              </Badge>
            </div>
          </div>
          <div className="mt-6 lg:mt-0">
            <Button
              variant="premium"
              size="lg"
              onClick={() => onNavigate("my-requests")}
              className="group"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Application
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-6 rounded-2xl hover:bg-white/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.trend === "up" && (
                <TrendingUp className="w-4 h-4 text-sage-green-500" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-heading font-bold text-cool-gray-800">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-cool-gray-600">
                {stat.label}
              </p>
              <p
                className={`text-xs ${
                  stat.trend === "up"
                    ? "text-sage-green-600"
                    : "text-cool-gray-500"
                }`}
              >
                {stat.change}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Applications */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card p-6 rounded-3xl h-fit"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-cool-gray-800">
                Active Applications
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("applications")}
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {activeApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-white/30 rounded-2xl border border-white/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-cool-gray-800">
                        {app.title}
                      </h3>
                      <p className="text-sm text-cool-gray-600">
                        Agent: {app.agent}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        app.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : app.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {app.priority}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cool-gray-600">Progress</span>
                      <span className="font-medium">{app.progress}%</span>
                    </div>
                    <div className="w-full bg-cool-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-royal h-2 rounded-full transition-all duration-500"
                        style={{ width: `${app.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cool-gray-600">Due Date</span>
                      <span className="font-medium">{app.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card p-6 rounded-3xl"
          >
            <h2 className="text-xl font-heading font-bold text-cool-gray-800 mb-6">
              Quick Actions
            </h2>

            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className="w-full p-4 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/20 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center`}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-cool-gray-800">
                        {action.title}
                      </h3>
                      <p className="text-sm text-cool-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-cool-gray-800">
                Recent Activity
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 ${activity.color}`}
                  >
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cool-gray-800 leading-relaxed">
                      {activity.message}
                    </p>
                    <p className="text-xs text-cool-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
