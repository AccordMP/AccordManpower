import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export function BlogPreviewSection() {
  const { data: posts } = useQuery({
    queryKey: ["/api/blog", 1, 3],
    queryFn: async () => {
      const response = await fetch("/api/blog?page=1&limit=3");
      if (!response.ok) return [];
      return response.json() as Promise<BlogPost[]>;
    },
  });

  // Fallback blog posts for when no data is available
  const fallbackPosts = [
    {
      id: 1,
      title: "The Future of Remote Work: Trends to Watch in 2025",
      excerpt: "Explore the latest remote work trends and how they're shaping the future of global employment...",
      author: "Emma Wilson",
      createdAt: new Date().toISOString(),
      category: "Staffing Trends",
      slug: "future-of-remote-work-2025",
      featuredImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      id: 2,
      title: "5 Best Practices for Hiring Virtual Teams",
      excerpt: "Learn proven strategies for building effective virtual teams that drive business success...",
      author: "Alex Thompson",
      createdAt: new Date().toISOString(),
      category: "HR Management",
      slug: "hiring-virtual-teams-best-practices",
      featuredImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      id: 3,
      title: "Global Workforce Management in 2025",
      excerpt: "Navigate the complexities of managing international teams with expert insights and strategies...",
      author: "Maria Garcia",
      createdAt: new Date().toISOString(),
      category: "Industry Insights",
      slug: "global-workforce-management-2025",
      featuredImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
  ];

  const displayPosts = posts && posts.length > 0 ? posts : fallbackPosts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in staffing, remote work, and workforce management.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {displayPosts.slice(0, 3).map((post, index) => (
            <article key={post.id || index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="relative overflow-hidden">
                <img 
                  src={post.featuredImage || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white">
                    {post.category || "Staffing Trends"}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {formatDate(post.publishedAt || post.createdAt)}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-dark group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.author || "Accord Team"}</span>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="text-primary hover:text-blue-700 font-medium text-sm p-0">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              View All Articles <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
