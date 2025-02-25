'use client';

import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';

import CardWarpper from './CardWrapper';
import MeetingInfo from './MeetingInfo';
import UserInfo from './UserInfo';

const MeetingTotalInfo = ({ meetingId }: { meetingId: number }) => {
  const { data: meeting, error, isLoading } = useDetailQueries(meetingId);

  console.log('data: ', meeting);

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;
  if (!meeting) return <div>loading...</div>;

  return (
    <div className="flex flex-col gap-[48px]">
      <CardWarpper meeting={meeting} />
      <UserInfo />
      <MeetingInfo meeting={meeting} />
    </div>
  );
};

export default MeetingTotalInfo;
