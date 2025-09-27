import { Document } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

interface FinancialDashboardProps {
  document: Document;
  view: 'summary' | 'graphs' | 'kpis';
}

const revenueExpenseData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 35000 },
  { month: 'Mar', revenue: 48000, expenses: 33000 },
  { month: 'Apr', revenue: 58000, expenses: 37000 },
  { month: 'May', revenue: 62000, expenses: 39000 },
  { month: 'Jun', revenue: 67000, expenses: 41000 }
];

const growthData = [
  { month: 'Jan', growth: 12 },
  { month: 'Feb', growth: 18 },
  { month: 'Mar', growth: 15 },
  { month: 'Apr', growth: 22 },
  { month: 'May', growth: 28 },
  { month: 'Jun', growth: 35 }
];

const expenseBreakdown = [
  { name: 'Salaries', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Infrastructure', value: 25, color: 'hsl(var(--secondary))' },
  { name: 'Operations', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Miscellaneous', value: 10, color: 'hsl(var(--muted-foreground))' }
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Expenses", 
    color: "hsl(var(--secondary))",
  },
  growth: {
    label: "Growth %",
    color: "hsl(var(--accent))",
  }
};

export function FinancialDashboard({ view }: FinancialDashboardProps) {
  if (view === 'kpis') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-primary">₹3.32L</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-success">+15.2%</span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-secondary">₹2.17L</p>
              </div>
              <Target className="h-8 w-8 text-secondary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-warning mr-1" />
              <span className="text-warning">+8.1%</span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold text-accent">34.6%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-success">+3.2%</span>
              <span className="text-muted-foreground ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cash Flow</p>
                <p className="text-2xl font-bold text-success">₹1.15L</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-success">+12.8%</span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === 'graphs') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueExpenseData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                  <Bar dataKey="expenses" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Growth Trend */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Cumulative Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle>Expense Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
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
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">Current Revenue</span>
            <span className="font-semibold text-primary">₹67,000</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">Monthly Growth</span>
            <span className="font-semibold text-success">+35%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">Profit Margin</span>
            <span className="font-semibold text-accent">38.8%</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Forecast</span>
            <span className="font-semibold text-secondary">Positive</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}