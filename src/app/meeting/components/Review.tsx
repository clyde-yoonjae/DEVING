'use client';

import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';
import {
  useCommentsCountQueries,
  useCommentsMeetingQueires,
} from '@/hooks/queries/useCommentQueries';

import ReviewInput from './ReviewInput';
import ReviewList from './ReviewList';

const Review = ({ meetingId }: { meetingId: number }) => {
  const {
    data: count,
    error: countError,
    isLoading: countIsLoading,
  } = useCommentsCountQueries(meetingId);

  const {
    data: comments,
    error,
    isLoading,
  } = useCommentsMeetingQueires(meetingId);

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;
  if (!count) return <div>loading...</div>;
  if (!comments) return <div>loading...</div>;

  console.log('댓글: ', comments);

  return (
    <div className="flex flex-col gap-[48px] px-[48px] py-[16px]">
      <div className="mb-[-24px] flex items-center gap-[8px]">
        <div className="h-[14px] w-[2px] bg-Cgray700" />
        <h3 className="typo-head3 text-Cgray700">리뷰</h3>
      </div>
      <ReviewAvgCard count={count} />
      <ReviewInput meetingId={meetingId} />
      <ReviewList comments={comments.content} />
    </div>
  );
};

export default Review;
