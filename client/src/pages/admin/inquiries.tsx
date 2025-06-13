import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Inquiry } from "@shared/schema";
import { 
  Search, 
  MessageSquare, 
  Eye, 
  Calendar,
  Mail,
  Building,
  User,
  Filter,
  Download,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export default function AdminInquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ["/api/admin/inquiries"],
    queryFn: async () => {
      const response = await fetch("/api/admin/inquiries", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch inquiries");
      return response.json() as Promise<Inquiry[]>;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest("PUT", `/api/admin/inquiries/${id}`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "The inquiry status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update status.",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (id: number, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const exportInquiries = () => {
    if (!inquiries) return;
    
    const csvContent = [
      ["Name", "Email", "Company", "Service", "Status", "Message", "Date"].join(","),
      ...inquiries.map(inquiry => [
        inquiry.name,
        inquiry.email,
        inquiry.company || "",
        inquiry.service || "",
        inquiry.status,
        `"${inquiry.message?.replace(/"/g, '""') || ""}"`,
        new Date(inquiry.createdAt).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "closed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-orange-100 text-orange-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInquiries = inquiries?.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "" || inquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const statusCounts = inquiries?.reduce((acc, inquiry) => {
    acc[inquiry.status] = (acc[inquiry.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-dark">Inquiries</h1>
            <p className="text-gray-600">Manage customer inquiries and leads.</p>
          </div>
          <Button onClick={exportInquiries} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{inquiries?.length || 0}</div>
                  <div className="text-sm text-gray-600">Total Inquiries</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-8 h-8 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold">{statusCounts.new || 0}</div>
                  <div className="text-sm text-gray-600">New</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{statusCounts.in_progress || 0}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{statusCounts.closed || 0}</div>
                  <div className="text-sm text-gray-600">Closed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inquiries List */}
        <div className="grid gap-6">
          {isLoading ? (
            [...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : filteredInquiries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter ? "Try adjusting your filters." : "No customer inquiries yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-3 mb-2">
                        <span>{inquiry.name}</span>
                        <Badge className={getStatusColor(inquiry.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(inquiry.status)}
                            <span className="capitalize">{inquiry.status.replace('_', ' ')}</span>
                          </div>
                        </Badge>
                        {inquiry.service && (
                          <Badge variant="outline">{inquiry.service}</Badge>
                        )}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{inquiry.email}</span>
                        </div>
                        {inquiry.company && (
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4" />
                            <span>{inquiry.company}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedInquiry(inquiry)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Inquiry Details</DialogTitle>
                            <DialogDescription>
                              Full details of the customer inquiry
                            </DialogDescription>
                          </DialogHeader>
                          {selectedInquiry && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Name</label>
                                  <p className="text-lg">{selectedInquiry.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Email</label>
                                  <p className="text-lg">{selectedInquiry.email}</p>
                                </div>
                                {selectedInquiry.company && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Company</label>
                                    <p className="text-lg">{selectedInquiry.company}</p>
                                  </div>
                                )}
                                {selectedInquiry.service && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Service Interest</label>
                                    <p className="text-lg">{selectedInquiry.service}</p>
                                  </div>
                                )}
                              </div>
                              {selectedInquiry.message && (
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Message</label>
                                  <p className="mt-1 text-gray-900 bg-gray-50 p-4 rounded-lg">
                                    {selectedInquiry.message}
                                  </p>
                                </div>
                              )}
                              <div className="flex items-center justify-between pt-4 border-t">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Status</label>
                                  <div className="mt-1">
                                    <Select
                                      value={selectedInquiry.status}
                                      onValueChange={(status) => {
                                        handleStatusChange(selectedInquiry.id, status);
                                        setSelectedInquiry({...selectedInquiry, status});
                                      }}
                                    >
                                      <SelectTrigger className="w-40">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <label className="text-sm font-medium text-gray-600">Received</label>
                                  <p className="text-sm text-gray-500">
                                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Select
                        value={inquiry.status}
                        onValueChange={(status) => handleStatusChange(inquiry.id, status)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {inquiry.message && (
                    <p className="text-gray-600 line-clamp-3">
                      {inquiry.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
