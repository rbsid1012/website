import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // your custom sidebar
import Footer from "./components/Footer";

import Index from "./pages/Index";
import Product from "./pages/Product";
import HowItWorks from "./pages/HowItWorks";
import JoinWaitlist from "./pages/JoinWaitlist";
import CreatorAccess from "./pages/CreatorAccess";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-row-reverse"> {/* sidebar on right */}
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
