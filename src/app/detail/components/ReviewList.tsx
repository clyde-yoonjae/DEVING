import { Comment } from 'service/api/comment';

import ReviewItem from './ReviewItem';

const ReviewList = ({ comments }: { comments: Comment[] }) => {
  console.log('comments: ', comments);
  return (
    <div className="flex flex-col gap-[8px]">
      {comments?.map((comment) => (
        <div key={comment.commentId}>
          <ReviewItem comment={comment} />
          <div className="mx-[24px] h-[1px] bg-Cgray300" />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
