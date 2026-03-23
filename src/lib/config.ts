/// <reference path="../declarations.d.ts" />

// Environment configuration
const getEnv = () => {
  try {
    return (import.meta as Record<string, any>).env;
  } catch {
    return {};
  }
};

const env = getEnv();

export const config = {
  // API Endpoints
  api: {
    baseUrl: env.VITE_API_BASE_URL || "http://localhost:3000",
    formspreeId: env.VITE_FORMSPREE_ID || "YOUR_FORMSPREE_ID",
  },

  // Feature Flags
  features: {
    analytics: env.VITE_ANALYTICS_ENABLED !== "false",
    newsletter: env.VITE_NEWSLETTER_ENABLED !== "false",
    demo: env.VITE_DEMO_ENABLED !== "false",
  },

  // App settings
  app: {
    environment: (env.MODE || "production") as "development" | "production",
    isDevelopment: env.DEV ?? false,
    isProduction: env.PROD ?? true,
  },

  // Analytics
  analytics: {
    trackingId: env.VITE_ANALYTICS_ID,
    sendBeaconUrl: env.VITE_ANALYTICS_ENDPOINT,
  },
};

// Validate required config on startup
export function validateConfig() {
  if (config.features.newsletter && !config.api.formspreeId) {
    console.warn(
      "Newsletter feature enabled but VITE_FORMSPREE_ID not configured"
    );
  }

  if (config.app.isProduction) {
    // Add production checks
  }
}
