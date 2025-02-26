import SkeletonBasic from '../../../../components/ui/SkeletonBasic';

const SkeletonMeetingTotalInfo = () => {
  return (
    <div className="flex w-full flex-col p-[16px]">
      <div className="relative flex h-[240px] w-full flex-shrink-0 flex-row gap-[40px] bg-BG p-4">
        <SkeletonBasic className="h-[208px] flex-1" />
        <SkeletonBasic className="h-[208px] w-[318px]" />
      </div>
    </div>
  );
};

export default SkeletonMeetingTotalInfo;
