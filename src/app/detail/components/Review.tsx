'use client';

import {
  useCommentsCountQueries,
  useCommentsMeetingQueires,
} from '@/hooks/queries/useCommentQueries';

import ReviewAvg from './ReviewAvg';
import ReviewInput from './ReviewInput';
import ReviewList from './ReviewList';

const Review = () => {
  // Review 가져오기
  const {
    data: count,
    error: countError,
    isLoading: countIsLoading,
  } = useCommentsCountQueries(2);

  const { data: comments, error, isLoading } = useCommentsMeetingQueires(2);

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;
  if (!count) return <div>loading...</div>;
  if (!comments) return <div>loading...</div>;

  console.log('댓글: ', comments);

  return (
    <div className="flex flex-col gap-[48px] px-[48px] py-[16px]">
      <ReviewAvg count={count} />
      <ReviewInput />
      <ReviewList comments={comments.content} />
    </div>
  );
};

export default Review;
