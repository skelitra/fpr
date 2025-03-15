
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Help = () => {
  // FAQ items
  const faqs = [
    {
      question: "How accurate is the product verification?",
      answer:
        "Our verification system typically achieves 85-90% accuracy, depending on the amount of review data available and the product category. The more reviews a product has, the more accurate our analysis becomes. We provide a confidence score with each result to indicate the reliability of our assessment.",
    },
    {
      question: "What websites are supported for product verification?",
      answer:
        "Currently, our system supports major e-commerce platforms including Amazon, eBay, Walmart, Shopify stores, and AliExpress. We're constantly working to add support for more platforms. If you have a specific platform you'd like to see supported, please contact us.",
    },
    {
      question: "How does the sentiment analysis work?",
      answer:
        "Our sentiment analysis uses natural language processing (NLP) to evaluate the emotional tone of reviews. It can identify positive, negative, and neutral sentiments, as well as detect overly exaggerated language that might indicate fake reviews. The system also considers review patterns, timing, and linguistic characteristics.",
    },
    {
      question: "What factors determine if a product is fake?",
      answer:
        "We consider multiple factors: unusual review patterns, linguistic analysis of reviews for authenticity, price comparison with market standards, product details consistency, seller reputation, and historical data from known counterfeit listings. No single factor determines the result; rather, it's a weighted combination of all these signals.",
    },
    {
      question: "Is my search data private?",
      answer:
        "Yes, we take privacy seriously. Your product verification requests are not associated with your personal information. We may use anonymized data to improve our algorithms, but individual search queries are not stored long-term or shared with third parties.",
    },
    {
      question: "How can I integrate this tool with my e-commerce business?",
      answer:
        "We offer API access for businesses that want to integrate our verification system into their platforms. This can help marketplaces verify sellers or assist retailers in vetting new products. Please contact our business development team for more information and pricing.",
    },
    {
      question: "What should I do if I find a counterfeit product?",
      answer:
        "If our system identifies a likely counterfeit product, we recommend: 1) Not purchasing the product, 2) Reporting the listing to the marketplace, 3) Looking for verified sellers or official brand stores, and 4) Checking the manufacturer's website for authorized retailers.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our product verification tool
            </p>
          </div>

          {/* Search Box */}
          <Card className="mb-10 shadow-md">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for help topics..."
                  className="pl-10 h-12"
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="mb-12 shadow-md">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Our support team is ready to help with any questions you might
                  have about using our product verification tool.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button className="flex-1">Contact Support</Button>
                  <Button variant="outline" className="flex-1">
                    View Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
