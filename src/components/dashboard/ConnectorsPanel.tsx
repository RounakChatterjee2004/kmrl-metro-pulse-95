import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Database, 
  Cloud, 
  Wifi, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Connector {
  id: string;
  name: string;
  type: 'email' | 'database' | 'cloud' | 'api';
  status: 'connected' | 'disconnected' | 'syncing';
  description: string;
  lastSync?: string;
}

const connectors: Connector[] = [
  {
    id: '1',
    name: 'KMRL Email System',
    type: 'email',
    status: 'connected',
    description: 'Official KMRL email integration for document reception',
    lastSync: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Metro Database',
    type: 'database',
    status: 'connected',
    description: 'Main operational database connection',
    lastSync: '5 minutes ago'
  },
  {
    id: '3',
    name: 'Document Cloud',
    type: 'cloud',
    status: 'syncing',
    description: 'Cloud storage synchronization',
    lastSync: 'Syncing now...'
  },
  {
    id: '4',
    name: 'Vendor Portal API',
    type: 'api',
    status: 'disconnected',
    description: 'External vendor document API',
    lastSync: '2 hours ago'
  }
];

export function ConnectorsPanel() {
  const { t } = useLanguage();

  const getConnectorIcon = (type: Connector['type']) => {
    switch (type) {
      case 'email': return Mail;
      case 'database': return Database;
      case 'cloud': return Cloud;
      case 'api': return Wifi;
      default: return Settings;
    }
  };

  const getStatusIcon = (status: Connector['status']) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'syncing': return Clock;
      case 'disconnected': return AlertCircle;
    }
  };

  const getStatusColor = (status: Connector['status']) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'syncing': return 'text-warning';
      case 'disconnected': return 'text-destructive';
    }
  };

  const getStatusBadge = (status: Connector['status']) => {
    switch (status) {
      case 'connected': return { variant: 'default' as const, text: 'Connected' };
      case 'syncing': return { variant: 'secondary' as const, text: 'Syncing' };
      case 'disconnected': return { variant: 'destructive' as const, text: 'Disconnected' };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wifi className="h-5 w-5 text-primary" />
          <span>{t('connectors')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectors.map((connector) => {
          const ConnectorIcon = getConnectorIcon(connector.type);
          const StatusIcon = getStatusIcon(connector.status);
          const statusBadge = getStatusBadge(connector.status);

          return (
            <div
              key={connector.id}
              className="flex items-start justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary-light p-2">
                  <ConnectorIcon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium">{connector.name}</h4>
                    <Badge variant={statusBadge.variant} className="text-xs">
                      {statusBadge.text}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {connector.description}
                  </p>
                  {connector.lastSync && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <StatusIcon className={`h-3 w-3 ${getStatusColor(connector.status)}`} />
                      <span>Last sync: {connector.lastSync}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
        
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {connectors.filter(c => c.status === 'connected').length} of {connectors.length} connected
            </span>
            <Button variant="outline" size="sm" className="h-6 text-xs">
              Manage All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}