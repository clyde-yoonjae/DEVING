'use client';

import Some from '@/app/preview/modal/Some';
import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import HorizonCard from '@/components/ui/HorizonCard';
import { Tag } from '@/components/ui/Tag';
import Modal from '@/components/ui/modal/Modal';
import Image from 'next/image';
import { useState } from 'react';

interface Member {
  userId: number;
  profilePic: string;
  name: string;
  memberStatus: 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';
}

const CardRightSection = ({
  memberList,
  isPublic,
}: {
  memberList: Member[];
  isPublic: boolean;
}) => {
  const [selectedFilter, setSelectedFilter] = useState(
    isPublic ? '공개' : '비공개',
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  console.log('memberList: ', memberList);
  const filterAreaOptions = [
    { value: 'true', label: '공개' },
    { value: 'false', label: '비공개' },
  ];
  return (
    <div className="flex w-[518px] gap-[24px]">
      <div className="flex flex-col justify-center gap-[16px]">
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
                  onClick={() => setIsModalOpen(true)}
                >
                  프로필보기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center ">
        <Dropdown
          options={filterAreaOptions}
          trigger={selectedFilter}
          onChange={setSelectedFilter}
          className="w-[120px]"
          contentClassName=""
          variant="icon"
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        showOnly
        modalClassName="h-[590px] w-[520px] overflow-y-auto"
      >
        <Some />
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

  console.log('meetings: ', meetings);
  return (
    <div>
      {/* 카드 리스트 */}
      <div>
        {meetings.map((meeting) => {
          console.log('[map] meeting:', meeting);
          return (
            <HorizonCard
              key={meeting.meetingId}
              title={meeting.title}
              thumbnailUrl={meeting.thumbnail}
              location={meeting.location}
              total={meeting.maxMember}
              value={meeting.memberCount}
              className="flex-col lg:flex-row"
            >
              <CardRightSection
                memberList={meeting.memberList}
                isPublic={meeting.isPublic}
              />
            </HorizonCard>
          );
        })}
      </div>
    </div>
  );
}
