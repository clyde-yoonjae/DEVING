'use client';

import ReviewItem from '@/app/meeting/_features/ReviewItem';
import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteWrittenMyCommentQueries } from '@/hooks/queries/useMyCommentQueries';
import { useRouter } from 'next/navigation';

import MeetingListSkeleton from './skeletons/SkeletonMeetingList';

const Written = () => {
  const router = useRouter();

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteWrittenMyCommentQueries();

  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  console.log('comentData::', commentData);

  if (isLoading || !commentData) {
    return <MeetingListSkeleton />;
  }

  const handleMoveDetailPage = (meetingId: number) => {
    /**
     * TODO
     * 추후 category 수정
     */
    router.push(`/meeting/study/${meetingId}`);
  };

  return (
    <div>
      {commentData.pages.map((page, pageIdx) => (
        <div key={pageIdx}>
          {page.content.map((comment) => (
            <div key={comment.meetingId}>
              {/* 데스크탑 */}
              <div
                className="hidden border-b border-Cgray300 py-[42px] lg:flex"
                ref={
                  page.nextCursor === comment.meetingId ? lastMeetingRef : null
                }
              >
                <HorizonCard
                  onClick={handleMoveDetailPage}
                  key={comment.meetingId}
                  title={comment.meetingTitle}
                  thumbnailUrl={comment.thumbnail}
                  location={comment.location}
                  total={comment.maxMember}
                  value={comment.memberCount}
                  className="flex-row"
                  meetingId={comment.meetingId}
                  category={''}
                ></HorizonCard>
                <ReviewItem comment={comment}></ReviewItem>
              </div>

              {/* 태블릿 */}
              <div
                className="hidden flex-col border-b border-Cgray300 py-[42px] md:flex lg:hidden"
                ref={
                  page.nextCursor === comment.meetingId ? lastMeetingRef : null
                }
              >
                <HorizonCard
                  onClick={handleMoveDetailPage}
                  key={comment.meetingId}
                  title={comment.meetingTitle}
                  thumbnailUrl={comment.thumbnail}
                  location={comment.location}
                  total={comment.maxMember}
                  value={comment.memberCount}
                  thumbnailHeight={160}
                  thumbnailWidth={160}
                  className=""
                  meetingId={comment.meetingId}
                  category={''}
                />
              </div>

              {/* 모바일 */}
              <div
                className="flex flex-col border-b border-Cgray300 py-[42px] md:hidden"
                ref={
                  page.nextCursor === comment.meetingId ? lastMeetingRef : null
                }
              >
                <HorizonCard
                  onClick={handleMoveDetailPage}
                  key={comment.meetingId}
                  title={comment.meetingTitle}
                  thumbnailUrl={comment.thumbnail}
                  location={comment.location}
                  total={comment.maxMember}
                  value={comment.memberCount}
                  thumbnailHeight={80}
                  thumbnailWidth={80}
                  className=""
                  meetingId={comment.meetingId}
                  category={''}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Written;
