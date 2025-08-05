
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useToast } from '@/hooks/use-toast';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check user preference in local storage
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkTheme(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    toast({
      title: `${newTheme ? 'Dark' : 'Light'} mode enabled`,
      duration: 1500,
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="lg:ml-64">
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
        />
        <main className="container px-4 py-6 lg:px-8">
          {children}
        </main>
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default AppLayout;
