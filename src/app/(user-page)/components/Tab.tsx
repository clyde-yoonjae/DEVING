'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const Tab = ({ type }: { type: string }) => {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        className="w-fit px-4"
        variant={type === 'created' ? 'solid' : 'default'}
        onClick={() => router.push('/my-meeting/my?type=created')}
      >
        내가 만든 모임
      </Button>
      <Button
        className="w-fit px-4"
        variant={type === 'joined' ? 'solid' : 'default'}
        onClick={() => router.push('/my-meeting/my?type=joined')}
      >
        내가 참여하고 있는 모임
      </Button>
    </div>
  );
};
export default Tab;
