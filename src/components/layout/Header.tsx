import { Bell, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import kmrlLogo from '@/assets/kmrl-logo.png';

interface HeaderProps {
  onNotificationsClick: () => void;
  unreadCount: number;
}

export function Header({ onNotificationsClick, unreadCount }: HeaderProps) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <img src={kmrlLogo} alt="KMRL Logo" className="h-10 w-10" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-primary">KMRL DocuMind</h1>
            <p className="text-xs text-muted-foreground">{t('kmrlFullName')}</p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <LanguageSelector />
          
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                <p className="text-xs leading-none text-primary font-medium">{user?.role}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}