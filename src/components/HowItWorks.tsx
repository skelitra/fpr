
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Zap, ShieldCheck, BarChart } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Paste URL",
      description: "Enter the product URL from any major e-commerce website",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Smart Analysis",
      description: "Our AI analyzes product details and reviews with advanced NLP",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Sentiment Mining",
      description: "Extract genuine sentiments from authentic reviews",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Verification Result",
      description: "Get a comprehensive authenticity report with confidence score",
    },
  ];

  return (
    <div className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
        <p className="text-muted-foreground mt-4">
          Our platform uses advanced algorithms to detect fraudulent products through 
          sentiment analysis and opinion mining techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="border-t-2 border-t-primary/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
              <div className="p-2 w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
