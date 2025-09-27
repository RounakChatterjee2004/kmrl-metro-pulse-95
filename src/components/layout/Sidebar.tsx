import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Upload,
  Search,
  AlertTriangle,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Documents', url: '/documents', icon: FileText },
  { title: 'Upload', url: '/upload', icon: Upload },
  { title: 'Alerts', url: '/alerts', icon: AlertTriangle },
  { title: 'Audit Logs', url: '/audit-logs', icon: Search },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const getNavigationTitle = (title: string) => {
    const titleMap: Record<string, string> = {
      'Dashboard': t('dashboard'),
      'Documents': t('documents'),
      'Upload': t('upload'),
      'Alerts': t('alerts'),
      'Audit Logs': t('auditLogs'),
      'Analytics': t('analytics'),
      'Settings': t('settings'),
    };
    return titleMap[title] || title;
  };

  return (
    <aside
      className={cn(
        'relative border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="space-y-1 p-4 pt-8">
        {navigationItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={cn(
              'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive(item.url)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              collapsed && 'justify-center px-2'
            )}
          >
            <item.icon className={cn('h-5 w-5', !collapsed && 'mr-3')} />
            {!collapsed && <span>{getNavigationTitle(item.title)}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}