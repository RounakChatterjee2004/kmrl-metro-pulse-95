import { Alert } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertsPanelProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
}

export function AlertsPanel({ alerts, onAlertClick }: AlertsPanelProps) {
  const criticalAlerts = alerts.filter(alert => alert.urgency === 'Critical');
  const reviewAlerts = alerts.filter(alert => alert.urgency === 'Review');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <span>Critical Alerts</span>
          <Badge variant="destructive" className="ml-auto">
            {criticalAlerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {criticalAlerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              'rounded-lg border p-3 transition-colors hover:bg-muted/50 cursor-pointer',
              alert.urgency === 'Critical' && 'border-destructive/20 bg-destructive-light/10'
            )}
            onClick={() => onAlertClick(alert)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{alert.title}</h4>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(alert.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge 
                  variant={alert.urgency === 'Critical' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {alert.urgency}
                </Badge>
                {alert.acknowledged && (
                  <CheckCircle className="h-4 w-4 text-success" />
                )}
              </div>
            </div>
          </div>
        ))}

        {reviewAlerts.length > 0 && (
          <>
            <div className="border-t pt-3">
              <h5 className="text-sm font-medium text-muted-foreground mb-2">
                Review Required ({reviewAlerts.length})
              </h5>
              {reviewAlerts.slice(0, 2).map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-lg border p-2 mb-2 hover:bg-muted/50 cursor-pointer"
                  onClick={() => onAlertClick(alert)}
                >
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <Button variant="outline" size="sm" className="w-full">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
}