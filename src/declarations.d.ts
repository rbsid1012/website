// Module declarations for external packages
declare module "react" {
  export * from "react";
}

declare module "react/jsx-runtime" {
  export * from "react/jsx-runtime";
}

declare module "framer-motion" {
  export * from "framer-motion";
}

declare module "lucide-react" {
  export * from "lucide-react";
}

// Vite environment types
declare module "*.vite" {
  interface ImportMeta {
    env: {
      DEV: boolean;
      PROD: boolean;
      SSR: boolean;
      MODE: string;
      VITE_API_BASE_URL?: string;
      VITE_FORMSPREE_ID?: string;
      VITE_ANALYTICS_ENABLED?: string;
      VITE_NEWSLETTER_ENABLED?: string;
      VITE_DEMO_ENABLED?: string;
      VITE_ANALYTICS_ID?: string;
      VITE_ANALYTICS_ENDPOINT?: string;
    };
  }
}

// Global type augmentation
declare global {
  interface ImportMetaEnv {
    DEV: boolean;
    PROD: boolean;
    SSR: boolean;
    MODE: string;
    VITE_API_BASE_URL?: string;
    VITE_FORMSPREE_ID?: string;
    VITE_ANALYTICS_ENABLED?: string;
    VITE_NEWSLETTER_ENABLED?: string;
    VITE_DEMO_ENABLED?: string;
    VITE_ANALYTICS_ID?: string;
    VITE_ANALYTICS_ENDPOINT?: string;
  }

  interface ImportMeta {
    env: ImportMetaEnv;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }

  var process: {
    env: {
      NODE_ENV: "development" | "production";
    };
  };
}

export {};
