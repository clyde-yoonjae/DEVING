'use client';

import RatingStarsEdit from '@/components/common/review/RatingStarsEdit';
import { Button } from '@/components/ui/Button';
import { useCommentMutation } from '@/hooks/mutations/useCommentMutation';
import { useState } from 'react';

const ReviewInput = ({ meetingId }: { meetingId: number }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [review, setReview] = useState('');

  const { mutate } = useCommentMutation();

  const handleSubmit = () => {
    const req = {
      score: selectedRating,
      content: review,
    };
    mutate({ meetingId, req });

    // 초기화
    setSelectedRating(0);
    setReview('');
  };

  return (
    <div className="rounded-[24px] border border-Cgray300 px-[24px] py-[32px]">
      <h3 className="typo-head3 text-Cgray800">리뷰 작성</h3>
      <RatingStarsEdit
        rating={Number(0)}
        size={24}
        className="mb-[16px] mt-[24px]"
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      <div className="flex h-[100px] gap-[16px]">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="typo-button1 h-full flex-1 resize-none rounded-[12px] bg-Cgray200 px-[16px] py-[14px] text-Cgray500 placeholder:text-Cgray400"
          placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
        />
        <Button className="h-full w-[88px]" onClick={handleSubmit}>
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default ReviewInput;
