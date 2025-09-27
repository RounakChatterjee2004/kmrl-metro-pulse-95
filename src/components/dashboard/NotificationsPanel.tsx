import { useState } from 'react';
import { Notification } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, FileText, Settings, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationsPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

const typeIcons = {
  document: FileText,
  system: Settings,
  alert: AlertCircle,
};

export function NotificationsPanel({ 
  notifications, 
  onClose, 
  onMarkAsRead 
}: NotificationsPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="w-80 shadow-large">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredNotifications.map((notification) => {
            const Icon = typeIcons[notification.type];
            return (
              <div
                key={notification.id}
                className={cn(
                  'rounded-lg border p-3 transition-colors hover:bg-muted/50 cursor-pointer',
                  !notification.read && 'bg-primary/5 border-primary/20 shadow-soft'
                )}
                onClick={() => !notification.read && onMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    'rounded-full p-1',
                    notification.type === 'alert' && 'bg-warning-light text-warning',
                    notification.type === 'document' && 'bg-info-light text-info',
                    notification.type === 'system' && 'bg-muted text-muted-foreground'
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className={cn(
                      'text-sm font-medium',
                      !notification.read && 'font-semibold'
                    )}>
                      {notification.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.date).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications found</p>
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full">
          Mark All as Read
        </Button>
      </CardContent>
    </Card>
  );
}