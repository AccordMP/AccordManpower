import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertUserSchema, insertPageSchema, insertBlogPostSchema, insertSeoSettingsSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware for authentication
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Public API routes
  
  // Submit inquiry form
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.json({ success: true, inquiry });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get published pages
  app.get("/api/pages", async (req, res) => {
    try {
      const pages = await storage.getPublishedPages();
      res.json(pages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single published page by slug
  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.getPageBySlug(req.params.slug);
      if (!page || !page.isPublished) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const posts = await storage.getPublishedBlogPosts(page, limit, category);
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single published blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || !post.isPublished) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get SEO settings
  app.get("/api/seo/:pageType", async (req, res) => {
    try {
      const settings = await storage.getSeoSettings(req.params.pageType);
      res.json(settings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          role: user.role 
        } 
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          role: user.role 
        } 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Protected admin routes
  app.use("/api/admin", authenticateToken);

  // Admin dashboard stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin pages management
  app.get("/api/admin/pages", async (req, res) => {
    try {
      const pages = await storage.getAllPages();
      res.json(pages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/pages/:id", async (req, res) => {
    try {
      const page = await storage.getPageById(parseInt(req.params.id));
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/pages", async (req, res) => {
    try {
      const validatedData = insertPageSchema.parse(req.body);
      const page = await storage.createPage({
        ...validatedData,
        authorId: req.user.id,
      });
      res.json(page);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/admin/pages/:id", async (req, res) => {
    try {
      const validatedData = insertPageSchema.parse(req.body);
      const page = await storage.updatePage(parseInt(req.params.id), validatedData);
      res.json(page);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/admin/pages/:id", async (req, res) => {
    try {
      await storage.deletePage(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin blog posts management
  app.get("/api/admin/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPostById(parseInt(req.params.id));
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost({
        ...validatedData,
        authorId: req.user.id,
      });
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/admin/blog/:id", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(parseInt(req.params.id), validatedData);
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/admin/blog/:id", async (req, res) => {
    try {
      await storage.deleteBlogPost(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin inquiries management
  app.get("/api/admin/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/admin/inquiries/:id", async (req, res) => {
    try {
      const { status } = req.body;
      const inquiry = await storage.updateInquiryStatus(parseInt(req.params.id), status);
      res.json(inquiry);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Admin SEO management
  app.get("/api/admin/seo", async (req, res) => {
    try {
      const settings = await storage.getAllSeoSettings();
      res.json(settings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/seo", async (req, res) => {
    try {
      const validatedData = insertSeoSettingsSchema.parse(req.body);
      const settings = await storage.createSeoSettings(validatedData);
      res.json(settings);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/admin/seo/:id", async (req, res) => {
    try {
      const validatedData = insertSeoSettingsSchema.parse(req.body);
      const settings = await storage.updateSeoSettings(parseInt(req.params.id), validatedData);
      res.json(settings);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Generate sitemap
  app.get("/api/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await storage.generateSitemap();
      res.set('Content-Type', 'text/xml');
      res.send(sitemap);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
