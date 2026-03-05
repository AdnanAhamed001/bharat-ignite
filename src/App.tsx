import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import {
  ProgramPage,
  InvestorHubPage,
  PortfolioPage,
  ResourcesPage,
  AboutPage,
  PeoplePage,
  BlogPage,
  ContactPage,
  FAQPage,
  DisclaimerPage,
  PrivacyPolicyPage,
} from "./pages/PlaceholderPages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/investor-hub" element={<InvestorHubPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/tools" element={<ResourcesPage />} />
          <Route path="/resources/assessments" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
