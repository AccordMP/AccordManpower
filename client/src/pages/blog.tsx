import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SEOHead } from "@/components/ui/seo-head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["/api/blog", currentPage, 10, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(selectedCategory && { category: selectedCategory }),
      });
      const response = await fetch(`/api/blog?${params}`);
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json() as Promise<BlogPost[]>;
    },
  });

  const categories = [
    "Staffing Trends",
    "HR Management",
    "Industry Insights",
    "Remote Work",
    "Technology",
    "Best Practices"
  ];

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog Posts</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Blog & Insights - Latest Staffing Trends & HR Tips | Accord Manpower"
        description="Stay updated with the latest staffing trends, HR management tips, and industry insights. Expert advice for building effective teams and managing remote workforces."
        canonicalUrl={`${window.location.origin}/blog`}
        keywords="staffing blog, HR tips, remote work trends, workforce management, hiring best practices, staffing industry insights"
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Blog & Insights
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Stay ahead with the latest trends in staffing, workforce management, 
                and business growth strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("")}
                  >
                    All Categories
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-gradient-to-br from-neutral-light to-white">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-6 w-full mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory 
                    ? "Try adjusting your search terms or filters."
                    : "Check back soon for new articles."}
                </p>
                {(searchTerm || selectedCategory) && (
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <div className="relative overflow-hidden">
                      {post.featuredImage ? (
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        {post.category && (
                          <Badge className="bg-primary text-white">
                            {post.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-neutral-dark group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 mr-2" />
                          <span>Accord Team</span>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" className="text-primary hover:text-blue-700 font-medium text-sm p-0">
                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center px-4 py-2 bg-primary text-white rounded-md">
                    Page {currentPage}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={filteredPosts.length < 10}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Stay in the Know</h2>
              <p className="text-xl mb-8 text-blue-100">
                Subscribe to our newsletter for the latest insights, trends, and best practices in staffing and workforce management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                />
                <Button className="bg-accent hover:bg-green-700 text-white px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
