'use client';

import { Button } from '@/components/ui/Button';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';

import {
  BUTTON_CENTER,
  BUTTON_WIDE,
  ERROR_STATE,
  FIELD_CONTAINER,
  FORM_CONTAINER,
  INPUT_FIELD_VIEW,
  LABEL_VIEW,
  SECTION_CONTAINER,
} from '../../../../constants/mypage/mypageCss';
import SkeletonContactInfo from './skeletons/SkeletonContactInfo';

interface ContactInfoProps {
  onEnableEdit: () => void;
}

const ContactInfo = ({ onEnableEdit }: ContactInfoProps) => {
  // 프로필 데이터 커스텀 훅 사용
  const { data: profileData, isLoading, error } = useProfileQuery();

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return <SkeletonContactInfo />;
  }

  // 에러 발생 시 에러 메시지 표시
  if (error) {
    return (
      <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
        <p className={ERROR_STATE}>
          연락처 정보를 불러오는 중 오류가 발생했습니다.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </Button>
      </div>
    );
  }

  // 연락처 데이터 추출
  const contactData = profileData?.data?.contactResponse || {
    phone: '',
    kakao: '',
    github: '',
    blog: '',
  };

  return (
    <div className={FORM_CONTAINER}>
      <div className={SECTION_CONTAINER}>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="phone-input" className={LABEL_VIEW}>
            전화번호
          </label>
          <input
            id="phone-input"
            type="text"
            value={contactData.phone}
            readOnly
            className={INPUT_FIELD_VIEW}
          />
        </div>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="kakao-input" className={LABEL_VIEW}>
            카카오톡 ID
          </label>
          <input
            id="kakao-input"
            type="text"
            value={contactData.kakao}
            readOnly
            className={INPUT_FIELD_VIEW}
          />
        </div>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="github-input" className={LABEL_VIEW}>
            깃허브
          </label>
          <input
            id="github-input"
            type="text"
            value={contactData.github}
            readOnly
            className={INPUT_FIELD_VIEW}
          />
        </div>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="blog-input" className={LABEL_VIEW}>
            블로그
          </label>
          <input
            id="blog-input"
            type="text"
            value={contactData.blog}
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
            연락 수단 변경
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
