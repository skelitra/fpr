
import { toast } from "@/components/ui/use-toast";

interface ReviewData {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  isFake: boolean;
  score: number;
}

interface AnalysisResult {
  productName: string;
  overallRating: number;
  isFake: boolean;
  confidenceScore: number;
  reviews: ReviewData[];
  priceAnalysis: {
    actual: number;
    expected: number;
    deviation: number;
  };
  detailsAnalysis: {
    accurate: boolean;
    inconsistencies: string[];
  };
}

// Store the backend URL
let BACKEND_URL = '';

export const api = {
  /**
   * Sets the backend URL for API calls
   */
  setBackendUrl: (url: string) => {
    BACKEND_URL = url;
    localStorage.setItem('backendUrl', url);
    console.log("Backend URL set to:", url);
    return true;
  },

  /**
   * Gets the currently set backend URL
   */
  getBackendUrl: () => {
    if (!BACKEND_URL) {
      BACKEND_URL = localStorage.getItem('backendUrl') || '';
    }
    return BACKEND_URL;
  },

  /**
   * This function makes a request to the backend to analyze a product URL.
   */
  analyzeProduct: async (url: string): Promise<{ success: boolean; data?: AnalysisResult; error?: string }> => {
    try {
      const backendUrl = api.getBackendUrl();
      
      if (!backendUrl) {
        return { 
          success: false, 
          error: "Backend URL not configured. Please connect to Google Colab first." 
        };
      }

      console.log("Analyzing product at URL:", url);
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // If the backend returns mock data for now, that's fine
      return { success: true, data: data };
    } catch (error) {
      console.error("Error analyzing product:", error);
      return { 
        success: false, 
        error: "Failed to connect to analysis service. Please check your backend connection." 
      };
    }
  },
  
  /**
   * This function attempts to connect to the Google Colab backend
   */
  connectToColabBackend: async (url?: string) => {
    try {
      // If URL is provided, save it
      if (url) {
        api.setBackendUrl(url);
      }
      
      // Use stored URL or fallback to empty
      const backendUrl = api.getBackendUrl();
      
      if (!backendUrl) {
        toast({
          title: "Backend URL Missing",
          description: "Please provide a Google Colab URL to connect to the backend.",
          variant: "destructive",
        });
        return false;
      }

      console.log("Attempting to connect to Colab backend...");
      
      // Test the connection with a simple request
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ping' })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      toast({
        title: "Backend Connected",
        description: "Successfully connected to Google Colab backend.",
      });
      
      return true;
    } catch (error) {
      console.error("Failed to connect to Colab backend:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to Google Colab backend. Check your URL and make sure your Colab is running.",
        variant: "destructive",
      });
      return false;
    }
  }
};
