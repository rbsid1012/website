import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Index from "./pages/Index";
import Product from "./pages/Product";
import HowItWorks from "./pages/HowItWorks";
import JoinWaitlist from "./pages/JoinWaitlist";
import CreatorAccess from "./pages/CreatorAccess";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// 👇 Helper component: always scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <Helmet>
          <title>Cosmic Attire</title>
          <link rel="icon" type="image/png" href="/favicon-v3.png" />
          {/* Standard favicon */}
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-v3.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-v3.png"
          />

          {/* Apple touch icon (Safari, iOS, Mac) */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

          {/* Mask icon for Safari pinned tabs */}
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />

          {/* Web app manifest */}
          <link rel="manifest" href="/site.webmanifest" />

          {/* Theme color */}
          <meta name="theme-color" content="#ffffff" />
        </Helmet>

        <BrowserRouter>
          <ScrollToTop /> {/* 👈 ensures each page opens from top */}
          <div className="flex min-h-screen flex-row-reverse">
            {/* sidebar on right */}
            <Sidebar />
            <div className="flex-1 flex flex-col bg-background">
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/join-waitlist" element={<JoinWaitlist />} />
                  <Route path="/creator-access" element={<CreatorAccess />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
