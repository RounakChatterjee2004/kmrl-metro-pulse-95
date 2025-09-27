import { Document } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface AIInsightsPanelProps {
  document: Document;
}

export function AIInsightsPanel({ document }: AIInsightsPanelProps) {
  const getInsights = () => {
    if (document.title.toLowerCase().includes('financial')) {
      return {
        summary: "Revenue growth trending upward with 15% increase YoY. Operational expenses are well-controlled.",
        trends: ["Revenue ↗ +15%", "Profit Margin ↗ +3.2%", "Cash Flow ↗ +8%"],
        alerts: ["Infrastructure costs increased 12%"],
        recommendations: ["Consider optimizing infrastructure spending", "Explore additional revenue streams"]
      };
    }
    
    if (document.title.toLowerCase().includes('auction')) {
      return {
        summary: "Property auction showing strong market demand. Asset conditions vary significantly.",
        trends: ["Bid Participation ↗ +25%", "Average Bid ↗ +18%", "Success Rate → 78%"],
        alerts: ["3 properties require urgent maintenance"],
        recommendations: ["Prioritize property maintenance", "Consider reserve price adjustments"]
      };
    }
    
    if (document.title.toLowerCase().includes('compliance')) {
      return {
        summary: "Compliance posture improving with 58% of observations resolved. Focus needed on critical issues.",
        trends: ["Resolution Rate ↗ +12%", "Critical Issues ↘ -15%", "Response Time ↗ +20%"],
        alerts: ["2 critical issues pending for >30 days"],
        recommendations: ["Fast-track critical issue resolution", "Implement preventive measures"]
      };
    }
    
    return {
      summary: "Employee satisfaction and productivity metrics showing positive trends across departments.",
      trends: ["Headcount ↗ +8%", "Satisfaction ↗ +15%", "Retention → 94%"],
      alerts: ["Engineering department showing higher turnover"],
      recommendations: ["Review engineering compensation packages", "Implement retention programs"]
    };
  };

  const insights = getInsights();

  return (
    <Card className="shadow-medium border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights & Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="p-4 bg-primary-light/30 rounded-lg">
          <p className="text-sm text-foreground">{insights.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trends */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Key Trends
            </h4>
            <div className="space-y-1">
              {insights.trends.map((trend, index) => (
                <Badge key={index} variant="outline" className="text-xs block w-fit">
                  {trend}
                </Badge>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Alerts
            </h4>
            <div className="space-y-1">
              {insights.alerts.map((alert, index) => (
                <div key={index} className="text-xs text-warning bg-warning-light/20 p-2 rounded">
                  {alert}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Recommendations
            </h4>
            <div className="space-y-1">
              {insights.recommendations.map((rec, index) => (
                <div key={index} className="text-xs text-success bg-success-light/20 p-2 rounded">
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}