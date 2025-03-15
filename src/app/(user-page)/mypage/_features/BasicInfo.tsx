import { Button } from '@/components/ui/Button';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';

import {
  BUTTON_CENTER,
  BUTTON_WIDE,
  ERROR_STATE,
  FIELD_CONTAINER,
  FORM_CONTAINER_SM,
  INPUT_FIELD_VIEW,
  LABEL_VIEW,
  SECTION_CONTAINER,
  TEXTAREA_FIELD_VIEW,
} from '../../../../constants/mypage/mypageCss';
import SkeletonBasicInfo from './skeletons/SkeletonBasicInfo';

interface BasicInfoProps {
  onEnableEdit: () => void;
}

const BasicInfo = ({ onEnableEdit }: BasicInfoProps) => {
  // Use the custom hook instead of direct useQuery
  const { data, isLoading, error } = useProfileQuery();

  // 사용자 데이터 포맷팅
  const userData = {
    name: data?.data?.name || '',
    intro: data?.data?.intro || '',
    position: data?.data?.position || '',
    gender: data?.data?.gender || '',
    age: data?.data?.age || '',
    location: data?.data?.location || '',
  };

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return <SkeletonBasicInfo />;
  }

  // 오류가 발생하면 오류 메시지 표시
  if (error) {
    return <div className={ERROR_STATE}>데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className={FORM_CONTAINER_SM}>
      <div className={SECTION_CONTAINER}>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="name-input" className={LABEL_VIEW}>
            이름
          </label>
          <input
            id="name-input"
            type="text"
            value={userData.name}
            readOnly
            className={INPUT_FIELD_VIEW}
          />
        </div>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="intro-input" className={LABEL_VIEW}>
            소개글
          </label>
          <textarea
            id="intro-input"
            rows={3}
            value={userData.intro}
            readOnly
            className={TEXTAREA_FIELD_VIEW}
          />
        </div>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="position-input" className={LABEL_VIEW}>
            포지션
          </label>
          <input
            id="position-input"
            type="text"
            value={userData.position}
            readOnly
            className={INPUT_FIELD_VIEW}
          />
        </div>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="gender-input" className={LABEL_VIEW}>
            성별
          </label>
          <input
            id="gender-input"
            type="text"
            value={userData.gender}
            readOnly
            className={INPUT_FIELD_VIEW}
          />
        </div>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="age-input" className={LABEL_VIEW}>
            연령대
          </label>
          <input
            id="age-input"
            type="text"
            value={userData.age}
            readOnly
            className={INPUT_FIELD_VIEW}
          />
        </div>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="area-input" className={LABEL_VIEW}>
            지역
          </label>
          <input
            id="area-input"
            type="text"
            value={userData.location}
            readOnly
            className={INPUT_FIELD_VIEW}
          />
        </div>
        <div className={BUTTON_CENTER}>
          <Button
            variant="outline"
            className={BUTTON_WIDE}
            onClick={onEnableEdit}
          >
            사용자 정보 변경
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
