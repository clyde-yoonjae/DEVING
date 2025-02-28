'use client';

import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import HorizonCard from '@/components/ui/HorizonCard';
import { Tag } from '@/components/ui/Tag';
import Modal from '@/components/ui/modal/Modal';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import ModalProfile from '../components/ModalProfile';
import ModalUserList from '../components/ModalUserList';

interface Member {
  userId: number;
  profilePic: string;
  name: string;
  memberStatus: 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';
}

const CardRightSection = ({
  memberList,
  isPublic,
  className,
}: {
  memberList: Member[];
  isPublic: boolean;
  className?: string;
}) => {
  const [selectedFilter, setSelectedFilter] = useState(
    isPublic ? '공개' : '비공개',
  );
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
  const handleConfirm = () => {
    setIsUserListModalOpen(false);
  };
  const filterAreaOptions = [
    { value: 'true', label: '공개' },
    { value: 'false', label: '비공개' },
  ];

  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);

  const handleSecondModalConfirm = () => {
    // 가입 확인 api 연동
    setIsUserProfileModalOpen(false);
  };

  const handleSecondModalCancel = () => {
    // 가입 거절 api 연동
    setIsUserProfileModalOpen(false);
  };
  return (
    <div className={`flex w-full gap-[24px] px-4 lg:w-[518px] ${className}`}>
      <div className="hidden flex-col justify-center gap-[16px] lg:flex">
        <h3 className="typo-head3  text-main">참가 중인 멤버</h3>
        <div className="h-[172px] overflow-y-auto">
          {memberList.map((member: Member) => (
            <div key={member.userId} className="flex items-center py-[8px]">
              <Image
                src={member.profilePic}
                alt="맴버 프로필"
                width={40}
                height={40}
                className="rounded-[9.92px] "
              />
              <p className="typo-head3 w-[114px] p-[6px] text-Cgray700">
                {member.name}
              </p>
              <div className="flex h-[40px] gap-[6px]">
                <Tag variant={member.memberStatus} className="w-[49px]" />
                <Button
                  variant={'outline'}
                  className="h-[40px] w-[93px]"
                  onClick={() => setIsUserProfileModalOpen(true)}
                >
                  프로필보기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        className="flex h-[40px] flex-1 md:h-[46px] lg:hidden"
        onClick={() => setIsUserListModalOpen(true)}
      >
        맴버 명단 보기
      </Button>
      <div className="flex w-[120px] items-center">
        <Dropdown
          options={filterAreaOptions}
          trigger={selectedFilter}
          onChange={setSelectedFilter}
          className="h-[40px] md:h-[46px]"
          contentClassName=""
          variant="icon"
        />
      </div>
      <Modal
        isOpen={isUserProfileModalOpen}
        onClose={handleSecondModalCancel}
        onConfirm={handleSecondModalConfirm}
        confirmText="가입승인"
        cancelText="가입거절"
        modalClassName="w-[450px] overflow-hidden bg-BG_2"
      >
        <ModalProfile />
      </Modal>
      <Modal
        isOpen={isUserListModalOpen}
        onClose={() => setIsUserListModalOpen(false)}
        onConfirm={handleConfirm}
        showOnly
        modalClassName="h-[590px] w-[520px] overflow-y-auto"
      >
        <ModalUserList
          setIsUserProfileModalOpen={setIsUserProfileModalOpen}
          setIsUserListModalOpen={setIsUserListModalOpen}
        />
      </Modal>
    </div>
  );
};

interface Meeting {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  isPublic: boolean;
  memberList: Member[];
}

export default function Page() {
  const meetings: Meeting[] = [
    {
      meetingId: 16,
      title: '코드잇 스프린트',
      thumbnail: '',
      location: '서울시 양천구 목동',
      memberCount: 1,
      maxMember: 10,
      isPublic: true,
      memberList: [
        {
          userId: 9,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
        {
          userId: 1,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
        {
          userId: 2,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
        {
          userId: 3,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
        {
          userId: 4,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
      ],
    },
  ];
  const searchParams = useSearchParams(); // 서버 컴포넌트로 변경되면 리펙토링.
  const meetingType = searchParams.get('type');
  console.log('meetingType: ', meetingType);
  return (
    <div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-[24px]">
          <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
            나의 모임
          </h3>
          <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
            찜한 모임
          </h3>
          <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
            나의 리뷰
          </h3>
        </div>
        <div className="flex gap-2">
          <Button className="w-fit px-4">내가 만든 모임</Button>
          <Button className="w-fit px-4" variant="default">
            내가 참여하고 있는 모임
          </Button>
        </div>
      </div>
      <div>
        {meetings.map((meeting) => {
          return (
            <>
              {/* 데스크탑 */}
              <div className="hidden lg:flex">
                <HorizonCard
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  className="flex-row"
                >
                  <CardRightSection
                    memberList={meeting.memberList}
                    isPublic={meeting.isPublic}
                    className="hidden lg:flex"
                  />
                </HorizonCard>
              </div>

              {/* 태블릿 */}
              <div className="hidden flex-col md:flex lg:hidden">
                <HorizonCard
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  thumbnailHeight={160}
                  thumbnailWidth={160}
                  className=""
                />
                <CardRightSection
                  memberList={meeting.memberList}
                  isPublic={meeting.isPublic}
                  className="flex lg:hidden"
                />
              </div>

              {/* 모바일 */}
              <div className="flex flex-col md:hidden">
                <HorizonCard
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  thumbnailHeight={80}
                  thumbnailWidth={80}
                  className=""
                />
                <CardRightSection
                  memberList={meeting.memberList}
                  isPublic={meeting.isPublic}
                  className="flex lg:hidden"
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
