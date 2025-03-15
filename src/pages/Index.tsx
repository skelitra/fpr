
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductAnalyzer } from "@/components/ProductAnalyzer";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { MoveDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 animate-fade-in">
                <span className="text-sm font-medium">AI-Powered Product Authentication</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-down">
                Detect Fake Products 
                <span className="block text-primary/90">with Sentiment Analysis</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up">
                Our platform analyzes product listings and reviews to determine authenticity,
                helping you make informed purchasing decisions.
              </p>
              
              <div className="flex flex-col items-center mt-16 animate-fade-in" style={{ animationDelay: "500ms" }}>
                <MoveDown className="h-8 w-8 text-primary/70 animate-bounce" />
                <span className="text-sm text-muted-foreground mt-2">Try it now</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Analyzer Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <ProductAnalyzer />
          </div>
        </section>
        
        {/* How It Works Section */}
        <HowItWorks />
        
        {/* Features Section */}
        <Features />
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to verify your next purchase?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Stop worrying about counterfeit products. Use our tool to verify authenticity before buying.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
            >
              Start Analyzing
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
