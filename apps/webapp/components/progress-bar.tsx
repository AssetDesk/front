'use client';

import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ProgressBar = () => {
  return (
    <div>
      <CircularProgressbar
        value={90}
        strokeWidth={6}
        styles={{
          text: {
            fill: '#FFF',
            fontSize: '14px',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
          },
          trail: {
            stroke: '#B0A8A8',
            strokeLinecap: 'butt',
            transform: 'rotate(0.5turn)',
            transformOrigin: 'center center',
          },
          path: {
            stroke: `#0344E9`,
            strokeLinecap: 'butt',
            transition: 'stroke-dashoffset 0.5s ease 0s',
            transform: 'rotate(1turn)',
            transformOrigin: 'center center',
          },
        }}
        className='h-36 w-36 md:h-24 md:w-24'
        text='90%'
      />
    </div>
  );
};
