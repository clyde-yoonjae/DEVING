import { formatDate } from '@/util/date';
import { MeetingDetail } from 'service/api/meeting';

const MeetingInfo = ({ meeting }: { meeting: MeetingDetail }) => {
  return (
    <div className="px-[32px] py-[16px]">
      <div className="flex flex-col gap-[24px] px-[16px]">
        <div className="flex items-center gap-[8px]">
          <div className="h-[14px] w-[2px] bg-Cgray700" />
          <h3 className="typo-head3 text-Cgray700">모임 설명</h3>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">장소</p>
            <p className="typo-body1 text-Cgray700">{meeting.location}</p>
          </div>
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">날짜</p>
            <p className="typo-body1 text-Cgray700">
              {formatDate(meeting.startdate)}
            </p>
          </div>
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">모집정원</p>
            <p className="typo-body1 text-Cgray700">{meeting.maxMember}명</p>
          </div>
        </div>
        <p className="typo-body1 h-[200px] text-Cgray800">{meeting.content}</p>
      </div>
    </div>
  );
};

export default MeetingInfo;
