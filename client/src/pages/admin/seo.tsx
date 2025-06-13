import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertSeoSettingsSchema } from "@shared/schema";
import type { SeoSettings } from "@shared/schema";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Globe,
  Search,
  BarChart,
  FileText,
  Settings,
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { z } from "zod";

const seoFormSchema = insertSeoSettingsSchema.extend({
  pageType: z.string().min(1, "Page type is required"),
  settings: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    twitterCard: z.string().optional(),
    canonicalUrl: z.string().optional(),
    robots: z.string().optional(),
    schema: z.string().optional(),
  }),
});

type SeoFormData = z.infer<typeof seoFormSchema>;

export default function AdminSEO() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSettings, setEditingSettings] = useState<SeoSettings | null>(null);
  const [activeTab, setActiveTab] = useState("settings");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const pageTypes = [
    { value: "global", label: "Global Settings" },
    { value: "home", label: "Home Page" },
    { value: "services", label: "Services Page" },
    { value: "about", label: "About Page" },
    { value: "blog", label: "Blog Page" },
    { value: "contact", label: "Contact Page" },
  ];

  const { data: seoSettings, isLoading } = useQuery({
    queryKey: ["/api/admin/seo"],
    queryFn: async () => {
      const response = await fetch("/api/admin/seo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch SEO settings");
      return response.json() as Promise<SeoSettings[]>;
    },
  });

  const { data: sitemap } = useQuery({
    queryKey: ["/api/sitemap.xml"],
    queryFn: async () => {
      const response = await fetch("/api/sitemap.xml");
      if (!response.ok) throw new Error("Failed to fetch sitemap");
      return response.text();
    },
  });

  const form = useForm<SeoFormData>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      pageType: "",
      settings: {
        title: "",
        description: "",
        keywords: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        twitterCard: "summary_large_image",
        canonicalUrl: "",
        robots: "index, follow",
        schema: "",
      },
    },
  });

  const createSettingsMutation = useMutation({
    mutationFn: async (data: SeoFormData) => {
      return apiRequest("POST", "/api/admin/seo", data);
    },
    onSuccess: () => {
      toast({
        title: "SEO Settings Created",
        description: "The SEO settings have been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo"] });
      setIsCreateDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create SEO settings.",
        variant: "destructive",
      });
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: SeoFormData }) => {
      return apiRequest("PUT", `/api/admin/seo/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "SEO Settings Updated",
        description: "The SEO settings have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo"] });
      setEditingSettings(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update SEO settings.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SeoFormData) => {
    if (editingSettings) {
      updateSettingsMutation.mutate({ id: editingSettings.id, data });
    } else {
      createSettingsMutation.mutate(data);
    }
  };

  const handleEdit = (settings: SeoSettings) => {
    setEditingSettings(settings);
    form.reset({
      pageType: settings.pageType,
      settings: settings.settings as any,
    });
  };

  const seoAnalysis = {
    totalPages: seoSettings?.length || 0,
    configuredPages: seoSettings?.filter(s => s.settings && Object.keys(s.settings).length > 0).length || 0,
    missingMeta: seoSettings?.filter(s => !s.settings?.description).length || 0,
    missingOg: seoSettings?.filter(s => !s.settings?.ogTitle).length || 0,
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-dark">SEO Management</h1>
            <p className="text-gray-600">Configure SEO settings and monitor performance.</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <a href="/api/sitemap.xml" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Sitemap
              </a>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="settings">SEO Settings</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-2xl font-bold">{seoAnalysis.totalPages}</div>
                      <div className="text-sm text-gray-600">Total Configurations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">{seoAnalysis.configuredPages}</div>
                      <div className="text-sm text-gray-600">Fully Configured</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                    <div>
                      <div className="text-2xl font-bold">{seoAnalysis.missingMeta}</div>
                      <div className="text-sm text-gray-600">Missing Meta Desc</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">{seoAnalysis.missingOg}</div>
                      <div className="text-sm text-gray-600">Missing OG Tags</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Create Button */}
            <div className="flex justify-end">
              <Dialog open={isCreateDialogOpen || !!editingSettings} onOpenChange={(open) => {
                if (!open) {
                  setIsCreateDialogOpen(false);
                  setEditingSettings(null);
                  form.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add SEO Configuration
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingSettings ? "Edit SEO Settings" : "Create SEO Configuration"}
                    </DialogTitle>
                    <DialogDescription>
                      Configure SEO metadata for a specific page type.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="pageType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Page Type *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select page type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {pageTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h4 className="font-medium">Basic SEO</h4>
                        
                        <FormField
                          control={form.control}
                          name="settings.title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title Tag</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Page title for search engines" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="settings.description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={3}
                                  placeholder="Brief description for search results"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="settings.keywords"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Keywords</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="keyword1, keyword2, keyword3" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Open Graph</h4>
                        
                        <FormField
                          control={form.control}
                          name="settings.ogTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OG Title</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Title for social media sharing" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="settings.ogDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OG Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={3}
                                  placeholder="Description for social media sharing"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="settings.ogImage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OG Image URL</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="https://example.com/image.jpg" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Advanced Settings</h4>
                        
                        <FormField
                          control={form.control}
                          name="settings.canonicalUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Canonical URL</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="https://example.com/page" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="settings.robots"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Robots</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select robots directive" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="index, follow">Index, Follow</SelectItem>
                                  <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                                  <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                                  <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="settings.schema"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Schema Markup (JSON-LD)</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={6}
                                  placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsCreateDialogOpen(false);
                            setEditingSettings(null);
                            form.reset();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={createSettingsMutation.isPending || updateSettingsMutation.isPending}
                        >
                          {editingSettings ? "Update Settings" : "Create Settings"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Settings List */}
            <div className="grid gap-6">
              {isLoading ? (
                [...Array(3)].map((_, index) => (
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
              ) : seoSettings?.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No SEO configurations</h3>
                    <p className="text-gray-500">Create your first SEO configuration to get started.</p>
                  </CardContent>
                </Card>
              ) : (
                seoSettings?.map((settings) => (
                  <Card key={settings.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span className="capitalize">{settings.pageType.replace('_', ' ')} Settings</span>
                            <Badge variant="outline">
                              {pageTypes.find(p => p.value === settings.pageType)?.label || settings.pageType}
                            </Badge>
                          </CardTitle>
                          <div className="text-sm text-gray-500 mt-2">
                            Last updated: {new Date(settings.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(settings)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        {settings.settings?.title && (
                          <div>
                            <label className="font-medium text-gray-600">Title:</label>
                            <p className="text-gray-900">{settings.settings.title}</p>
                          </div>
                        )}
                        {settings.settings?.description && (
                          <div>
                            <label className="font-medium text-gray-600">Description:</label>
                            <p className="text-gray-900 line-clamp-2">{settings.settings.description}</p>
                          </div>
                        )}
                        {settings.settings?.keywords && (
                          <div>
                            <label className="font-medium text-gray-600">Keywords:</label>
                            <p className="text-gray-900">{settings.settings.keywords}</p>
                          </div>
                        )}
                        {settings.settings?.robots && (
                          <div>
                            <label className="font-medium text-gray-600">Robots:</label>
                            <p className="text-gray-900">{settings.settings.robots}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="w-5 h-5" />
                  <span>SEO Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Configuration Status</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Well Configured</span>
                        </div>
                        <p className="text-sm text-green-700">
                          {seoAnalysis.configuredPages} out of {seoAnalysis.totalPages} page types have complete SEO configurations.
                        </p>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-orange-800">Needs Attention</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          {seoAnalysis.missingMeta} page types are missing meta descriptions.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Recommendations</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>All pages have title tags configured</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Consider adding Open Graph images for better social sharing</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Sitemap is automatically generated and up to date</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sitemap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>XML Sitemap</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sitemap ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Your sitemap is automatically generated and includes all published pages and blog posts.
                      </p>
                      <Button variant="outline" asChild>
                        <a href="/api/sitemap.xml" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full Sitemap
                        </a>
                      </Button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                        {sitemap.substring(0, 2000)}
                        {sitemap.length > 2000 && "..."}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Sitemap could not be loaded</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
