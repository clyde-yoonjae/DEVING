'use client';

import { Button } from '@/components/ui/Button';
import HorizonCard from '@/components/ui/HorizonCard';
import Modal from '@/components/ui/modal/Modal';
import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';
import { getDDay } from '@/util/date';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SkeletonMeetingTotalInfo from './skeletons/SkeletonMeetingTotalInfo';

const CardWarpper = ({ meetingId }: { meetingId: number }) => {
  const { data: meeting, isLoading, error } = useDetailQueries(meetingId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

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
        <Button className="w-full" onClick={() => setIsModalOpen(true)}>
          신청하기
        </Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          confirmText="로그인"
          cancelText="취소"
          modalClassName="w-96"
        >
          <div className="text-cg8 typo-head3 flex w-full justify-center">
            <p className="text-white">로그인이 필요한 서비스입니다.</p>
          </div>
        </Modal>
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
