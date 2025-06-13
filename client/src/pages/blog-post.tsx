import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SEOHead } from "@/components/ui/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["/api/blog", params.slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${params.slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Post not found");
        }
        throw new Error("Failed to fetch blog post");
      }
      return response.json() as Promise<BlogPost>;
    },
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["/api/blog", 1, 3, post?.category],
    queryFn: async () => {
      if (!post?.category) return [];
      const response = await fetch(`/api/blog?page=1&limit=3&category=${post.category}`);
      if (!response.ok) return [];
      const posts = await response.json() as BlogPost[];
      return posts.filter(p => p.id !== post.id).slice(0, 3);
    },
    enabled: !!post,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      return;
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  if (error) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {error.message === "Post not found" ? "Blog Post Not Found" : "Error Loading Post"}
            </h1>
            <p className="text-gray-600 mb-6">
              {error.message === "Post not found" 
                ? "The blog post you're looking for doesn't exist or has been removed."
                : "Please try again later."}
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isLoading || !post) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-8 w-32 mb-6" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-8" />
              <Skeleton className="h-64 w-full mb-8" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Accord Manpower Blog`}
        description={post.excerpt || post.metaDescription || `Read ${post.title} on the Accord Manpower blog.`}
        canonicalUrl={`${window.location.origin}/blog/${post.slug}`}
        ogTitle={post.title}
        ogDescription={post.excerpt}
        ogImage={post.featuredImage}
        ogType="article"
        keywords={post.tags?.join(", ")}
        publishedTime={post.publishedAt || post.createdAt}
        modifiedTime={post.updatedAt}
      />
      
      <Header />
      
      <main className="pt-20">
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back to Blog */}
              <Link href="/blog">
                <Button variant="ghost" className="mb-8">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>

              {/* Article Header */}
              <header className="mb-12">
                {post.category && (
                  <Badge className="bg-primary text-white mb-4">
                    {post.category}
                  </Badge>
                )}
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-neutral-dark leading-tight">
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Accord Team
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {estimateReadingTime(post.content)} min read
                  </div>
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="mb-12">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                )}

                {/* Share Buttons */}
                <div className="flex items-center gap-4 pb-8 border-b">
                  <span className="text-sm font-medium text-gray-700">Share:</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sharePost('facebook')}
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sharePost('twitter')}
                      className="text-blue-400 hover:bg-blue-50"
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sharePost('linkedin')}
                      className="text-blue-700 hover:bg-blue-50"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sharePost('copy')}
                      className="text-gray-600 hover:bg-gray-50"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator className="my-12" />

              {/* Author Bio */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Accord Manpower Team</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our team of staffing experts and industry professionals share insights, 
                      trends, and best practices to help businesses optimize their workforce management. 
                      With years of experience in global talent acquisition, we provide valuable 
                      guidance for modern HR challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-neutral-light to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center gradient-text">
                  Related Articles
                </h2>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          {relatedPost.featuredImage ? (
                            <img 
                              src={relatedPost.featuredImage} 
                              alt={relatedPost.title}
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                              <span className="text-white text-4xl font-bold">
                                {relatedPost.title.charAt(0)}
                              </span>
                            </div>
                          )}
                          {relatedPost.category && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-primary text-white">
                                {relatedPost.category}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="text-sm text-gray-500 mb-2">
                            {relatedPost.publishedAt ? formatDate(relatedPost.publishedAt) : formatDate(relatedPost.createdAt)}
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-neutral-dark">
                            {relatedPost.title}
                          </h3>
                          {relatedPost.excerpt && (
                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                              {relatedPost.excerpt}
                            </p>
                          )}
                          <Link href={`/blog/${relatedPost.slug}`}>
                            <Button variant="ghost" className="text-primary hover:text-blue-700 font-medium text-sm p-0">
                              Read More <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </>
  );
}
