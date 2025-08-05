
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FIRForm from '@/components/fir/FIRForm';

const FIRGeneration = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">FIR Generation</h2>
          <p className="text-muted-foreground">
            Generate First Information Reports from case data and transcriptions
          </p>
        </div>
        
        <FIRForm />
      </div>
    </AppLayout>
  );
};

export default FIRGeneration;
