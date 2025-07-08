import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Grid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PostVisaRequest } from "./post-visa-request";

interface VisaRequest {
  id: string;
  title: string;
  visaType: string;
  country: string;
  status: "pending" | "in-progress" | "completed" | "rejected";
  budget: string;
  timeline: string;
  description: string;
  createdAt: string;
  proposalCount: number;
  priority: "low" | "medium" | "high" | "urgent";
}

export function MyRequests() {
  const [showPostRequest, setShowPostRequest] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProposals, setShowProposals] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );

  // Mock data for pending requests
  const mockRequests: VisaRequest[] = [
    {
      id: "req_001",
      title: "Canada Express Entry PR Application",
      visaType: "Permanent Residence",
      country: "Canada",
      status: "pending",
      budget: "$2,500 - $5,000",
      timeline: "3-6 months",
      description:
        "Looking for assistance with Express Entry application. I have 3 years work experience in software development...",
      createdAt: "2024-01-15",
      proposalCount: 8,
      priority: "high",
    },
    {
      id: "req_002",
      title: "UK Student Visa Application",
      visaType: "Student Visa",
      country: "United Kingdom",
      status: "in-progress",
      budget: "$1,000 - $2,500",
      timeline: "2-3 months",
      description:
        "Need help with Tier 4 student visa application for Master's program at UCL...",
      createdAt: "2024-01-10",
      proposalCount: 12,
      priority: "medium",
    },
    {
      id: "req_003",
      title: "US H-1B Work Visa",
      visaType: "Work Permit",
      country: "United States",
      status: "completed",
      budget: "$5,000 - $10,000",
      timeline: "6+ months",
      description:
        "Assistance needed for H-1B application with current employer sponsorship...",
      createdAt: "2024-01-05",
      proposalCount: 15,
      priority: "urgent",
    },
    {
      id: "req_004",
      title: "Australia Tourist Visa",
      visaType: "Tourist Visa",
      country: "Australia",
      status: "pending",
      budget: "Under $500",
      timeline: "1 month",
      description: "Simple tourist visa application for 2-week vacation...",
      createdAt: "2024-01-12",
      proposalCount: 3,
      priority: "low",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <AlertTriangle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredRequests = mockRequests.filter((request) => {
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.visaType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort to show pending requests first
  const sortedRequests = filteredRequests.sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Mock proposals data
  const mockProposals = [
    {
      id: "prop_001",
      requestId: "req_001",
      agentName: "Sarah Johnson",
      agentRating: 4.9,
      agentExperience: "8+ years",
      agentLocation: "Toronto, Canada",
      price: "$2,800",
      timeline: "3-4 months",
      description:
        "I specialize in Canadian immigration and have successfully processed over 200 Express Entry applications with a 98% success rate.",
      status: "pending",
      createdAt: "2024-01-16",
    },
    {
      id: "prop_002",
      requestId: "req_001",
      agentName: "Michael Chen",
      agentRating: 4.8,
      agentExperience: "12+ years",
      agentLocation: "Vancouver, Canada",
      price: "$3,200",
      timeline: "2-3 months",
      description:
        "Expert in Express Entry with government connections. I can expedite your application and ensure all documents are perfect.",
      status: "pending",
      createdAt: "2024-01-17",
    },
  ];

  const handleViewProposals = (requestId: string) => {
    setSelectedRequestId(requestId);
    setShowProposals(true);
  };

  if (showPostRequest) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => setShowPostRequest(false)}
            className="group"
          >
            ← Back to My Requests
          </Button>
        </div>
        <PostVisaRequest />
      </div>
    );
  }

  if (showProposals) {
    const currentRequest = mockRequests.find(
      (req) => req.id === selectedRequestId,
    );
    const requestProposals = mockProposals.filter(
      (prop) => prop.requestId === selectedRequestId,
    );

    return (
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => setShowProposals(false)}
            className="group"
          >
            ← Back to My Requests
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
            Proposals for: {currentRequest?.title}
          </h1>
          <p className="text-lg text-cool-gray-600">
            {requestProposals.length} agents have submitted proposals for this
            request
          </p>
        </div>

        <div className="space-y-6">
          {requestProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 border-2 border-transparent hover:border-royal-blue-200 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Agent Info */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-royal-blue-500 to-royal-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {proposal.agentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cool-gray-800">
                      {proposal.agentName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-cool-gray-600 mb-2">
                      <span>⭐ {proposal.agentRating} Rating</span>
                      <span>📍 {proposal.agentLocation}</span>
                      <span>💼 {proposal.agentExperience}</span>
                    </div>
                    <p className="text-cool-gray-700">{proposal.description}</p>
                  </div>
                </div>

                {/* Proposal Details */}
                <div className="lg:w-80 bg-royal-blue-50 rounded-xl p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-cool-gray-600">Price:</span>
                      <span className="font-bold text-royal-blue-700 text-xl">
                        {proposal.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cool-gray-600">Timeline:</span>
                      <span className="font-semibold">{proposal.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cool-gray-600">Submitted:</span>
                      <span className="text-sm">{proposal.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-sage-green-500 hover:bg-sage-green-600">
                      Accept
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-cool-gray-800 mb-2">
            My Visa Requests
          </h1>
          <p className="text-lg text-cool-gray-600">
            Manage your visa applications and track their progress
          </p>
        </div>

        <Button
          onClick={() => setShowPostRequest(true)}
          variant="premium"
          size="lg"
          className="group"
        >
          <Plus className="w-5 h-5 mr-2" />
          Post New Request
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className="glass-card p-6 rounded-2xl mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray-500" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white/60 border border-white/30 rounded-xl focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 text-sm backdrop-blur-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-cool-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/60 border border-white/30 rounded-lg px-3 py-2 text-sm backdrop-blur-sm focus:ring-2 focus:ring-royal-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/60 rounded-lg p-1 backdrop-blur-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  viewMode === "grid"
                    ? "bg-royal-blue-500 text-white"
                    : "text-cool-gray-600 hover:text-royal-blue-600",
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  viewMode === "list"
                    ? "bg-royal-blue-500 text-white"
                    : "text-cool-gray-600 hover:text-royal-blue-600",
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Grid/List */}
      {sortedRequests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 rounded-2xl text-center"
        >
          <FileText className="w-16 h-16 text-cool-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-cool-gray-700 mb-2">
            No visa requests found
          </h3>
          <p className="text-cool-gray-500 mb-6">
            {searchQuery || filterStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Start by creating your first visa request"}
          </p>
          <Button
            onClick={() => setShowPostRequest(true)}
            variant="premium"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create First Request
          </Button>
        </motion.div>
      ) : (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-4",
          )}
        >
          {sortedRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "glass-card rounded-2xl p-6 group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-royal-blue-200",
                viewMode === "list" && "flex items-center gap-6",
              )}
            >
              {/* Priority Indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      getPriorityColor(request.priority),
                    )}
                  />
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">
                      {request.status.replace("-", " ")}
                    </span>
                  </Badge>
                </div>
                <span className="text-xs text-cool-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className={cn(viewMode === "list" && "flex-1")}>
                {/* Request Title */}
                <h3 className="font-heading font-bold text-lg text-cool-gray-800 mb-2 line-clamp-2">
                  {request.title}
                </h3>

                {/* Request Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-cool-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-sage-green-500" />
                    <span>
                      {request.country} • {request.visaType}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-cool-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-gold-500" />
                    <span>{request.budget}</span>
                  </div>
                  <div className="flex items-center text-sm text-cool-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-royal-blue-500" />
                    <span>{request.timeline}</span>
                  </div>
                </div>

                {/* Description Preview */}
                <p className="text-sm text-cool-gray-600 line-clamp-2 mb-4">
                  {request.description}
                </p>

                {/* Proposals Count */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cool-gray-600">
                    <strong className="text-royal-blue-600">
                      {request.proposalCount}
                    </strong>{" "}
                    proposals received
                  </span>
                  <span className="text-xs text-cool-gray-500 capitalize">
                    {request.priority} priority
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div
                className={cn(
                  "flex gap-2 mt-4",
                  viewMode === "list" && "mt-0 flex-col",
                )}
              >
                <Button variant="outline" size="sm" className="group">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="group">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                {request.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="group text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
