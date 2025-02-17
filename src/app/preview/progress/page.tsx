'use client';

import { Progress } from '@/components/ui/Progress';
import React from 'react';

export default function ProgressExamples() {
  return (
    <div className="w-40">
      <Progress total={50} value={33} />
    </div>
  );
}
