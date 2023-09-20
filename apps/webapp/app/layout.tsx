'use client';
import 'ui/styles/globals.css';
import React from 'react';
import { Footer, Header } from '../containers';
import { useIsMounted } from '../hooks';
import SorobanProvider from '../soroban/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const mounted = useIsMounted();

  return (
    <html lang='en'>
      <body className='min-h-screen'>
        {mounted && (
          <SorobanProvider>
            <div className='container relative flex min-h-screen flex-col'>
              <Header />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
          </SorobanProvider>
        )}
      </body>
    </html>
  );
}
