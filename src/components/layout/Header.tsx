
import React from 'react';
import { Menu, Bell, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import LanguageSelector from '@/components/common/LanguageSelector';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Header = ({ toggleSidebar, toggleTheme, isDarkTheme }: HeaderProps) => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        
        <div className="hidden md:flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-police flex items-center justify-center">
              <span className="text-white font-semibold text-sm">CS</span>
            </div>
            <h1 className="text-xl font-bold">CaseSync</h1>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex flex-1 md:max-w-md px-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cases, files, reports..."
            className="w-full pl-8 bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSelector />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {isDarkTheme ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-police text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4">
              <h3 className="font-semibold">Notifications</h3>
              <div className="mt-2 space-y-2">
                <div className="flex gap-4 p-2 rounded hover:bg-muted">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-police/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-police" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">New case assigned: #CS-2023-0458</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-4 p-2 rounded hover:bg-muted">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-police/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-police" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">Transcription complete for Case #CS-2023-0457</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-4 p-2 rounded hover:bg-muted">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-police/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-police" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">FIR draft ready for review</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>OP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Officer Patel</p>
                  <p className="text-xs text-muted-foreground">ID: 28761</p>
                </div>
              </div>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
