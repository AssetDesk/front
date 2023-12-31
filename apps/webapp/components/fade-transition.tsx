'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { cn } from 'ui/lib/utils';

export const FadeTransition = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn('flex w-[100%] flex-1 flex-col items-center justify-center', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
      exit={{ opacity: 0 }}
    >
      <div className='w-[100%]'>{children}</div>
    </motion.div>
  );
};
