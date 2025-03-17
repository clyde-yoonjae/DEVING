import HorizonCard from '@/components/ui/HorizonCard';
import { useInfiniteMyMeetingPendingQueries } from '@/hooks/queries/useMyMeetingQueries';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IMyMeetingPending } from 'types/myMeeting';

import PendingStatusChip from './PendingStatusChip';
import MeetingListSkeleton from './skeletons/SkeletonMeetingList';

const PendingSection = () => {
  const router = useRouter();
  const [visiblePages, setVisiblePages] = useState(1);

  const {
    data: pendingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteMyMeetingPendingQueries();

  const getMeetingDetailUrl = (meeting: IMyMeetingPending) =>
    `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}`;

  const handleCardClick = (meeting: IMyMeetingPending) => {
    router.push(getMeetingDetailUrl(meeting));
  };

  // 더 보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage().then(() => {
        setVisiblePages((prev) => prev + 1);
      });
    }
  };

  if (isLoading) {
    return <MeetingListSkeleton />;
  }

  if (!pendingData || pendingData.pages[0].content.length === 0) {
    return null;
  }

  // 현재 표시할 페이지만 필터링
  const visibleData = pendingData.pages.slice(0, visiblePages);

  return (
    <div className="mb-12 mt-12">
      {/* 스크롤 컨테이너 */}
      <div
        className="custom-scrollbar flex overflow-x-auto pb-4"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#3853EA #30333E',
        }}
      >
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 62px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #30333e;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #3853ea;
            border-radius: 4px;
          }
        `}</style>
        {visibleData.map((page, pageIdx) => (
          <div key={pageIdx} className="flex space-x-4">
            {page.content.map((meeting) => (
              <div
                key={meeting.meetingId}
                className="relative min-w-[320px] lg:min-w-[500px]"
              >
                <HorizonCard
                  onClick={() => handleCardClick(meeting)}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  className="flex-row"
                  meetingId={meeting.meetingId}
                  showLikeButton={false}
                  category={''}
                  thumbnailWidth={160}
                  thumbnailHeight={160}
                ></HorizonCard>
                <PendingStatusChip meetingId={meeting.meetingId} />
              </div>
            ))}
          </div>
        ))}

        {/* 더 보기 버튼 */}
        {hasNextPage && (
          <div className="ml-2 flex items-center justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              className={`flex min-h-[100px] min-w-[44px] items-center justify-center rounded-lg border border-Cgray300 bg-main p-2 transition-colors ${
                isFetchingNextPage
                  ? 'cursor-not-allowed opacity-70'
                  : 'hover:bg-Cgray100'
              }`}
              aria-label="더 많은 대기중인 모임 보기"
            >
              {isFetchingNextPage ? (
                <span className="animate-pulse text-white">로딩중...</span>
              ) : (
                <ChevronRight className="text-white" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* 추가 데이터 로딩 중 표시 (버튼 외에 추가적인 로딩 표시가 필요한 경우) */}
      {isFetchingNextPage && !hasNextPage && (
        <div className="mt-4">
          <MeetingListSkeleton />
        </div>
      )}
    </div>
  );
};

export default PendingSection;
