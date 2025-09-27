import { UserRole } from '@/types/document';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Users, Briefcase, Shield, Wrench, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RoleSelectorProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleIcons = {
  Engineering: Wrench,
  Finance: Briefcase,
  HR: Users,
  Safety: Shield,
  Executive: Crown,
};

const roleDescriptions = {
  Engineering: 'Technical documents and maintenance',
  Finance: 'Invoices and procurement',
  HR: 'Employee documents and policies',
  Safety: 'Safety protocols and compliance',
  Executive: 'Overall system overview',
};

export function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-3 shadow-sm">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-primary">{t('viewAs')}:</span>
        <Select value={currentRole} onValueChange={onRoleChange}>
          <SelectTrigger className="w-40 h-8 border-primary/30 focus:border-primary text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(roleIcons).map(([role, Icon]) => (
              <SelectItem key={role} value={role}>
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{role}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}