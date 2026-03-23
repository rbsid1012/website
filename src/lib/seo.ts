// SEO utility for dynamic meta tags and structured data

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
}

export const defaultSEO: SEOConfig = {
  title: "Cosmic Attire | Smart Ring NFC Payments & Safety",
  description: "A safety-first NFC smart ring for controlled payments, real-time SOS, and complete transaction history. Built for people who take consequences seriously.",
  image: "https://og-image.cosmic-attire.com/og-image.png",
  url: "https://cosmic-attire.com",
  type: "website",
};

export function setPageMeta(config: SEOConfig) {
  const { title, description, image, url, type, author } = config;

  // Update title
  document.title = title;

  // Update or create meta tags
  updateMetaTag("og:title", title);
  updateMetaTag("og:description", description);
  updateMetaTag("og:type", type || "website");
  if (image) updateMetaTag("og:image", image);
  if (url) updateMetaTag("og:url", url);

  updateMetaTag("twitter:title", title);
  updateMetaTag("twitter:description", description);
  updateMetaTag("twitter:card", "summary_large_image");
  if (image) updateMetaTag("twitter:image", image);

  updateMetaTag("description", description);
  if (author) updateMetaTag("author", author);
}

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[property="${name}"]`) || 
                document.querySelector(`meta[name="${name}"]`);
  
  if (!element) {
    element = document.createElement("meta");
    if (name.startsWith("og:") || name.startsWith("twitter:")) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function addJsonLD(data: any) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Organization schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cosmic Attire",
  url: "https://cosmic-attire.com",
  logo: "https://cosmic-attire.com/logo.png",
  description: "Safety-first NFC smart ring for controlled payments and real-time SOS",
  sameAs: [
    "https://twitter.com/cosmicattire",
    "https://linkedin.com/company/cosmic-attire",
  ],
};

// Product schema
export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Smart Ring",
  description: "NFC-enabled wearable for secure payments and emergency SOS",
  brand: {
    "@type": "Brand",
    name: "Cosmic Attire",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
  },
};
