import React from 'react';
import { TabsContent, TabsList, TabsTrigger, Tabs } from 'ui';
import { AssetDashboard } from './asset-dashboard';
import { ReserveConfiguration } from './reserve-configuration';

export const AssetTabs = () => {
  return (
    <Tabs defaultValue='Your info' className='w-full'>
      <TabsList className='w-full md:w-[484px]'>
        <TabsTrigger value='Overview' className='flex-1'>
          Overview
        </TabsTrigger>
        <TabsTrigger value='Your info' className='flex-1'>
          Your info
        </TabsTrigger>
      </TabsList>
      <div className='mb-10 mt-6 flex-1'>
        <AssetDashboard />
      </div>
      <TabsContent value='Overview'>
        <ReserveConfiguration />
      </TabsContent>
      <TabsContent value='Your info'>Change your password here.</TabsContent>
    </Tabs>
  );
};
