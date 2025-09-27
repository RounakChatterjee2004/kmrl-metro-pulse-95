import { Document } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';

interface ComplianceDashboardProps {
  document: Document;
  view: 'summary' | 'graphs' | 'kpis';
}

const departmentRiskData = [
  { department: 'Engineering', low: 5, medium: 8, high: 2, critical: 1 },
  { department: 'Finance', low: 8, medium: 4, high: 1, critical: 0 },
  { department: 'Operations', low: 6, medium: 6, high: 3, critical: 2 },
  { department: 'Safety', low: 3, medium: 5, high: 4, critical: 1 },
  { department: 'HR', low: 7, medium: 3, high: 1, critical: 0 }
];

const observationStatusData = [
  { month: 'Jan', pending: 12, resolved: 8 },
  { month: 'Feb', pending: 15, resolved: 12 },
  { month: 'Mar', pending: 10, resolved: 18 },
  { month: 'Apr', pending: 8, resolved: 15 },
  { month: 'May', pending: 6, resolved: 20 },
  { month: 'Jun', pending: 5, resolved: 22 }
];

const riskHeatmapData = [
  { risk: 'Data Security', severity: 'High', department: 'Engineering', days: 45 },
  { risk: 'Financial Controls', severity: 'Medium', department: 'Finance', days: 30 },
  { risk: 'Safety Protocols', severity: 'Critical', department: 'Safety', days: 60 },
  { risk: 'HR Compliance', severity: 'Low', department: 'HR', days: 15 },
  { risk: 'Operational Risk', severity: 'High', department: 'Operations', days: 35 }
];

const chartConfig = {
  pending: {
    label: "Pending",
    color: "hsl(var(--warning))",
  },
  resolved: {
    label: "Resolved",
    color: "hsl(var(--success))",
  },
  low: {
    label: "Low Risk",
    color: "hsl(var(--success))",
  },
  medium: {
    label: "Medium Risk", 
    color: "hsl(var(--warning))",
  },
  high: {
    label: "High Risk",
    color: "hsl(var(--destructive))",
  },
  critical: {
    label: "Critical Risk",
    color: "hsl(var(--destructive))",
  }
};

export function ComplianceDashboard({ view }: ComplianceDashboardProps) {
  if (view === 'kpis') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold text-primary">47</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-warning">12 pending</span>
                <span className="text-muted-foreground ml-1">resolution</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-success">27</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-success">57%</span>
                <span className="text-muted-foreground ml-1">completion rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                  <p className="text-2xl font-bold text-destructive">4</p>
                </div>
                <Shield className="h-8 w-8 text-destructive" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-destructive">2 overdue</span>
                <span className="text-muted-foreground ml-1">action needed</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
                  <p className="text-2xl font-bold text-warning">28</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-muted-foreground">days average</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Heatmap */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Risk Severity Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskHeatmapData.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{risk.risk}</p>
                    <p className="text-sm text-muted-foreground">{risk.department}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      risk.severity === 'Critical' ? 'destructive' :
                      risk.severity === 'High' ? 'destructive' :
                      risk.severity === 'Medium' ? 'secondary' : 'outline'
                    }>
                      {risk.severity}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{risk.days} days</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === 'graphs') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk by Department */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Risk Severity by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentRiskData}>
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="low" stackId="risk" fill="hsl(var(--success))" />
                  <Bar dataKey="medium" stackId="risk" fill="hsl(var(--warning))" />
                  <Bar dataKey="high" stackId="risk" fill="hsl(var(--destructive))" />
                  <Bar dataKey="critical" stackId="risk" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Observation Trends */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Pending vs Resolved Observations</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={observationStatusData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="pending" fill="hsl(var(--warning))" />
                  <Bar dataKey="resolved" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Summary view
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Compliance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Total Observations</span>
              <span className="font-semibold">47</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Resolved</span>
              <span className="font-semibold text-success">27 (57%)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Critical Issues</span>
              <span className="font-semibold text-destructive">4</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Avg Resolution Time</span>
              <span className="font-semibold text-warning">28 days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Department Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {departmentRiskData.slice(0, 4).map((dept, index) => {
              const total = dept.low + dept.medium + dept.high + dept.critical;
              const criticalPercent = (dept.critical / total * 100).toFixed(0);
              return (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span className="text-sm font-medium">{dept.department}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{total} issues</span>
                    {dept.critical > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {dept.critical} critical
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}