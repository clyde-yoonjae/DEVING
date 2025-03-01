'use client';

import { Button } from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../../../../service/api/mypageProfile';

interface ContactInfoProps {
  onEnableEdit: () => void;
}

const ContactInfo = ({ onEnableEdit }: ContactInfoProps) => {
  // 프로필 데이터 가져오기
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return (
      <div className="mb-6 flex w-full items-center justify-center rounded-[16px] border border-Cgray300 p-[32px]">
        <p className="text-Cgray700">데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 에러 발생 시 에러 메시지 표시
  if (error) {
    return (
      <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
        <p className="text-red-500">
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
    <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="phone-input" className="typo-head3 text-Cgray700">
            전화번호
          </label>
          <input
            id="phone-input"
            type="text"
            value={contactData.phone}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="kakao-input" className="typo-head3 text-Cgray700">
            카카오톡 ID
          </label>
          <input
            id="kakao-input"
            type="text"
            value={contactData.kakao}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="github-input" className="typo-head3 text-Cgray700">
            깃허브
          </label>
          <input
            id="github-input"
            type="text"
            value={contactData.github}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="blog-input" className="typo-head3 text-Cgray700">
            블로그
          </label>
          <input
            id="blog-input"
            type="text"
            value={contactData.blog}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex justify-center md:justify-start">
          <Button
            variant="outline"
            className="h-[40px] w-[295px] md:h-[46px] md:w-[280px]"
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
