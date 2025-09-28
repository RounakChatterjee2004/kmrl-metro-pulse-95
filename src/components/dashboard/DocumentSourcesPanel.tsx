import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Mail,
  Database,
  Globe,
  MessageCircle,
  FileImage,
  Cloud,
  Settings
} from 'lucide-react';

interface DocumentSource {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
}

// Helper function to get translated document sources
const getTranslatedSources = (language: string, translations: any): DocumentSource[] => {
  const sourceData = translations.documentSourceData[language] || translations.documentSourceData.en;
  
  const iconMap = {
    email: <Mail className="h-5 w-5" />,
    maximo: <Database className="h-5 w-5" />,
    sharepoint: <Globe className="h-5 w-5" />,
    whatsapp: <MessageCircle className="h-5 w-5" />,
    scans: <FileImage className="h-5 w-5" />,
    cloud: <Cloud className="h-5 w-5" />
  };

  return [
    {
      id: 'email',
      name: sourceData[0].title,
      description: sourceData[0].description,
      icon: iconMap.email,
      enabled: true,
      status: 'connected' as const,
      lastSync: sourceData[0].lastSync
    },
    {
      id: 'maximo',
      name: sourceData[1].title,
      description: sourceData[1].description,
      icon: iconMap.maximo,
      enabled: true,
      status: 'connected' as const,
      lastSync: sourceData[1].lastSync
    },
    {
      id: 'sharepoint',
      name: sourceData[2].title,
      description: sourceData[2].description,
      icon: iconMap.sharepoint,
      enabled: true,
      status: 'connected' as const,
      lastSync: sourceData[2].lastSync
    },
    {
      id: 'whatsapp',
      name: sourceData[3].title,
      description: sourceData[3].description,
      icon: iconMap.whatsapp,
      enabled: false,
      status: 'disconnected' as const
    },
    {
      id: 'scans',
      name: sourceData[4].title,
      description: sourceData[4].description,
      icon: iconMap.scans,
      enabled: true,
      status: 'connected' as const,
      lastSync: sourceData[4].lastSync
    },
    {
      id: 'cloud',
      name: sourceData[5].title,
      description: sourceData[5].description,
      icon: iconMap.cloud,
      enabled: true,
      status: 'error' as const,
      lastSync: sourceData[5].lastSync
    }
  ];
};

export function DocumentSourcesPanel() {
  const { t, language } = useLanguage();
  
  // Get all translations object for passing to helper function
  const allTranslations = {
    documentSourceData: t('documentSourceData')
  };
  
  const translatedSources = getTranslatedSources(language, allTranslations);
  const [sources, setSources] = useState(translatedSources);

  // Update sources when language changes
  useEffect(() => {
    const newTranslatedSources = getTranslatedSources(language, allTranslations);
    setSources(newTranslatedSources);
  }, [language]);

  const handleToggle = (id: string) => {
    setSources(prev =>
      prev.map(source =>
        source.id === id
          ? {
              ...source,
              enabled: !source.enabled,
              status: !source.enabled ? 'connected' : 'disconnected'
            }
          : source
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-success';
      case 'error':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return t('connected');
      case 'error':
        return t('error');
      default:
        return t('disconnected');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">{t('documentSources')}</CardTitle>
        <Settings className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {sources.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 text-muted-foreground">
                {source.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium truncate">{source.name}</p>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`} />
                </div>
                <p className="text-xs text-muted-foreground">{source.description}</p>
                {source.lastSync && source.enabled && (
                  <p className="text-xs text-muted-foreground">
                    Last sync: {source.lastSync}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {source.status === 'error' && (
                <Badge variant="destructive" className="text-xs">
                  {t('error')}
                </Badge>
              )}
              <Switch
                checked={source.enabled}
                onCheckedChange={() => handleToggle(source.id)}
              />
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {sources.filter(s => s.enabled).length} {t('of')} {sources.length} {t('sourcesActive')}
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>{t('autoSyncEnabled')}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}