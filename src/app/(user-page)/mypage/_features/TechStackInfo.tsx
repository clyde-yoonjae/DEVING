import { Button } from '@/components/ui/Button';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';
import { getIconColor, getIconComponent } from '@/util/getIconDetail';
import React from 'react';

import {
  BUTTON_CENTER,
  BUTTON_WIDE,
  EMPTY_STATE,
  LABEL_VIEW,
  TECH_CONTAINER,
  TECH_HEADER,
  TECH_LIST,
  TECH_TAG,
  TECH_TAG_TEXT,
} from '../../../../constants/mypage/mypageCss';
import SkeletonTechStackInfo from './skeletons/SkeletonTechStackInfo';

interface TechStackInfoProps {
  onEnableEdit: () => void;
}

const TechStackInfo = ({ onEnableEdit }: TechStackInfoProps) => {
  // 커스텀 훅을 사용하여 프로필 데이터 가져오기
  const { data: profileData, isLoading } = useProfileQuery();

  // 사용자 스킬 데이터 (안전하게 기본값 지정)
  const userSkills = profileData?.data?.skillArray || [];

  if (isLoading) {
    return <SkeletonTechStackInfo />;
  }

  return (
    <div className={TECH_CONTAINER}>
      <div className={TECH_HEADER}>
        <div className={LABEL_VIEW}>기술 스택</div>
      </div>

      {userSkills.length > 0 ? (
        <div className={TECH_LIST}>
          {userSkills.map((skill) => {
            const color = getIconColor(skill);
            const Icon = getIconComponent(skill);
            return (
              <div key={skill} className={TECH_TAG}>
                <span className="flex-shrink-0">
                  <Icon size={20} color={color} />
                </span>
                <span style={{ color }} className={TECH_TAG_TEXT}>
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={EMPTY_STATE}>등록된 기술 스택이 없습니다.</p>
      )}
      <div className={BUTTON_CENTER + ' pt-[32px]'}>
        <Button
          variant="outline"
          className={BUTTON_WIDE}
          onClick={onEnableEdit}
        >
          기술스택 변경
        </Button>
      </div>
    </div>
  );
};

export default TechStackInfo;
