import Image from 'next/image';
import { Comment } from 'service/api/comment';

import thumbnail from '../../../assets/thumbnail.png';

const ReviewItem = ({ comment }: { comment: Comment }) => {
  console.log('comment: ', comment);
  return (
    <div className="flex flex-col gap-[16px] p-[24px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <Image
            src={thumbnail}
            width={40}
            height={40}
            className="rounded-[9.92px]"
            alt="유저 프로필 이미지"
          />
          <h3 className="typo-head3 text-Cgray800">{comment.userName}</h3>
        </div>
        <p className="text-Cgray500">별점</p>
      </div>
      <div className="h-[100px]">
        <p className="text-Cgray500">{comment.content}</p>
      </div>
      <div className="flex justify-end">
        <p className="typo-body2 text-Cgray500">{comment.createdAt}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
