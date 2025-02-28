import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';
import { meetingKeys } from '@/hooks/queries/useMeetingQueries';
import { QueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import CardWarpper from '../../components/CardWrapper';
import ContentLabel from '../../components/ContextLabel';
import MeetingInfo from '../../components/MeetingInfo';
import ReviewInput from '../../components/ReviewInput';
import ReviewList from '../../components/ReviewList';
import UserInfo from '../../components/UserInfo';

export default function page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const meetingId = parseInt(params.id);

  // 서버에서 react query 데이터를 미리 받아오기
  //   queryClient.prefetchQuery({
  //     queryKey: meetingKeys.detailInfo(meetingId),
  //     queryFn: () => getMeetingDetail(meetingId),
  //   });

  return (
    <div className="flex flex-col gap-[48px]">
      <div className="mt-[40px]">
        <ArrowLeft className="h-[24px] w-[24px] text-Cgray700" />
      </div>
      <div className="flex flex-col gap-[48px] p-[16px] md:px-[48px]">
        <CardWarpper meetingId={meetingId} />
        <UserInfo meetingId={meetingId} />
        <MeetingInfo meetingId={meetingId} />
        <ContentLabel>리뷰</ContentLabel>
        <ReviewAvgCard meetingId={meetingId} />
        <ReviewInput meetingId={meetingId} />
        <ReviewList meetingId={meetingId} />
      </div>
    </div>
  );
}
