import SkeletonBasic from '@/components/ui/SkeletonBasic';

const MeetingListSkeleton = () => {
  const skeletonCount = [1, 2, 3];

  return (
    <div>
      {skeletonCount.map((_, idx) => (
        <div key={idx}>
          <SkeletonBasic key={idx} className="my-[42px] h-[238px] w-full" />
          <div className="h-[1px] bg-Cgray300" />
        </div>
      ))}
    </div>
  );
};

export default MeetingListSkeleton;
