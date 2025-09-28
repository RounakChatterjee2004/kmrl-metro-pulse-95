import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const initialSources: DocumentSource[] = [
  {
    id: 'email',
    name: 'Email',
    description: 'Inbox & attachments',
    icon: <Mail className="h-5 w-5" />,
    enabled: true,
    status: 'connected',
    lastSync: '2 minutes ago'
  },
  {
    id: 'maximo',
    name: 'Maximo Exports',
    description: 'Maintenance & job cards',
    icon: <Database className="h-5 w-5" />,
    enabled: true,
    status: 'connected',
    lastSync: '15 minutes ago'
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    description: 'Document repositories',
    icon: <Globe className="h-5 w-5" />,
    enabled: true,
    status: 'connected',
    lastSync: '1 hour ago'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'PDFs & scanned documents',
    icon: <MessageCircle className="h-5 w-5" />,
    enabled: false,
    status: 'disconnected'
  },
  {
    id: 'scans',
    name: 'Hard-Copy Scans',
    description: 'Drag-and-drop uploads',
    icon: <FileImage className="h-5 w-5" />,
    enabled: true,
    status: 'connected',
    lastSync: '30 minutes ago'
  },
  {
    id: 'cloud',
    name: 'Ad-Hoc Cloud Links',
    description: 'External file sharing',
    icon: <Cloud className="h-5 w-5" />,
    enabled: true,
    status: 'error',
    lastSync: '2 hours ago'
  }
];

export function DocumentSourcesPanel() {
  const [sources, setSources] = useState(initialSources);

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
        return 'Connected';
      case 'error':
        return 'Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Document Sources</CardTitle>
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
                  Error
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
              {sources.filter(s => s.enabled).length} of {sources.length} sources active
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>Auto-sync enabled</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}