'use client';

import ReviewItem from '@/app/meeting/_features/ReviewItem';
import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import {
  MY_COMMENT_KEY,
  useInfiniteWrittenMyCommentQueries,
} from '@/hooks/queries/useMyCommentQueries';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MyComment } from 'types/myComment';

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

  const allComments: MyComment[] =
    commentData?.pages.flatMap((page) => page.content) || [];

  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  if (error) {
    <div className="bg-main text-white">
      에러가 발생했습니다. <hr />
      다시 시도해주세요.
    </div>;
  }

  if (isLoading) {
    return <MeetingListSkeleton />;
  }

  const handleMoveDetailPage = (meetingId: number, category: string) => {
    const categoryEng = translateCategoryNameToEng(category);
    router.push(`/meeting/${categoryEng}/${meetingId}`);
  };

  return (
    <div>
      <div>
        {allComments.map((comment) => (
          <div key={comment.meetingId}>
            {/* 데스크탑 */}
            <div className="hidden border-b border-Cgray300 py-[42px] lg:flex">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(comment.meetingId, comment.categoryTitle)
                }
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
              <ReviewItem comment={comment} isMine={true}></ReviewItem>
            </div>

            {/* 태블릿 */}
            <div className="hidden flex-col border-b border-Cgray300 py-[42px] md:flex lg:hidden">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(comment.meetingId, comment.categoryTitle)
                }
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
              <ReviewItem comment={comment} isMine={true}></ReviewItem>
            </div>

            {/* 모바일 */}
            <div className="flex flex-col border-b border-Cgray300 py-[42px] md:hidden">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(comment.meetingId, comment.categoryTitle)
                }
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
              <ReviewItem comment={comment} isMine={true}></ReviewItem>
            </div>
          </div>
        ))}

        {/* 무한 스크롤을 위한 별도의 Observer 요소 */}
        {hasNextPage && (
          <div
            ref={lastMeetingRef}
            className="h-20 w-full"
            id="infinite-scroll-trigger"
          />
        )}
      </div>
    </div>
  );
};
export default Written;
