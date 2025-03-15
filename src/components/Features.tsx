
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  ShieldAlert, 
  BarChart3, 
  Star, 
  SearchCode,
  Database
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "AI-Powered Detection",
      description: "Utilizes state-of-the-art machine learning algorithms to identify patterns in fake product listings."
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Sentiment Analysis",
      description: "Analyzes the emotional tone behind reviews to identify suspicious patterns."
    },
    {
      icon: <ShieldAlert className="h-10 w-10" />,
      title: "Fake Review Detection",
      description: "Identifies artificially generated or paid reviews using natural language processing."
    },
    {
      icon: <Star className="h-10 w-10" />,
      title: "Rating Verification",
      description: "Compares product ratings across multiple platforms to determine authenticity."
    },
    {
      icon: <SearchCode className="h-10 w-10" />,
      title: "Price Analysis",
      description: "Compares pricing to market standards to identify suspicious deals that are too good to be true."
    },
    {
      icon: <Database className="h-10 w-10" />,
      title: "Comprehensive Reports",
      description: "Provides detailed analysis breakdown with confidence scores and specific red flags."
    },
  ];

  return (
    <div className="py-16 bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Advanced Analysis Features
          </h2>
          <p className="text-muted-foreground">
            Our platform combines multiple verification techniques to provide the most accurate 
            product authenticity assessment possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border transition-all duration-300 hover:shadow-lg"
              style={{ 
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardHeader>
                <div className="text-primary/80 mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
