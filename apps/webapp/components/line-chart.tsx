'use client';
import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Button } from 'ui';
import { cn } from 'ui/lib/utils';

const data = [
  {
    name: 'Jun 25',
    pv: 12,
  },
  {
    name: 'Jul 02',
    pv: 100,
  },
  {
    name: 'Jul 09',
    pv: 10,
  },
  {
    name: 'Jul 16',
    pv: 12,
  },
];

interface LinearChartProps {
  value1: string;
  value2?: string;
  period?: boolean;
}

export const LinearChart = ({ value1, value2, period = true }: LinearChartProps) => {
  const [periodValue, setPeriodValue] = useState<number>(1);
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-4 md:flex-row md:gap-6'>
          <div className='flex items-center gap-4'>
            <div className='h-3 w-3 rounded-full bg-[#0344E9]'></div>
            <p className='subtitle2'>{value1}</p>
          </div>
          {value2 && (
            <div className='flex items-center gap-4'>
              <div className='h-3 w-3 rounded-full bg-[#06AF88]'></div>
              <p className='subtitle2'>{value2}</p>
            </div>
          )}
        </div>
        {period && (
          <div className='flex'>
            {[1, 6, 12].map(i => (
              <Button
                onClick={() => setPeriodValue(i)}
                key={i}
                variant='ghost'
                className={cn(
                  'border-[#E3E3E3)] w-10 border-b-[1px] py-[10px] md:w-[90px]',
                  periodValue === i && 'border-[#0344E9]',
                )}
              >
                {i}m
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className='h-28 w-full md:h-36'>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray='4 4' vertical={false} stroke='#082E8F' />
            <XAxis
              dataKey='name'
              tickLine={false}
              strokeWidth={0}
              className='number2'
              color='#0344E9'
              tick={{
                fill: '#FFF',
              }}
              tickMargin={14}
            />
            <YAxis
              tickLine={false}
              strokeWidth={0}
              tickFormatter={val => `${val}%`}
              className='number2'
              allowDuplicatedCategory={false}
              tick={{ dx: -17, fill: '#FFF' }}
            />
            <Line type='monotone' dataKey='pv' stroke='#0344E9' dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
