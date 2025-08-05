
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FileManager from '@/components/files/FileManager';

const FileManagement = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">File Management</h2>
          <p className="text-muted-foreground">
            Manage, organize, and access your case-related media and documents
          </p>
        </div>
        
        <EnhancedFileManager />
      </div>
    </AppLayout>
  );
};

export default FileManagement;
