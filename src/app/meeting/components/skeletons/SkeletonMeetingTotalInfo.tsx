import SkeletonBasic from '../../../../components/ui/SkeletonBasic';

const SkeletonMeetingTotalInfo = () => {
  return (
    <>
      <div className="mb-[32px] hidden h-[240px] w-full flex-shrink-0 flex-row gap-[40px] p-[32px] lg:flex">
        <SkeletonBasic className="h-[208px] flex-1" />
        <SkeletonBasic className="h-[208px] w-[318px]" />
      </div>
      <div className="hidden w-full flex-shrink-0 flex-col gap-[40px] p-8 md:flex lg:hidden">
        <SkeletonBasic className="h-[252px] w-full" />
        <SkeletonBasic className="h-[133px] w-full" />
      </div>
      <div className="flex w-full flex-shrink-0 flex-col gap-[16px] p-4 md:hidden">
        <SkeletonBasic className="h-[252px] w-full" />
        <SkeletonBasic className="h-[86px] w-full" />
        <SkeletonBasic className="h-[133px] w-full" />
      </div>
    </>
  );
};

export default SkeletonMeetingTotalInfo;
