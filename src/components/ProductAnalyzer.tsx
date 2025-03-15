
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "./Icons";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { VerificationResults } from "./VerificationResults";
import { useToast } from "@/components/ui/use-toast";

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

export function ProductAnalyzer() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "The product URL is required to perform the analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    try {
      // In a real implementation, this would call the backend API
      // Simulating a backend call with a timeout
      setTimeout(() => {
        console.log("Analyzing product at URL:", url);
        
        // Mock data for demonstration
        const mockResult: AnalysisResult = {
          productName: "Premium Wireless Headphones",
          overallRating: 3.7,
          isFake: Math.random() > 0.5, // Randomly choosing for demo
          confidenceScore: 87,
          priceAnalysis: {
            actual: 129.99,
            expected: 149.99,
            deviation: -13.3,
          },
          detailsAnalysis: {
            accurate: true,
            inconsistencies: [],
          },
          reviews: [
            {
              text: "These headphones have amazing sound quality and battery life. Definitely worth the price!",
              sentiment: "positive",
              isFake: false,
              score: 4.8,
            },
            {
              text: "The product looks good but the sound quality isn't as advertised. Somewhat disappointed.",
              sentiment: "negative",
              isFake: false,
              score: 2.5,
            },
            {
              text: "BEST HEADPHONES EVER!!! SO AMAZING I CANNOT BELIEVE HOW PERFECT THEY ARE!!",
              sentiment: "positive",
              isFake: true,
              score: 5.0,
            },
            {
              text: "Decent product, comfortable to wear for long periods. Battery life is average.",
              sentiment: "neutral",
              isFake: false,
              score: 3.5,
            },
            {
              text: "Terrible quality. Broke after 2 days. Do not buy this garbage!!!",
              sentiment: "negative",
              isFake: true,
              score: 1.0,
            },
          ],
        };
        
        setResults(mockResult);
        setIsAnalyzing(false);
        
        toast({
          title: "Analysis Complete",
          description: `We've analyzed ${mockResult.reviews.length} reviews for this product.`,
        });
      }, 3000);
    } catch (error) {
      console.error("Error analyzing product:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing this product. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg border-t border-t-primary/10 overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-2xl font-medium mb-2">Product Verification</h2>
          <p className="text-muted-foreground mb-6">
            Enter a product URL to analyze its authenticity based on reviews and listing details
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-stretch gap-2">
              <div className="relative flex-1">
                <Input
                  type="url"
                  placeholder="https://www.example.com/product/123"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 h-12"
                  disabled={isAnalyzing}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button 
                type="submit" 
                disabled={isAnalyzing}
                className="h-12 px-6"
              >
                {isAnalyzing ? (
                  <>
                    <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  "Verify Product"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {isAnalyzing && (
        <div className="mt-10 text-center animate-pulse">
          <Icons.loading className="mx-auto h-12 w-12 animate-spin text-primary/70" />
          <p className="mt-4 text-muted-foreground">
            Analyzing product and reviews...
          </p>
          <div className="mt-2 text-xs text-muted-foreground">
            This may take a moment
          </div>
        </div>
      )}
      
      {results && !isAnalyzing && (
        <div className="mt-10 animate-slide-up">
          <VerificationResults results={results} />
        </div>
      )}
    </div>
  );
}
