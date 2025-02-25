'use client';

import Profile from '@/assets/icon/profile.svg';
import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import HorizonCard from '@/components/ui/HorizonCard';
import { SearchInput } from '@/components/ui/SearchInput';
import VerticalCard from '@/components/ui/VerticalCard';
import { useState } from 'react';

const filterOptions = [
  {
    value: 'latest',
    label: '최신순',
    onSelect: () => {
      console.log('최신순 정렬');
    },
  },
  {
    value: 'oldest',
    label: '오래된순',
    onSelect: () => {
      console.log('오래된순 정렬');
    },
  },
  {
    value: 'like',
    label: '좋아요순',
    onSelect: () => {
      console.log('좋아요순 정렬');
    },
  },
];

const meetingDummyData = [
  {
    meetingId: 1,
    title: 'JavaScript Study Group',
    thumbnail:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
    location:
      'Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul ',
    memberCount: 5,
    maxMember: 10,
    isLike: true,
  },
  {
    meetingId: 2,
    title: 'React Dev Meetup',
    thumbnail:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
    location: 'Busan',
    memberCount: 8,
    maxMember: 15,
    isLike: false,
  },
  {
    meetingId: 3,
    title: 'Next.js Workshop',
    thumbnail:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
    location: 'Incheon',
    memberCount: 3,
    maxMember: 8,
    isLike: true,
  },
  {
    meetingId: 4,
    title:
      'Frontend Performance Optimization Frontend Performance Optimization Frontend Performance Optimization ',
    thumbnail: '',
    location: 'Daejeon',
    memberCount: 6,
    maxMember: 12,
    isLike: false,
  },
];

const MeetingList = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="mt-[126px]">
      {/* 기술스택 검색바 */}
      <SearchInput />

      {/* 드롭다운 */}
      <div className="my-4 flex w-full justify-end">
        <Dropdown
          className="w-full md:w-[122px] lg:w-[122px]"
          options={filterOptions}
          onChange={setSelectedFilter}
          trigger="최신순"
          variant="doubleArrow"
          sideOffset={8}
        />
      </div>

      {/* 모임 리스트 웹뷰 */}
      <div className="hidden flex-col md:hidden lg:flex">
        {meetingDummyData.map((meeting) => (
          <HorizonCard
            key={meeting.meetingId}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            total={meeting.maxMember}
            value={meeting.memberCount}
          >
            <div className="mt-5 md:w-[180px] lg:w-[318px]">
              <div className="hidden flex-col md:flex lg:flex lg:flex-row">
                <div className="mr-6 flex w-[147px] flex-col">
                  <div className="typo-head3 text-Cgray500">모임장</div>
                  <div className="typo-head2 mt-1 flex items-center text-Cgray700">
                    <Profile className="mr-2 h-10 w-10" />
                    <span className="text-ellipsi truncate">김밤식김밤식</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="typo-head3 text-Cgray500">모임시작</div>
                  <div className="typo-head1 mt-1 text-Cgray700">D+14</div>
                </div>
              </div>
              <Button className="mt-6 md:h-[40px] md:w-[180px] lg:h-[46px] lg:w-[318px]">
                신청하기
              </Button>
            </div>
          </HorizonCard>
        ))}
      </div>

      {/* 모임 리스트 테블릿뷰 */}
      <div className="hidden flex-col md:flex lg:hidden">
        {meetingDummyData.map((meeting) => (
          <HorizonCard
            className="items-center"
            key={meeting.meetingId}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            thumbnailHeight={160}
            thumbnailWidth={160}
            location={meeting.location}
            isLike={meeting.isLike}
            total={meeting.maxMember}
            value={meeting.memberCount}
          >
            <div className="mt-5 md:w-[180px] lg:w-[318px]">
              <div className="hidden flex-col md:flex lg:flex lg:flex-row">
                <div className="mr-6 flex w-[147px] flex-col">
                  <div className="typo-caption1 text-Cgray500">모임장</div>
                  <div className="typo-button2 mt-1 flex items-center text-Cgray700">
                    <Profile className="mr-2 h-10 w-10" />
                    <span className="text-ellipsi truncate">김밤식김밤식</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="typo-caption1 text-Cgray500">모임시작</div>
                  <div className="typo-button2 mt-1 text-Cgray700">D+14</div>
                </div>
              </div>
              <Button className="typo-button2 mt-[7px] md:h-[40px] md:w-[180px] lg:h-[46px] lg:w-[318px]">
                신청하기
              </Button>
            </div>
          </HorizonCard>
        ))}
      </div>

      {/* 모임 리스트 모바일뷰 */}
      <div className="flex flex-col md:hidden lg:hidden">
        {meetingDummyData.map((meeting) => (
          <VerticalCard
            className="h-[380px]"
            thumbnailHeight={160}
            thumbnailWidth={311}
            key={meeting.meetingId}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            total={meeting.maxMember}
            value={meeting.memberCount}
          >
            <div className="mt-5 md:w-[180px] lg:w-[318px]">
              <div className="hidden flex-col md:flex lg:flex lg:flex-row">
                <div className="mr-6 flex w-[147px] flex-col">
                  <div className="typo-head3 text-Cgray500">모임장</div>
                  <div className="typo-head2 mt-1 flex items-center text-Cgray700">
                    <Profile className="mr-2 h-10 w-10" />
                    <span className="text-ellipsi truncate">김밤식김밤식</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="typo-head3 text-Cgray500">모임시작</div>
                  <div className="typo-head1 mt-1 text-Cgray700">D+14</div>
                </div>
              </div>
              <Button className="mt-6 h-[46px] w-[311px]">신청하기</Button>
            </div>
          </VerticalCard>
        ))}
      </div>
    </div>
  );
};

export default MeetingList;
