'use client';

import { Button } from '@/components/ui/Button';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';

import {
  BUTTON_CENTER,
  BUTTON_WIDE,
  FIELD_CONTAINER,
  FORM_CONTAINER,
  LABEL_VIEW,
  SECTION_CONTAINER,
} from '../../../../constants/mypage/mypageCss';
import SkeletonPasswordInfo from './skeletons/SkeletonPasswordInfo';

interface PasswordInfoProps {
  onEnableEdit: () => void;
}

const PasswordInfo = ({ onEnableEdit }: PasswordInfoProps) => {
  // 프로필 데이터를 가져오기 (이메일 등 필요한 정보를 표시하기 위함)
  const { data: profileData, isLoading } = useProfileQuery();

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return <SkeletonPasswordInfo />;
  }

  return (
    <div className={FORM_CONTAINER}>
      <div className={SECTION_CONTAINER}>
        <div className={FIELD_CONTAINER}>
          <div className={LABEL_VIEW}>비밀번호</div>
        </div>

        <div className={BUTTON_CENTER}>
          <Button
            variant="outline"
            className={BUTTON_WIDE}
            onClick={onEnableEdit}
          >
            비밀번호 변경
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordInfo;
