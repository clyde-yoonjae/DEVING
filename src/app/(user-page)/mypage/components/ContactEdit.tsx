'use client';

import { Button } from '@/components/ui/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  getProfile,
  updateContactInfo,
} from '../../../../service/api/mypageProfile';
import { IContactInfoUpdateRequest } from '../../../../types/mypageTypes';

// 폼 데이터 타입 정의
interface FormData {
  phone: string;
  kakao: string;
  github: string;
  blog: string;
}

interface ContactEditProps {
  onEditComplete: () => void;
}

const ContactEdit = ({ onEditComplete }: ContactEditProps) => {
  // QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      phone: '',
      kakao: '',
      github: '',
      blog: '',
    },
  });

  // 프로필 데이터 가져오기
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  // 프로필 업데이트 뮤테이션
  const updateContactMutation = useMutation({
    mutationFn: (data: IContactInfoUpdateRequest) => updateContactInfo(data),
    onSuccess: () => {
      // 프로필 데이터 캐시 무효화하고 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      // 편집 모드 종료
      onEditComplete();
    },
  });

  // 프로필 데이터로 폼 초기화
  useEffect(() => {
    if (profileData?.data?.contactResponse) {
      const contactData = profileData.data.contactResponse;

      // 폼 값 설정
      reset({
        phone: contactData.phone || '',
        kakao: contactData.kakao || '',
        github: contactData.github || '',
        blog: contactData.blog || '',
      });
    }
  }, [profileData, reset]);

  // 폼 제출 처리
  const onSubmit = (data: FormData) => {
    updateContactMutation.mutate(data);
  };

  // 취소 핸들러
  const handleCancel = () => {
    onEditComplete();
  };

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return <div className="p-4 text-center">데이터를 불러오는 중...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]"
    >
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="phone" className="typo-head3 text-main">
            전화번호
          </label>
          <input
            id="phone"
            type="text"
            {...register('phone')}
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="kakao" className="typo-head3 text-main">
            카카오톡 ID
          </label>
          <input
            id="kakao"
            type="text"
            {...register('kakao')}
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="github" className="typo-head3 text-main">
            깃허브
          </label>
          <input
            id="github"
            type="text"
            {...register('github')}
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="blog" className="typo-head3 text-main">
            블로그
          </label>
          <input
            id="blog"
            type="text"
            {...register('blog')}
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>

        {updateContactMutation.isError && (
          <div className="text-red-500 text-sm">
            연락처 정보를 업데이트하는 중 오류가 발생했습니다.
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-[40px] w-[140px] md:h-[46px]"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            type="submit"
            className="h-[40px] w-[140px] select-none md:h-[46px]"
            disabled={isSubmitting || updateContactMutation.isPending}
          >
            {updateContactMutation.isPending ? '저장 중...' : '변경사항 저장'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactEdit;
