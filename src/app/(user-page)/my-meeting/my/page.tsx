import NotYet from '@/components/common/NotYet';

import Created from '../../components/Created';
import Joined from '../../components/Joined';
import MeetingTypeTab from '../../components/MeetingTypeTab';
import Tab from '../../components/Tab';

export interface Member {
  userId: number;
  profilePic: string;
  name: string;
  memberStatus: 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';
}

export interface Meeting {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  isPublic: boolean;
  memberList: Member[];
}

export default function Page({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const type = searchParams?.type;
  console.log('type: ', type);
  return (
    <div>
      <div className="mt-6 flex flex-col gap-[24px]">
        <Tab type={type} />
      </div>
      {type === 'created' ? <Created /> : <NotYet />}
    </div>
  );
}
