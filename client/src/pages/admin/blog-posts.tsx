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
import { insertBlogPostSchema } from "@shared/schema";
import type { BlogPost } from "@shared/schema";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  FileText,
  Calendar,
  Tag,
  User
} from "lucide-react";
import { z } from "zod";

const blogFormSchema = insertBlogPostSchema.extend({
  slug: z.string().min(1, "Slug is required"),
  tags: z.array(z.string()).optional(),
});

type BlogFormData = z.infer<typeof blogFormSchema>;

export default function AdminBlogPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const categories = [
    "Staffing Trends",
    "HR Management",
    "Industry Insights",
    "Remote Work",
    "Technology",
    "Best Practices"
  ];

  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/admin/blog"],
    queryFn: async () => {
      const response = await fetch("/api/admin/blog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json() as Promise<BlogPost[]>;
    },
  });

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      featuredImage: "",
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      category: "",
      isPublished: false,
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: BlogFormData) => {
      const tags = tagsInput.split(",").map(tag => tag.trim()).filter(Boolean);
      return apiRequest("POST", "/api/admin/blog", { ...data, tags });
    },
    onSuccess: () => {
      toast({
        title: "Blog Post Created",
        description: "The blog post has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setIsCreateDialogOpen(false);
      form.reset();
      setTagsInput("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post.",
        variant: "destructive",
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BlogFormData }) => {
      const tags = tagsInput.split(",").map(tag => tag.trim()).filter(Boolean);
      return apiRequest("PUT", `/api/admin/blog/${id}`, { ...data, tags });
    },
    onSuccess: () => {
      toast({
        title: "Blog Post Updated",
        description: "The blog post has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setEditingPost(null);
      form.reset();
      setTagsInput("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post.",
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Blog Post Deleted",
        description: "The blog post has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BlogFormData) => {
    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, data });
    } else {
      createPostMutation.mutate(data);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    form.reset({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || "",
      featuredImage: post.featuredImage || "",
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
      canonicalUrl: post.canonicalUrl || "",
      category: post.category || "",
      isPublished: post.isPublished || false,
    });
    setTagsInput(post.tags?.join(", ") || "");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deletePostMutation.mutate(id);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-dark">Blog Posts</h1>
            <p className="text-gray-600">Create and manage your blog content.</p>
          </div>
          <Dialog open={isCreateDialogOpen || !!editingPost} onOpenChange={(open) => {
            if (!open) {
              setIsCreateDialogOpen(false);
              setEditingPost(null);
              form.reset();
              setTagsInput("");
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                </DialogTitle>
                <DialogDescription>
                  {editingPost 
                    ? "Update the blog post information and content."
                    : "Create a new blog post for your website."
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
                              placeholder="Blog post title"
                              onChange={(e) => {
                                field.onChange(e);
                                if (!editingPost) {
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
                            <Input {...field} placeholder="blog-post-slug" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://example.com/image.jpg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={3}
                            placeholder="Brief description of the post..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={10}
                            placeholder="Blog post content..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <label className="text-sm font-medium">Tags</label>
                    <Input
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="tag1, tag2, tag3"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate tags with commas
                    </p>
                  </div>

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
                            <Input {...field} placeholder="https://example.com/blog/post" />
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
                        setEditingPost(null);
                        form.reset();
                        setTagsInput("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createPostMutation.isPending || updatePostMutation.isPending}
                    >
                      {editingPost ? "Update Post" : "Create Post"}
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
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Posts List */}
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
          ) : filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try adjusting your search terms." : "Create your first blog post to get started."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-2 mb-2">
                        <span>{post.title}</span>
                        <Badge variant={post.isPublished ? "default" : "secondary"}>
                          {post.isPublished ? "Published" : "Draft"}
                        </Badge>
                        {post.category && (
                          <Badge variant="outline">{post.category}</Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>Admin</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Tag className="w-4 h-4" />
                            <span>{post.tags.length} tags</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 5).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 5} more
                        </Badge>
                      )}
                    </div>
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
