import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, CheckCircle, Filter, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockAlerts } from '@/data/mockData';
import { Alert } from '@/types/document';

export default function Alerts() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || alert.type === filterDepartment;
    const matchesUrgency = filterUrgency === 'all' || alert.urgency === filterUrgency;
    
    return matchesSearch && matchesDepartment && matchesUrgency;
  });

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'Review':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'destructive';
      case 'Review':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1">
        <Header onNotificationsClick={() => {}} unreadCount={0} />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('alerts')}</h1>
            <p className="text-muted-foreground">Monitor critical alerts and system notifications</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgencies</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setFilterDepartment('all');
                  setFilterUrgency('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className="hover-lift transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex items-center gap-2 mt-1">
                        {getUrgencyIcon(alert.urgency)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{alert.title}</h3>
                          <Badge variant={getUrgencyColor(alert.urgency) as any}>
                            {alert.urgency}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{alert.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Date: {new Date(alert.date).toLocaleDateString()}</span>
                          {alert.documentId && (
                            <span>Document ID: {alert.documentId}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!alert.acknowledged && (
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                      )}
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterDepartment !== 'all' || filterUrgency !== 'all'
                    ? 'Try adjusting your filters'
                    : 'All alerts have been addressed'}
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}