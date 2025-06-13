import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertPageSchema } from "@shared/schema";
import type { Page } from "@shared/schema";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  FileText,
  Globe,
  Calendar
} from "lucide-react";
import { z } from "zod";

const pageFormSchema = insertPageSchema.extend({
  slug: z.string().min(1, "Slug is required"),
});

type PageFormData = z.infer<typeof pageFormSchema>;

export default function AdminPages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pages, isLoading } = useQuery({
    queryKey: ["/api/admin/pages"],
    queryFn: async () => {
      const response = await fetch("/api/admin/pages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch pages");
      return response.json() as Promise<Page[]>;
    },
  });

  const form = useForm<PageFormData>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      isPublished: false,
    },
  });

  const createPageMutation = useMutation({
    mutationFn: async (data: PageFormData) => {
      return apiRequest("POST", "/api/admin/pages", data);
    },
    onSuccess: () => {
      toast({
        title: "Page Created",
        description: "The page has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      setIsCreateDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create page.",
        variant: "destructive",
      });
    },
  });

  const updatePageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: PageFormData }) => {
      return apiRequest("PUT", `/api/admin/pages/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Page Updated",
        description: "The page has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      setEditingPage(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update page.",
        variant: "destructive",
      });
    },
  });

  const deletePageMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/pages/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Page Deleted",
        description: "The page has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete page.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PageFormData) => {
    if (editingPage) {
      updatePageMutation.mutate({ id: editingPage.id, data });
    } else {
      createPageMutation.mutate(data);
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    form.reset({
      title: page.title,
      slug: page.slug,
      content: page.content,
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      canonicalUrl: page.canonicalUrl || "",
      isPublished: page.isPublished || false,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this page?")) {
      deletePageMutation.mutate(id);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const filteredPages = pages?.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-dark">Pages</h1>
            <p className="text-gray-600">Manage your website pages and content.</p>
          </div>
          <Dialog open={isCreateDialogOpen || !!editingPage} onOpenChange={(open) => {
            if (!open) {
              setIsCreateDialogOpen(false);
              setEditingPage(null);
              form.reset();
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPage ? "Edit Page" : "Create New Page"}
                </DialogTitle>
                <DialogDescription>
                  {editingPage 
                    ? "Update the page information and content."
                    : "Create a new page for your website."
                  }
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Page title"
                              onChange={(e) => {
                                field.onChange(e);
                                if (!editingPage) {
                                  form.setValue("slug", generateSlug(e.target.value));
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="page-slug" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={8}
                            placeholder="Page content..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h4 className="font-medium">SEO Settings</h4>
                    
                    <FormField
                      control={form.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="SEO title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={3}
                              placeholder="SEO description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="canonicalUrl"
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
                  </div>

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Published</FormLabel>
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsCreateDialogOpen(false);
                        setEditingPage(null);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createPageMutation.isPending || updatePageMutation.isPending}
                    >
                      {editingPage ? "Update Page" : "Create Page"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Pages List */}
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
          ) : filteredPages.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try adjusting your search terms." : "Create your first page to get started."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPages.map((page) => (
              <Card key={page.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{page.title}</span>
                        <Badge variant={page.isPublished ? "default" : "secondary"}>
                          {page.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>/{page.slug}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(page.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(page)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(page.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2">
                    {page.content.length > 150
                      ? `${page.content.substring(0, 150)}...`
                      : page.content}
                  </p>
                  {page.metaDescription && (
                    <p className="text-sm text-gray-500 mt-2">
                      <strong>Meta:</strong> {page.metaDescription}
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
