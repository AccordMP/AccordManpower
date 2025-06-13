import { 
  users, 
  pages, 
  blogPosts, 
  inquiries, 
  seoSettings,
  type User, 
  type InsertUser,
  type Page,
  type InsertPage,
  type BlogPost,
  type InsertBlogPost,
  type Inquiry,
  type InsertInquiry,
  type SeoSettings,
  type InsertSeoSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, count } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Page methods
  getAllPages(): Promise<Page[]>;
  getPublishedPages(): Promise<Page[]>;
  getPageById(id: number): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: number): Promise<void>;

  // Blog post methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(page?: number, limit?: number, category?: string): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Inquiry methods
  getAllInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry>;

  // SEO methods
  getAllSeoSettings(): Promise<SeoSettings[]>;
  getSeoSettings(pageType: string): Promise<SeoSettings | undefined>;
  createSeoSettings(settings: InsertSeoSettings): Promise<SeoSettings>;
  updateSeoSettings(id: number, settings: Partial<InsertSeoSettings>): Promise<SeoSettings>;

  // Admin stats
  getAdminStats(): Promise<any>;

  // Sitemap generation
  generateSitemap(): Promise<string>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Page methods
  async getAllPages(): Promise<Page[]> {
    return await db.select().from(pages).orderBy(desc(pages.updatedAt));
  }

  async getPublishedPages(): Promise<Page[]> {
    return await db.select().from(pages)
      .where(eq(pages.isPublished, true))
      .orderBy(desc(pages.updatedAt));
  }

  async getPageById(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page || undefined;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db.insert(pages).values(page).returning();
    return newPage;
  }

  async updatePage(id: number, page: Partial<InsertPage>): Promise<Page> {
    const [updatedPage] = await db
      .update(pages)
      .set({ ...page, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return updatedPage;
  }

  async deletePage(id: number): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));
  }

  async getPublishedBlogPosts(page: number = 1, limit: number = 10, category?: string): Promise<BlogPost[]> {
    const offset = (page - 1) * limit;
    
    let query = db.select().from(blogPosts)
      .where(eq(blogPosts.isPublished, true));

    if (category) {
      query = query.where(and(
        eq(blogPosts.isPublished, true),
        eq(blogPosts.category, category)
      ));
    }

    return await query
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Inquiry methods
  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return newInquiry;
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry> {
    const [updatedInquiry] = await db
      .update(inquiries)
      .set({ status, updatedAt: new Date() })
      .where(eq(inquiries.id, id))
      .returning();
    return updatedInquiry;
  }

  // SEO methods
  async getAllSeoSettings(): Promise<SeoSettings[]> {
    return await db.select().from(seoSettings).orderBy(desc(seoSettings.updatedAt));
  }

  async getSeoSettings(pageType: string): Promise<SeoSettings | undefined> {
    const [settings] = await db.select().from(seoSettings)
      .where(eq(seoSettings.pageType, pageType));
    return settings || undefined;
  }

  async createSeoSettings(settings: InsertSeoSettings): Promise<SeoSettings> {
    const [newSettings] = await db.insert(seoSettings).values(settings).returning();
    return newSettings;
  }

  async updateSeoSettings(id: number, settings: Partial<InsertSeoSettings>): Promise<SeoSettings> {
    const [updatedSettings] = await db
      .update(seoSettings)
      .set({ ...settings, updatedAt: new Date() })
      .where(eq(seoSettings.id, id))
      .returning();
    return updatedSettings;
  }

  // Admin stats
  async getAdminStats(): Promise<any> {
    const [pagesCount] = await db.select({ count: count() }).from(pages);
    const [postsCount] = await db.select({ count: count() }).from(blogPosts);
    const [inquiriesCount] = await db.select({ count: count() }).from(inquiries);
    const [publishedPagesCount] = await db.select({ count: count() }).from(pages)
      .where(eq(pages.isPublished, true));
    const [publishedPostsCount] = await db.select({ count: count() }).from(blogPosts)
      .where(eq(blogPosts.isPublished, true));

    return {
      totalPages: pagesCount.count,
      totalPosts: postsCount.count,
      totalInquiries: inquiriesCount.count,
      publishedPages: publishedPagesCount.count,
      publishedPosts: publishedPostsCount.count,
    };
  }

  // Sitemap generation
  async generateSitemap(): Promise<string> {
    const publishedPages = await this.getPublishedPages();
    const publishedPosts = await this.getPublishedBlogPosts(1, 1000);
    const baseUrl = process.env.BASE_URL || 'https://accordmanpower.com';

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;

    // Add pages
    for (const page of publishedPages) {
      sitemap += `
  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${page.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }

    // Add blog posts
    for (const post of publishedPosts) {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
    }

    sitemap += `
</urlset>`;

    return sitemap;
  }
}

export const storage = new DatabaseStorage();
