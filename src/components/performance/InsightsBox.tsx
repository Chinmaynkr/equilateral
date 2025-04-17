
import React from "react";
import { Stock } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Clock, PieChart, BarChart } from "lucide-react";

interface InsightsBoxProps {
  stocks: Stock[];
}

const InsightsBox = ({ stocks }: InsightsBoxProps) => {
  // Get most traded stock (for now randomly select one of the top 3 by value)
  const topStocks = [...stocks].sort((a, b) => (b.ltp * b.quantity) - (a.ltp * a.quantity));
  const mostTraded = topStocks[Math.floor(Math.random() * Math.min(3, topStocks.length))];
  
  // For demo purposes, generate some insights
  const insights = [
    {
      icon: <Clock className="h-4 w-4 text-primary" />,
      title: "Average Holding Period",
      text: "Your average holding period is 4.7 months"
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-primary" />,
      title: "Most Traded Stock",
      text: `Your most actively traded stock is ${mostTraded.symbol}`
    },
    {
      icon: <BarChart className="h-4 w-4 text-primary" />,
      title: "Risk Assessment",
      text: "Your portfolio risk score is Moderate"
    },
    {
      icon: <PieChart className="h-4 w-4 text-primary" />,
      title: "Diversification",
      text: stocks.length > 6 ? 
        "Your portfolio is well-diversified" : 
        "Consider diversifying across more sectors"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
          Portfolio Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex">
            {/* Fixed icon container with proper spacing and sizing */}
            <div className="mr-3 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              {insight.icon}
            </div>
            <div>
              <p className="font-medium text-sm">{insight.title}</p>
              <p className="text-xs text-muted-foreground">{insight.text}</p>
            </div>
          </div>
        ))}
        
        <div className="text-xs text-muted-foreground pt-2 border-t">
          Insights based on your portfolio activity and market trends
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsBox;
