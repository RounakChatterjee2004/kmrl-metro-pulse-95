import { DashboardMetric } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  metric: DashboardMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus;
  const { t } = useLanguage();

  const getTranslatedTitle = (title: string) => {
    const titleMap: Record<string, string> = {
      'Total Documents': t('totalDocuments'),
      'Critical Alerts': t('criticalAlerts'),
      'Departments Active': t('departmentsActive'),
    };
    return titleMap[title] || title;
  };

  const getTranslatedUnit = (unit: string) => {
    const unitMap: Record<string, string> = {
      'docs': t('docs'),
      'active': t('active'),
      'depts': t('depts'),
    };
    return unitMap[unit] || unit;
  };
  
  return (
    <Card className="hover-lift">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{getTranslatedTitle(metric.title)}</CardTitle>
        <div className={cn(
          'rounded-full p-1',
          metric.trend === 'up' && 'bg-success-light text-success',
          metric.trend === 'down' && 'bg-destructive-light text-destructive',
          metric.trend === 'stable' && 'bg-muted text-muted-foreground'
        )}>
          <TrendIcon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{getTranslatedUnit(metric.unit)}</p>
          <p className={cn(
            'text-xs font-medium',
            metric.change > 0 && 'text-success',
            metric.change < 0 && 'text-destructive',
            metric.change === 0 && 'text-muted-foreground'
          )}>
            {metric.change > 0 && '+'}
            {metric.change} {t('thisWeek')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}