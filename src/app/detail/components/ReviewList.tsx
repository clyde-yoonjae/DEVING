import ReviewItem from './ReviewItem';

const ReviewList = () => {
  const list = [1, 2, 3, 4, 5]; // 추후 변경
  return (
    <div className="flex flex-col gap-[8px]">
      {list.map((item) => (
        <>
          <ReviewItem item={item} />
          <div className="mx-[24px] h-[1px] bg-Cgray300" />
        </>
      ))}
    </div>
  );
};

export default ReviewList;
