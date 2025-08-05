
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  HomeIcon, 
  FileTextIcon, 
  MicIcon, 
  FolderIcon, 
  LineChart, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, text, href, active }: SidebarItemProps) => (
  <Link 
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-sidebar-accent",
      active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
    )}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r bg-sidebar transition-transform lg:translate-x-0 lg:border-r",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">CS</span>
          </div>
          <h2 className="text-xl font-bold text-sidebar-foreground">CaseSync</h2>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <SidebarItem 
            icon={<HomeIcon className="h-4 w-4" />} 
            text="Dashboard" 
            href="/" 
            active={location.pathname === '/'}
          />
          <SidebarItem 
            icon={<MicIcon className="h-4 w-4" />} 
            text="Record & Transcribe" 
            href="/transcribe" 
            active={location.pathname === '/transcribe'}
          />
          <SidebarItem 
            icon={<FileTextIcon className="h-4 w-4" />} 
            text="FIR Generation" 
            href="/fir" 
            active={location.pathname === '/fir'}
          />
          <SidebarItem 
            icon={<FolderIcon className="h-4 w-4" />} 
            text="File Management" 
            href="/files" 
            active={location.pathname === '/files'}
          />
          <SidebarItem 
            icon={<LineChart className="h-4 w-4" />} 
            text="Analytics" 
            href="/analytics" 
            active={location.pathname === '/analytics'}
          />
          
          <div className="my-2 border-t"></div>
          
          <SidebarItem 
            icon={<Settings className="h-4 w-4" />} 
            text="Settings" 
            href="/settings" 
            active={location.pathname === '/settings'}
          />
          <SidebarItem 
            icon={<HelpCircle className="h-4 w-4" />} 
            text="Help & Support" 
            href="/help" 
            active={location.pathname === '/help'}
          />
        </nav>
      </div>
      <div className="border-t p-3">
        <div className="rounded-md bg-sidebar-accent p-2">
          <div className="text-xs font-medium text-sidebar-accent-foreground">Sync Status</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-sidebar-foreground">Online - All files synced</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
