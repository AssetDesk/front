import React from 'react';
import { TabsContent, TabsList, TabsTrigger, Tabs } from 'ui';
import { AssetDashboard } from './asset-dashboard';

export const AssetTabs = () => {
  return (
    <Tabs defaultValue='Overview' className='w-full'>
      <TabsList className='w-full md:w-[484px]'>
        <TabsTrigger value='Overview' className='flex-1'>
          Overview
        </TabsTrigger>
        <TabsTrigger value='Your info' className='flex-1'>
          Your info
        </TabsTrigger>
      </TabsList>
      <div className='flex-1 mt-6 mb-10'>
        <AssetDashboard />
      </div>
      <TabsContent value='Overview'>Make changes to your account here.</TabsContent>
      <TabsContent value='Your info'>Change your password here.</TabsContent>
    </Tabs>
  );
};
