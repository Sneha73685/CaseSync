
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import StatCards from '@/components/dashboard/StatCards';
import RecentCases from '@/components/dashboard/RecentCases';
import QuickActions from '@/components/dashboard/QuickActions';
import ActivityTimelineCard from '@/components/dashboard/ActivityTimelineCard';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to CaseSync. Manage your cases, recordings, and documentation.
          </p>
        </div>
        
        <StatCards />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <RecentCases />
          <div className="flex flex-col space-y-6">
            <QuickActions />
            <ActivityTimelineCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
