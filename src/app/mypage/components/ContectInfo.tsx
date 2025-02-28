'use client';

import { Button } from '@/components/ui/Button';
import { getContactInfo } from '@/lib/axios/profileApi';
import { useEffect, useState } from 'react';

const ContactInfo = () => {
  // 연락 정보 상태
  const [contactData, setContactData] = useState({
    phone: '',
    kakao: '',
    github: '',
    blog: '',
  });

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 연락처 정보 로드
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await getContactInfo();

        // API 응답에서 데이터 설정 (phone만 사용하고 나머지는 빈 값)
        setContactData({
          phone: response.data.phone || '',
          kakao: '',
          github: '',
          blog: '',
        });
      } catch (error) {
        console.error('연락처 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  return (
    <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="phone-input" className="typo-head3 text-Cgray700">
            phone
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
            kakao
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
            github
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
            blog
          </label>
          <input
            id="blog-input"
            type="text"
            value={contactData.blog}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <Button variant="outline">연락수단 변경</Button>
      </div>
    </div>
  );
};

export default ContactInfo;
