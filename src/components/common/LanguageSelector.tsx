
import React from 'react';
import { Globe } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'as', name: 'অসমীয়া (Assamese)' },
  { code: 'ur', name: 'اردو (Urdu)' },
];

const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = React.useState('en');
  const { toast } = useToast();

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    
    // Get the language name
    const language = languages.find(lang => lang.code === langCode);
    if (language) {
      toast({
        title: "Language Changed",
        description: `Interface language changed to ${language.name}`,
        duration: 2000
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-[300px] overflow-y-auto">
        <div className="p-2">
          <h3 className="text-sm font-medium mb-2">Select Interface Language</h3>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              className={`language-option ${currentLang === lang.code ? 'bg-muted' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="text-sm">{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
