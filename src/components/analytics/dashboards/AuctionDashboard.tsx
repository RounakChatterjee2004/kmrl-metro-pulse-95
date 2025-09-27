import { Document } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';
import { MapPin, Calendar, Gavel, AlertTriangle } from 'lucide-react';

interface AuctionDashboardProps {
  document: Document;
  view: 'summary' | 'graphs' | 'kpis';
}

const assetConditionData = [
  { name: 'Functional', value: 45, color: 'hsl(var(--success))' },
  { name: 'Needs Repair', value: 35, color: 'hsl(var(--warning))' },
  { name: 'Damaged', value: 15, color: 'hsl(var(--destructive))' },
  { name: 'Scrap', value: 5, color: 'hsl(var(--muted-foreground))' }
];

const auctionTimelineData = [
  { event: 'Notice Published', date: '2024-02-15', status: 'completed' },
  { event: 'Site Inspection', date: '2024-03-01', status: 'completed' },
  { event: 'Document Submission', date: '2024-03-10', status: 'in-progress' },
  { event: 'Auction Date', date: '2024-03-15', status: 'upcoming' }
];

const bidParticipationData = [
  { property: 'Kaloor Complex', bids: 12, reserve: 25000000, highest: 28500000 },
  { property: 'Aluva Station', bids: 8, reserve: 15000000, highest: 17200000 },
  { property: 'Kochi Metro Plot', bids: 15, reserve: 35000000, highest: 39800000 },
  { property: 'Edapally Junction', bids: 6, reserve: 12000000, highest: 13100000 }
];

const chartConfig = {
  bids: {
    label: "Number of Bids",
    color: "hsl(var(--primary))",
  },
  amount: {
    label: "Bid Amount",
    color: "hsl(var(--secondary))",
  }
};

export function AuctionDashboard({ view }: AuctionDashboardProps) {
  if (view === 'kpis') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                  <p className="text-2xl font-bold text-primary">24</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-success">4 locations</span>
                <span className="text-muted-foreground ml-1">across Kochi</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bidders</p>
                  <p className="text-2xl font-bold text-secondary">41</p>
                </div>
                <Gavel className="h-8 w-8 text-secondary" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-success">+25%</span>
                <span className="text-muted-foreground ml-1">vs last auction</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-accent">78%</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-muted-foreground">18/23 sold</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-success">₹98.6Cr</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-success">+18%</span>
                <span className="text-muted-foreground ml-1">above reserve</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Map Placeholder */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Auction Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Interactive map showing auction locations</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Badge variant="outline">Kaloor</Badge>
                  <Badge variant="outline">Aluva</Badge>
                  <Badge variant="outline">Kochi Metro</Badge>
                  <Badge variant="outline">Edapally</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === 'graphs') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Condition Status */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Asset Condition Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetConditionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {assetConditionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bid Participation */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Bid Participation by Property</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bidParticipationData} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="property" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bids" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle>Auction Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auctionTimelineData.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-success' :
                    item.status === 'in-progress' ? 'bg-warning' : 'bg-muted'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{item.event}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <Badge variant={
                    item.status === 'completed' ? 'default' :
                    item.status === 'in-progress' ? 'secondary' : 'outline'
                  }>
                    {item.status}
                  </Badge>
                </div>
              ))}
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
          <CardTitle>Asset Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Total Properties</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Auction Date</span>
              <span className="font-semibold">March 15, 2024</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Reserve Value</span>
              <span className="font-semibold text-primary">₹87.5 Cr</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Expected Value</span>
              <span className="font-semibold text-success">₹98.6 Cr</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Condition Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetConditionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetConditionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}