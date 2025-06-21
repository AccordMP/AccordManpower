import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FileText, 
  MessageSquare, 
  Eye, 
  PlusCircle,
  TrendingUp,
  Users,
  Globe,
  Clock
} from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: () => api.get("/api/admin/stats"),
  });

  const quickActions = [
    {
      title: "Create New Page",
      description: "Add a new page to your website",
      icon: PlusCircle,
      href: "/admin/pages",
      color: "text-blue-600",
    },
    {
      title: "Write Blog Post",
      description: "Create a new blog post",
      icon: FileText,
      href: "/admin/blog",
      color: "text-green-600",
    },
    {
      title: "View Inquiries",
      description: "Check recent customer inquiries",
      icon: MessageSquare,
      href: "/admin/inquiries",
      color: "text-purple-600",
    },
    {
      title: "SEO Settings",
      description: "Manage SEO configurations",
      icon: Globe,
      href: "/admin/seo",
      color: "text-orange-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's an overview of your website's performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-dark">
                    {stats?.totalPages || 0}
                  </div>
                  <p className="text-xs text-gray-500">
                    {stats?.publishedPages || 0} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Blog Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-dark">
                    {stats?.totalPosts || 0}
                  </div>
                  <p className="text-xs text-gray-500">
                    {stats?.publishedPosts || 0} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-dark">
                    {stats?.totalInquiries || 0}
                  </div>
                  <p className="text-xs text-gray-500">
                    All time
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Website Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    All systems operational
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <action.icon className={`w-8 h-8 ${action.color} mb-4`} />
                    <h3 className="font-semibold text-neutral-dark mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Website launched</p>
                    <p className="text-xs text-gray-500">System initialization complete</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Admin panel configured</p>
                    <p className="text-xs text-gray-500">Ready for content management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">SEO settings initialized</p>
                    <p className="text-xs text-gray-500">Meta tags and sitemaps ready</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Performance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Page Load Speed</span>
                  <span className="text-sm font-medium text-green-600">Excellent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">SEO Score</span>
                  <span className="text-sm font-medium text-blue-600">Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mobile Responsiveness</span>
                  <span className="text-sm font-medium text-green-600">Optimized</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Security Status</span>
                  <span className="text-sm font-medium text-green-600">Secure</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Website Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Website Preview</span>
              </span>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Visit Website
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="bg-white rounded border shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="font-bold text-lg gradient-text">Accord Manpower</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Scale Your Business with Global Talent
                </h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive manpower outsourcing solutions tailored for modern businesses...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
