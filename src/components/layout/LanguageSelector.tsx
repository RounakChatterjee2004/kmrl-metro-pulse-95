import { Globe, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ml' as Language, name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Languages className="h-4 w-4 text-primary" />
            <span className="text-lg">{currentLanguage?.flag}</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium">{currentLanguage?.nativeName}</span>
            <Badge variant="secondary" className="text-xs h-4 px-1">
              {currentLanguage?.code.toUpperCase()}
            </Badge>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center justify-between p-3"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
              </div>
            </div>
            {language === lang.code && (
              <Badge variant="default" className="text-xs">
                Active
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}