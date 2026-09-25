import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const CaseStudy1 = lazy(() => import("./pages/CaseStudy1"));
const CaseStudy2 = lazy(() => import("./pages/CaseStudy2"));
const CaseStudy3 = lazy(() => import("./pages/CaseStudy3"));
const CaseStudy4 = lazy(() => import("./pages/CaseStudy4"));
const CaseStudy4Editor = import.meta.env.DEV
  ? lazy(() => import("./pages/CaseStudy4Editor"))
  : null;
const DesignSystem = lazy(() => import("./pages/DesignSystem"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-surface-primary flex items-center justify-center">
    <p className="text-text-secondary">Loading...</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/case-study-1" element={<CaseStudy1 />} />
            <Route path="/case-study-2" element={<CaseStudy2 />} />
            <Route path="/case-study-3" element={<CaseStudy3 />} />
            <Route path="/case-study-4" element={<CaseStudy4 />} />
            {CaseStudy4Editor && (
              <Route path="/:caseStudySlug/edit" element={<CaseStudy4Editor />} />
            )}
            <Route path="/ds" element={<DesignSystem />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
