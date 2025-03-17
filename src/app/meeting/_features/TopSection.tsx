'use client';

import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';
import { ArrowLeft, Edit } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TopSection = ({ meetingId }: { meetingId: number }) => {
  const router = useRouter();

  const { data: meeting, isLoading, error } = useDetailQueries(meetingId);
  const status = meeting?.isMeetingManager ? 'LEADER' : meeting?.memberStatus;

  if (isLoading || error) {
    return null;
  }

  return (
    <div className="mt-[40px] flex items-center justify-between px-[16px]">
      <div>
        <ArrowLeft
          className="hover:text-Cgray900 h-[24px] w-[24px] text-Cgray700 transition-colors hover:cursor-pointer"
          onClick={() => router.back()}
        />
      </div>

      {status === 'LEADER' && (
        <Link href={`/meeting/edit-meeting/${meeting?.meetingId}`}>
          <div className="flex gap-2">
            <div>
              <Edit className="hover:text-Cgray900 h-[24px] w-[24px] text-Cgray700 transition-colors hover:cursor-pointer" />
            </div>
            <p className="text-white">수정하기</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default TopSection;
