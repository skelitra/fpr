
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Verify</h1>
            <p className="text-xl text-muted-foreground">
              Our mission and technology behind fake product detection
            </p>
          </div>
          
          <Card className="mb-12 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p>
                  At Verify, we're dedicated to protecting consumers from counterfeit products. Our platform uses 
                  advanced artificial intelligence to analyze product listings and reviews across e-commerce sites, 
                  helping you identify potentially fake or misleading products before you make a purchase.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4 mt-8">How It Works</h2>
                <p>
                  Our technology combines several sophisticated analysis techniques:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>
                    <strong>Sentiment Analysis:</strong> We analyze the emotional tone behind product reviews to 
                    identify patterns characteristic of fake or paid reviews.
                  </li>
                  <li>
                    <strong>Natural Language Processing:</strong> Our algorithms detect linguistic patterns that 
                    may indicate artificially generated reviews.
                  </li>
                  <li>
                    <strong>Opinion Mining:</strong> We extract and analyze opinions expressed in reviews to identify 
                    inconsistencies that could signal a counterfeit product.
                  </li>
                  <li>
                    <strong>Statistical Analysis:</strong> We compare ratings and review patterns against expected 
                    distributions to flag unusual activity.
                  </li>
                  <li>
                    <strong>Price Analysis:</strong> We compare product pricing to market standards to identify 
                    suspiciously low prices that may indicate counterfeits.
                  </li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-4 mt-8">Our Technology</h2>
                <p>
                  Built on cutting-edge machine learning models, our platform has been trained on millions of 
                  products and reviews to accurately identify patterns associated with counterfeit listings. 
                  The technology continues to learn and improve with each analysis.
                </p>
                
                <Separator className="my-8" />
                
                <blockquote className="border-l-4 border-primary pl-4 italic">
                  "In a world flooded with online products, knowing what's real and what's fake is harder than 
                  ever. We're building the tools to make online shopping safer for everyone."
                </blockquote>
                
                <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Us</h2>
                <p>
                  Have questions or feedback? We'd love to hear from you. Reach out to our team at 
                  <a href="mailto:info@verify.example.com" className="text-primary hover:underline mx-1">
                    info@verify.example.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
