import { ArrowLeft } from 'lucide-react';

import MeetingTotalInfo from '../../components/MeetingTotalInfo';
import Review from '../../components/Review';

export default function page({ params }: { params: { id: string } }) {
  console.log('params: ', params);
  return (
    <div className="flex flex-col gap-[48px]">
      <div className="mt-[40px]">
        <ArrowLeft className="h-[24px] w-[24px] text-Cgray700" />
      </div>
      <MeetingTotalInfo meetingId={parseInt(params.id)} />
      <Review meetingId={parseInt(params.id)} />
    </div>
  );
}
