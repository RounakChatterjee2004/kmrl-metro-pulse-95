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

// Helper function to get translated connectors
const getTranslatedConnectors = (language: string, translations: any): Connector[] => {
  const connectorData = translations.connectorData[language] || translations.connectorData.en;
  
  return [
    {
      id: '1',
      name: connectorData[0].title,
      type: 'email' as const,
      status: 'connected' as const,
      description: connectorData[0].description,
      lastSync: connectorData[0].lastSync
    },
    {
      id: '2', 
      name: connectorData[1].title,
      type: 'database' as const,
      status: 'connected' as const,
      description: connectorData[1].description,
      lastSync: connectorData[1].lastSync
    },
    {
      id: '3',
      name: connectorData[2].title,
      type: 'cloud' as const,
      status: 'syncing' as const,
      description: connectorData[2].description,
      lastSync: connectorData[2].lastSync
    },
    {
      id: '4',
      name: connectorData[3].title,
      type: 'api' as const,
      status: 'disconnected' as const,
      description: connectorData[3].description,
      lastSync: connectorData[3].lastSync || ''
    },
    {
      id: '5',
      name: connectorData[4].title,
      type: 'cloud' as const,
      status: 'connected' as const,
      description: connectorData[4].description,
      lastSync: connectorData[4].lastSync
    },
    {
      id: '6',
      name: connectorData[5].title,
      type: 'api' as const,
      status: 'disconnected' as const,
      description: connectorData[5].description,
      lastSync: connectorData[5].lastSync
    }
  ];
};

export function ConnectorsPanel() {
  const { t, language } = useLanguage();
  
  // Get all translations object for passing to helper function
  const allTranslations = {
    connectorData: t('connectorData')
  };
  
  const connectors = getTranslatedConnectors(language, allTranslations);

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
      case 'connected': return { variant: 'default' as const, text: t('connected') };
      case 'syncing': return { variant: 'secondary' as const, text: t('syncing') };
      case 'disconnected': return { variant: 'destructive' as const, text: t('disconnected') };
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
                      <span>{connector.lastSync}</span>
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
              {connectors.filter(c => c.status === 'connected').length} {t('of')} {connectors.length} {t('sourcesActive')}
            </span>
            <span className="text-xs text-muted-foreground">
              {t('autoSyncEnabled')}
            </span>
          </div>
          <div className="mt-2">
            <Button variant="outline" size="sm" className="h-6 text-xs w-full">
              {t('manageAll')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}