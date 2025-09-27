import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Wrench, 
  Shield, 
  Calculator, 
  FileText,
  Users,
  Crown
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DepartmentInfo {
  id: string;
  name: string;
  nameMl: string;
  nameHi: string;
  icon: any;
  color: string;
  bgColor: string;
  role: string;
  roleMl: string;
  roleHi: string;
  activeDocuments: number;
  urgentTasks: number;
}

const departments: DepartmentInfo[] = [
  {
    id: 'admin',
    name: 'Administration',
    nameMl: 'ഭരണവിഭാഗം',
    nameHi: 'प्रशासन',
    icon: Building2,
    color: 'text-primary',
    bgColor: 'bg-primary-light',
    role: 'General Manager',
    roleMl: 'ജനറൽ മാനേജർ',
    roleHi: 'महाप्रबंधक',
    activeDocuments: 12,
    urgentTasks: 3
  },
  {
    id: 'technical',
    name: 'Technical Services',
    nameMl: 'സാങ്കേതിക സേവനങ്ങൾ',
    nameHi: 'तकनीकी सेवाएं',
    icon: Wrench,
    color: 'text-secondary',
    bgColor: 'bg-secondary-light',
    role: 'Chief Technical Officer',
    roleMl: 'ചീഫ് ടെക്നിക്കൽ ഓഫീസർ',
    roleHi: 'मुख्य तकनीकी अधिकारी',
    activeDocuments: 8,
    urgentTasks: 5
  },
  {
    id: 'safety',
    name: 'Safety & Security',
    nameMl: 'സുരക്ഷ & സെക്യൂരിറ്റി',
    nameHi: 'सुरक्षा और संरक्षा',
    icon: Shield,
    color: 'text-destructive',
    bgColor: 'bg-destructive-light',
    role: 'Safety Officer',
    roleMl: 'സേഫ്റ്റി ഓഫീസർ',
    roleHi: 'सुरक्षा अधिकारी',
    activeDocuments: 15,
    urgentTasks: 2
  },
  {
    id: 'finance',
    name: 'Finance & Accounts',
    nameMl: 'ധനകാര്യവും അക്കൗണ്ടുകളും',
    nameHi: 'वित्त और लेखा',
    icon: Calculator,
    color: 'text-success',
    bgColor: 'bg-success-light',
    role: 'Finance Manager',
    roleMl: 'ഫിനാൻസ് മാനേജർ',
    roleHi: 'वित्त प्रबंधक',
    activeDocuments: 6,
    urgentTasks: 1
  }
];

export function DepartmentHighlight() {
  const { t, language } = useLanguage();
  
  // For demo, let's highlight the Technical Services department
  const currentDept = departments[1]; // Technical Services
  const DeptIcon = currentDept.icon;

  const getDeptName = () => {
    switch (language) {
      case 'ml': return currentDept.nameMl;
      case 'hi': return currentDept.nameHi;
      default: return currentDept.name;
    }
  };

  const getRole = () => {
    switch (language) {
      case 'ml': return currentDept.roleMl;
      case 'hi': return currentDept.roleHi;
      default: return currentDept.role;
    }
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary-light/30 to-secondary-light/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`rounded-lg ${currentDept.bgColor} p-2`}>
              <DeptIcon className={`h-5 w-5 ${currentDept.color}`} />
            </div>
            <div>
              <span className="text-lg font-bold">{getDeptName()}</span>
              <Badge variant="default" className="ml-2">
                <Crown className="h-3 w-3 mr-1" />
                Current
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4 border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Your Role</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {language === 'en' ? 'Active' : language === 'ml' ? 'സജീവം' : 'सक्रिय'}
            </Badge>
          </div>
          <p className="text-sm font-medium text-foreground">
            {getRole()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 border text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <FileText className="h-4 w-4 text-info" />
              <span className="text-xs text-muted-foreground">
                {language === 'en' ? 'Active Docs' : 
                 language === 'ml' ? 'സജീവ ഡോക്സ്' : 'सक्रिय डॉक्स'}
              </span>
            </div>
            <p className="text-xl font-bold text-info">{currentDept.activeDocuments}</p>
          </div>
          
          <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 border text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Shield className="h-4 w-4 text-warning" />
              <span className="text-xs text-muted-foreground">
                {language === 'en' ? 'Urgent' : 
                 language === 'ml' ? 'അടിയന്തര' : 'तत्काल'}
              </span>
            </div>
            <p className="text-xl font-bold text-warning">{currentDept.urgentTasks}</p>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
          {language === 'en' ? 'Department-specific document access enabled' :
           language === 'ml' ? 'ഡിപ്പാർട്ട്മെന്റ്-നിർദ്ദിഷ്ട ഡോക്യുമെന്റ് ആക്സസ് പ്രാപ്തമാക്കിയിരിക്കുന്നു' :
           'विभाग-विशिष्ट दस्तावेज़ पहुंच सक्षम'}
        </div>
      </CardContent>
    </Card>
  );
}