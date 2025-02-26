'use client';

import { Button } from '@/components/ui/Button';
import HorizonCard from '@/components/ui/HorizonCard';
import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';
import { getDDay } from '@/util/date';

import SkeletonMeetingTotalInfo from './skeletons/SkeletonMeetingTotalInfo';

const CardWarpper = ({ meetingId }: { meetingId: number }) => {
  const { data: meeting, isLoading, error } = useDetailQueries(meetingId);

  // 신청 전
  if (isLoading || !meeting) {
    return <SkeletonMeetingTotalInfo />;
  }
  const beforeSubmit = () => {
    return (
      <div className="flex h-[208px] w-[318px] flex-col justify-end gap-[24px]">
        <div>
          <p className="typo-head3 text-Cgray500">모임 시작</p>
          <div className="flex items-end">
            <p className="typo-head1 text-Cgray800">
              {getDDay(meeting.startdate)}
            </p>
            <p className="typo-button1 mb-2 ml-1 text-Cgray800">일</p>
          </div>
        </div>
        <Button className="w-full">신청하기</Button>
      </div>
    );
  };

  return (
    <div className="w-full p-[16px]">
      <HorizonCard
        title={meeting.title}
        thumbnailUrl={meeting.thumbnail}
        location={meeting.location}
        isLike={meeting.isLike}
        total={meeting.maxMember}
        value={meeting.memberCount}
      >
        {beforeSubmit()}
      </HorizonCard>
    </div>
  );
};
export default CardWarpper;
