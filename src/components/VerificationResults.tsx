
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarRating } from "./StarRating";
import { Progress } from "@/components/ui/progress";
import { Icons } from "./Icons";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  BarChart4,
  MessageSquare,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface VerificationResultsProps {
  results: AnalysisResult;
}

export function VerificationResults({ results }: VerificationResultsProps) {
  // Calculate percentages for the overview
  const genuineReviews = results.reviews.filter((r) => !r.isFake).length;
  const genuinePercentage = Math.round(
    (genuineReviews / results.reviews.length) * 100
  );
  const fakePercentage = 100 - genuinePercentage;

  const positiveReviews = results.reviews.filter(
    (r) => r.sentiment === "positive"
  ).length;
  const positivePercentage = Math.round(
    (positiveReviews / results.reviews.length) * 100
  );

  const negativeReviews = results.reviews.filter(
    (r) => r.sentiment === "negative"
  ).length;
  const negativePercentage = Math.round(
    (negativeReviews / results.reviews.length) * 100
  );

  const neutralPercentage = 100 - positivePercentage - negativePercentage;

  return (
    <div className="space-y-8">
      {/* Overall Verdict Card */}
      <Card className="overflow-hidden border-t-4 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{results.productName}</h2>
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={results.overallRating} size={18} />
                <span className="text-sm text-muted-foreground">
                  ({results.overallRating.toFixed(1)})
                </span>
              </div>

              <div
                className={cn(
                  "flex items-center gap-2 text-lg font-medium",
                  results.isFake
                    ? "text-destructive"
                    : "text-green-600 dark:text-green-500"
                )}
              >
                {results.isFake ? (
                  <>
                    <Icons.fake className="h-5 w-5" />
                    <span>Likely Counterfeit Product</span>
                  </>
                ) : (
                  <>
                    <Icons.genuine className="h-5 w-5" />
                    <span>Likely Genuine Product</span>
                  </>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Confidence score: {results.confidenceScore}%
              </p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 flex flex-col space-y-4 lg:w-64">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Genuine Reviews</span>
                  <span>{genuinePercentage}%</span>
                </div>
                <Progress
                  value={genuinePercentage}
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Positive Sentiment</span>
                  <span>{positivePercentage}%</span>
                </div>
                <Progress
                  value={positivePercentage}
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Price Accuracy</span>
                  <span>
                    {results.priceAnalysis.deviation > 0
                      ? `+${Math.abs(results.priceAnalysis.deviation).toFixed(1)}%`
                      : `-${Math.abs(results.priceAnalysis.deviation).toFixed(1)}%`}
                  </span>
                </div>
                <Progress
                  value={
                    results.priceAnalysis.deviation > 0
                      ? 100 - Math.min(Math.abs(results.priceAnalysis.deviation), 50) * 2
                      : 100
                  }
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center gap-2">
            <BarChart4 className="w-4 h-4" />
            <span>Sentiment</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>Details</span>
          </TabsTrigger>
        </TabsList>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-4 space-y-4">
          {results.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </TabsContent>

        {/* Sentiment Analysis Tab */}
        <TabsContent value="sentiment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Positive</span>
                    <span>{positivePercentage}%</span>
                  </div>
                  <Progress
                    value={positivePercentage}
                    className="h-3 bg-gray-200 dark:bg-gray-700"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Neutral</span>
                    <span>{neutralPercentage}%</span>
                  </div>
                  <Progress
                    value={neutralPercentage}
                    className="h-3 bg-gray-200 dark:bg-gray-700"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Negative</span>
                    <span>{negativePercentage}%</span>
                  </div>
                  <Progress
                    value={negativePercentage}
                    className="h-3 bg-gray-200 dark:bg-gray-700"
                  />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Fake vs. Genuine Distribution</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Genuine Reviews</span>
                      <span>{genuinePercentage}%</span>
                    </div>
                    <Progress
                      value={genuinePercentage}
                      className="h-3 bg-gray-200 dark:bg-gray-700"
                    />
                  </div>
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Fake Reviews</span>
                      <span>{fakePercentage}%</span>
                    </div>
                    <Progress
                      value={fakePercentage}
                      className="h-3 bg-gray-200 dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Details Tab */}
        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Details Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Analysis</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Listed Price</p>
                      <p className="text-lg font-semibold">${results.priceAnalysis.actual}</p>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Expected Price</p>
                      <p className="text-lg font-semibold">${results.priceAnalysis.expected}</p>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Deviation</p>
                      <p className={cn(
                        "text-lg font-semibold",
                        results.priceAnalysis.deviation < -20 || results.priceAnalysis.deviation > 20
                          ? "text-destructive"
                          : "text-green-600 dark:text-green-500"
                      )}>
                        {results.priceAnalysis.deviation > 0 ? "+" : ""}
                        {results.priceAnalysis.deviation.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Product Claims Verification</h4>
                    {results.detailsAnalysis.accurate ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span>All product claims appear accurate</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 mb-2">
                          <AlertTriangle className="h-5 w-5" />
                          <span>Some product claims may be inaccurate</span>
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground ml-4">
                          {results.detailsAnalysis.inconsistencies.map((inconsistency, i) => (
                            <li key={i}>{inconsistency}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ReviewCardProps {
  review: ReviewData;
  index: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  const sentimentColor = {
    positive: "text-green-600 dark:text-green-500",
    negative: "text-red-600 dark:text-red-500",
    neutral: "text-blue-600 dark:text-blue-500",
  };

  const sentimentIcon = {
    positive: <CheckCircle className="h-4 w-4" />,
    negative: <AlertCircle className="h-4 w-4" />,
    neutral: <Info className="h-4 w-4" />,
  };

  const sentimentText = {
    positive: "Positive",
    negative: "Negative",
    neutral: "Neutral",
  };

  const [expanded, setExpanded] = useState(false);
  const isLongReview = review.text.length > 150;
  const displayText = expanded || !isLongReview 
    ? review.text 
    : `${review.text.substring(0, 150)}...`;

  return (
    <Card 
      className={cn(
        "shadow transition-all hover:shadow-md",
        review.isFake && "border-l-4 border-l-amber-500"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <StarRating rating={review.score} size={14} />
            <span className="text-sm text-muted-foreground">
              ({review.score.toFixed(1)})
            </span>
          </div>
          <div className="flex gap-2">
            {review.isFake && (
              <Badge variant="outline" className="border-amber-500 text-amber-600 dark:text-amber-500">
                Potential Fake
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className={cn(
                "flex items-center gap-1", 
                sentimentColor[review.sentiment]
              )}
            >
              {sentimentIcon[review.sentiment]}
              <span>{sentimentText[review.sentiment]}</span>
            </Badge>
          </div>
        </div>
        
        <p className="text-sm">{displayText}</p>
        
        {isLongReview && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary hover:underline mt-2"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </CardContent>
    </Card>
  );
};
