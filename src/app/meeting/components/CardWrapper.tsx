'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import VerticalCard from '@/components/ui/VerticalCard';
import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';

import CardRightSection from './CardRightSection';
import SkeletonMeetingTotalInfo from './skeletons/SkeletonMeetingTotalInfo';

const CardWarpper = ({ meetingId }: { meetingId: number }) => {
  const { data: meeting, isLoading, error } = useDetailQueries(meetingId);

  if (isLoading || !meeting) {
    return <SkeletonMeetingTotalInfo />;
  }

  // const meeting = {
  //   meetingId: 2,
  //   title: 'meeting hobby test',
  //   thumbnail:
  //     'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/meetingImg.png',
  //   location: '서울시 동작구',
  //   memberCount: 0,
  //   maxMember: 20,
  //   content:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   startdate: '2025-04-02',
  //   requireApproval: false,
  //   isLike: false,
  //   isMember: false,
  //   meetingSkillResponse: [],
  // };

  return (
    <>
      {/* 모바일 */}
      <div className="m-[-16px] flex flex-col md:hidden lg:hidden">
        <VerticalCard
          className="h-fit w-full"
          thumbnailHeight={252}
          thumbnailWidth={343}
          key={meeting.meetingId}
          title={meeting.title}
          thumbnailUrl={meeting.thumbnail}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
        >
          <CardRightSection meeting={meeting} />
        </VerticalCard>
      </div>

      {/* 테블릿 */}
      <div className="m-[-16px] hidden w-full flex-col md:flex lg:hidden">
        <HorizonCard
          className="items-center"
          key={meeting.meetingId}
          title={meeting.title}
          thumbnailUrl={meeting.thumbnail}
          thumbnailHeight={210}
          thumbnailWidth={252}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
        />
        <CardRightSection meeting={meeting} />
      </div>

      {/* 데스크탑 */}
      <div className="m-[-16px] hidden w-full lg:flex">
        <HorizonCard
          title={meeting.title}
          thumbnailUrl={meeting.thumbnail}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
          className="flex-col lg:flex-row"
        >
          <CardRightSection meeting={meeting} />
        </HorizonCard>
      </div>
    </>
  );
};
export default CardWarpper;
