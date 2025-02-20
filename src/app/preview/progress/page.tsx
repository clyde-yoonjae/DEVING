'use client';

import { Progress } from '@/components/ui/Progress';
import React from 'react';

export default function ProgressExamples() {
  return (
    <div className="mt-3 flex flex-col">
      <Progress className="w-40" total={50} value={33} />
      <Progress total={100} value={70} />
    </div>
  );
}
