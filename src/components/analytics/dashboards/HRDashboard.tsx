import { Document } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Users, TrendingUp, UserCheck, Target } from 'lucide-react';

interface HRDashboardProps {
  document: Document;
  view: 'summary' | 'graphs' | 'kpis';
}

const headcountData = [
  { month: 'Jan', headcount: 245, new: 12, left: 8 },
  { month: 'Feb', headcount: 249, new: 15, left: 11 },
  { month: 'Mar', headcount: 253, new: 18, left: 14 },
  { month: 'Apr', headcount: 257, new: 16, left: 12 },
  { month: 'May', headcount: 261, new: 20, left: 16 },
  { month: 'Jun', headcount: 265, new: 22, left: 18 }
];

const diversityData = [
  { name: 'Male', value: 62, color: 'hsl(var(--primary))' },
  { name: 'Female', value: 38, color: 'hsl(var(--secondary))' }
];

const departmentBreakdownData = [
  { department: 'Engineering', count: 85, satisfaction: 82 },
  { department: 'Operations', count: 72, satisfaction: 88 },
  { department: 'Finance', count: 28, satisfaction: 91 },
  { department: 'HR', count: 18, satisfaction: 85 },
  { department: 'Safety', count: 32, satisfaction: 79 },
  { department: 'Legal', count: 15, satisfaction: 87 }
];

const satisfactionTrendData = [
  { month: 'Jan', satisfaction: 78 },
  { month: 'Feb', satisfaction: 81 },
  { month: 'Mar', satisfaction: 83 },
  { month: 'Apr', satisfaction: 85 },
  { month: 'May', satisfaction: 87 },
  { month: 'Jun', satisfaction: 85 }
];

const chartConfig = {
  headcount: {
    label: "Headcount",
    color: "hsl(var(--primary))",
  },
  satisfaction: {
    label: "Satisfaction",
    color: "hsl(var(--accent))",
  },
  new: {
    label: "New Hires",
    color: "hsl(var(--success))",
  },
  left: {
    label: "Departures",
    color: "hsl(var(--destructive))",
  }
};

export function HRDashboard({ view }: HRDashboardProps) {
  if (view === 'kpis') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <p className="text-2xl font-bold text-primary">265</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="text-success">+8.2%</span>
                <span className="text-muted-foreground ml-1">vs last year</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                  <p className="text-2xl font-bold text-success">94%</p>
                </div>
                <UserCheck className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-success">Above target</span>
                <span className="text-muted-foreground ml-1">of 90%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                  <p className="text-2xl font-bold text-accent">85%</p>
                </div>
                <Target className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="text-success">+15%</span>
                <span className="text-muted-foreground ml-1">improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Hires</p>
                  <p className="text-2xl font-bold text-secondary">22</p>
                </div>
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-muted-foreground">this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Breakdown */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Department Headcount & Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentBreakdownData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{dept.department}</p>
                    <p className="text-sm text-muted-foreground">{dept.count} employees</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{dept.satisfaction}%</p>
                      <p className="text-xs text-muted-foreground">satisfaction</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      dept.satisfaction >= 85 ? 'bg-success' :
                      dept.satisfaction >= 80 ? 'bg-warning' : 'bg-destructive'
                    }`} />
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
        {/* Headcount Growth */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Headcount Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={headcountData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="headcount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gender Diversity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Gender Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diversityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {diversityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Satisfaction Trend */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Employee Satisfaction Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={satisfactionTrendData}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 90]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="satisfaction" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hiring vs Departures */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Monthly Hiring vs Departures</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={headcountData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="new" fill="hsl(var(--success))" />
                  <Bar dataKey="left" fill="hsl(var(--destructive))" />
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
          <CardTitle>Workforce Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Current Headcount</span>
              <span className="font-semibold">265</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Growth Rate</span>
              <span className="font-semibold text-success">+8.2%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Retention Rate</span>
              <span className="font-semibold text-success">94%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Satisfaction</span>
              <span className="font-semibold text-accent">85%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {departmentBreakdownData.slice(0, 4).map((dept, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <span className="text-sm font-medium">{dept.department}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{dept.count}</span>
                  <Badge variant={
                    dept.satisfaction >= 85 ? 'default' :
                    dept.satisfaction >= 80 ? 'secondary' : 'destructive'
                  } className="text-xs">
                    {dept.satisfaction}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}