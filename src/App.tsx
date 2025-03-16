
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import { api } from "./services/api";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Attempt to connect to the Colab backend when the app starts
    const connectBackend = async () => {
      try {
        const savedUrl = localStorage.getItem('backendUrl');
        if (savedUrl) {
          await api.connectToColabBackend(savedUrl);
        }
      } catch (error) {
        console.error("Failed to initialize backend connection:", error);
      }
    };
    
    connectBackend();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
