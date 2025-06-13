import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEOHead({
  title = "Accord Manpower - Global Staffing Solutions",
  description = "Accord Manpower provides comprehensive staffing solutions including virtual staffing, temporary staffing, and direct hire services. Partner with us for reliable workforce management across the globe.",
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords,
  author,
  publishedTime,
  modifiedTime,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to set meta tag
    const setMetaTag = (name: string, content: string, attribute = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper function to set link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Basic meta tags
    setMetaTag("description", description);
    if (keywords) setMetaTag("keywords", keywords);
    if (author) setMetaTag("author", author);

    // Open Graph tags
    setMetaTag("og:title", ogTitle || title, "property");
    setMetaTag("og:description", ogDescription || description, "property");
    setMetaTag("og:type", ogType, "property");
    if (ogImage) setMetaTag("og:image", ogImage, "property");
    if (canonicalUrl) setMetaTag("og:url", canonicalUrl, "property");

    // Twitter Card tags
    setMetaTag("twitter:card", twitterCard);
    setMetaTag("twitter:title", ogTitle || title);
    setMetaTag("twitter:description", ogDescription || description);
    if (ogImage) setMetaTag("twitter:image", ogImage);

    // Article specific tags
    if (publishedTime) setMetaTag("article:published_time", publishedTime, "property");
    if (modifiedTime) setMetaTag("article:modified_time", modifiedTime, "property");

    // Canonical URL
    if (canonicalUrl) {
      setLinkTag("canonical", canonicalUrl);
    }

    // Schema.org structured data for Organization
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (!existingSchema) {
      const schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Accord Manpower",
        "description": "Comprehensive manpower outsourcing solutions tailored to meet the dynamic needs of businesses across the globe.",
        "url": window.location.origin,
        "logo": `${window.location.origin}/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-800-ACCORD",
          "contactType": "customer service",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://linkedin.com/company/accord-manpower",
          "https://twitter.com/accordmanpower",
          "https://facebook.com/accordmanpower"
        ]
      });
      document.head.appendChild(schemaScript);
    }
  }, [title, description, canonicalUrl, ogTitle, ogDescription, ogImage, ogType, twitterCard, keywords, author, publishedTime, modifiedTime]);

  return null;
}
