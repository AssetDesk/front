'use client';

import React from 'react';
import 'ui/styles/globals.css';
import { Footer, Header } from '../containers';
import { useIsMounted } from '../hooks/mount';
import SorobanProvider from './soroban-provider';
import { QueryProvider } from './query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const mounted = useIsMounted();

  return (
    <html lang='en'>
      <head>
        <title>AssetDesk</title>
        <link rel='icon' href='/favicon.svg' sizes='any' type='image/svg' />
      </head>
      <body className='min-h-screen'>
        {mounted && (
          <QueryProvider>
            <SorobanProvider>
              <div className='container relative flex min-h-screen flex-col'>
                <Header />
                <div className='flex-1'>{children}</div>
                <Footer />
              </div>
            </SorobanProvider>
          </QueryProvider>
        )}
      </body>
    </html>
  );
}
