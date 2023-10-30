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
      <body className='min-h-screen'>
        {mounted && (
          <QueryProvider>
            <SorobanProvider>
              <div className='container relative flex min-h-screen flex-col'>
                <Header />
                <main className='flex-1'>{children}</main>
                <Footer />
              </div>
            </SorobanProvider>
          </QueryProvider>
        )}
      </body>
    </html>
  );
}
