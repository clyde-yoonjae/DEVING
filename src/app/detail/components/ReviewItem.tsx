import Image from 'next/image';

import thumbnail from '../../../assets/thumbnail.png';

const ReviewItem = ({ item }: { item: number }) => {
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
          <h3 className="typo-head3 text-Cgray800">작성자 이름</h3>
        </div>
        <p className="text-Cgray500">별점{item}</p>
      </div>
      <div className="h-[100px]">
        <p className="text-Cgray500">
          생각해 봤는데 우리 너무 가끔 만나는 것 같아서 서운할 때도 있어요
          앞으로 좀 더 자주만나요생각해 봤는데 우리 너무 가끔 만나는 것 같아서
          서운할 때도 있어요 앞으로 좀 더 자주만나요생각해 봤는데 우리 너무 가끔
          만나는 것 같아서 서운할 때도 있서운할 때도 있각해 봤는데 우리 너무
          가끔 만나는 것 같아서 서운할 때도 있서운할 때도 있각해 봤는데 우리
          너무 가끔 만나는 것 같아서 서운할 때도 있서운할 때도 있각해 봤는데
          우리 너무 가끔 만나는 것 같아서 서운할 때도 있서운할 때도 있
        </p>
      </div>
      <div className="flex justify-end">
        <p className="typo-body2 text-Cgray500">6일 전</p>
      </div>
    </div>
  );
};

export default ReviewItem;
