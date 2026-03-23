import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import FloatingMenu from "@/components/FloatingMenu";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Support from "./pages/Support";
import Auth from "./pages/Auth";
import Demo from "./pages/Demo";
// import Blog from "./pages/Blog";
import Partnerships from "./pages/Partnerships";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Hackathon from "./pages/Hackathon";
import HackathonRegister from "./pages/HackathonRegister";
import HackathonSignin from "./pages/HackathonSignin";
import HackathonRound1 from "./pages/HackathonRound1";
import NotFound from "./pages/NotFound";
import ComingSoon from "@/pages/ComingSoon";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isSignedIn = localStorage.getItem('hackathon_signed_in') === 'true';

  if (!isSignedIn) {
    return <Navigate to="/hackathon/auth" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  useEffect(() => {
    // Initialize analytics
    // analytics.init();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <FloatingMenu />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/support" element={<Support />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/demo" element={<Demo />} />
              {/* <Route path="/blog" element={<Blog />} /> */}
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/hackathon" element={<Hackathon />} />
              <Route path="/hackathon/register" element={<HackathonRegister />} />
              <Route path="/hackathon/auth" element={<HackathonSignin />} />
              <Route path="/hackathon/round1" element={<ProtectedRoute><HackathonRound1 /></ProtectedRoute>} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
