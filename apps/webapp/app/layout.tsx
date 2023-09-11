'use client';
import 'ui/styles/globals.css';
import React from 'react';
import { Footer, Header } from '../containers';
import { useIsMounted } from '../hooks';
import Head from 'next/head'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const mounted = useIsMounted();
  return (
    <html lang='en'>
      <Head>
        {/* <link rel="icon" href={`/favicon-${theme}.ico`} /> */}
      </Head>
      <body className='min-h-screen'>
        {mounted && (
          <div className='container relative flex min-h-screen flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}
