import Description from '@/components/common/Description';

import SkeletonBasic from '../../../components/ui/SkeletonBasic';

const SkeletonProfile = () => {
  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <SkeletonBasic className="h-[80px] w-[80px] rounded-[16px]" />
        <SkeletonBasic />
        <div className="flex flex-col gap-[12px]">
          <h3 className="typo-head3 text-Cgray800">{}</h3>
          <p className="typo-body1 text-Cgray700">{}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-2 pl-2">
          <Description label="Email">
            <SkeletonBasic />
          </Description>
          <Description label="연락처">
            <SkeletonBasic className="w-[120px]" />
          </Description>
          <Description label="연락처2">
            <SkeletonBasic className="w-[150px]" />
          </Description>
          <Description label="연락처3">
            <SkeletonBasic className="w-[90px]" />
          </Description>
        </div>
        <div className="flex flex-col gap-2 pl-2">
          <Description label="포지션">
            <SkeletonBasic />
          </Description>
          <Description label="기술스택">
            <SkeletonBasic className="h-[54px] w-[284px]" />
          </Description>
        </div>
        <div className="flex flex-col gap-2 pl-2">
          <Description label="성별">
            <SkeletonBasic />
          </Description>
          <Description label="연령대">
            <SkeletonBasic />
          </Description>
          <Description label="지역">
            <SkeletonBasic />
          </Description>
        </div>
        <div className="pl-2">
          <Description label="인삿말">
            <SkeletonBasic className="w-[200px]" />
          </Description>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
