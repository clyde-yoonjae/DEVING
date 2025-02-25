'use client';

import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';

import CardWarpper from './CardWrapper';
import MeetingInfo from './MeetingInfo';
import UserInfo from './UserInfo';

const MeetingTotalInfo = () => {
  const { data: meeting, error, isLoading } = useDetailQueries(1);

  console.log('data: ', meeting);

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;
  if (!meeting) return <div>loading...</div>;
  return (
    <div>
      <CardWarpper meeting={meeting} />
      <UserInfo />
      <MeetingInfo meeting={meeting} />
    </div>
  );
};

export default MeetingTotalInfo;
