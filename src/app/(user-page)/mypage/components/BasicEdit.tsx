'use client';

import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import {
  getProfile,
  updateProfile,
} from '../../../../service/api/mypageProfile';
import {
  IFormData,
  IProfileUpdateRequest,
} from '../../../../types/mypageTypes';

interface BasicEditProps {
  onEditComplete: () => void;
}

const BasicEdit = ({ onEditComplete }: BasicEditProps) => {
  // QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  // 드롭다운 디스플레이를 위한 상태 관리
  const [positionLabel, setPositionLabel] = useState('프론트엔드');
  const [ageLabel, setAgeLabel] = useState('청소년');
  const [locationLabel, setLocationLabel] = useState('서울');

  // 프로필 데이터 가져오기
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>({
    defaultValues: {
      name: '',
      intro: '',
      position: '',
      gender: '',
      age: '',
      location: '',
    },
  });

  // 프로필 업데이트 뮤테이션
  const updateProfileMutation = useMutation({
    mutationFn: (data: IProfileUpdateRequest) => updateProfile(data),
    onSuccess: () => {
      // 프로필 데이터 캐시 무효화하고 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      // 편집 모드 종료
      onEditComplete();
    },
  });

  // 현재 폼 값 관찰
  const currentGender = useWatch({
    control,
    name: 'gender',
  });

  // 옵션 데이터 - useMemo로 메모이제이션
  const positionOptions = useMemo(
    () => [
      { value: '프론트엔드', label: '프론트엔드' },
      { value: '백엔드', label: '백엔드' },
      { value: '디자이너', label: '디자이너' },
      { value: '선택안함', label: '선택안함' },
    ],
    [],
  );

  const ageOptions = useMemo(
    () => [
      { value: '10대', label: '10대' },
      { value: '20대', label: '20대' },
      { value: '30대', label: '30대' },
      { value: '40대', label: '40대' },
      { value: '50대이상', label: '50대이상' },
      { value: '선택안함', label: '선택안함' },
    ],
    [],
  );

  const locationOptions = useMemo(
    () => [
      { value: '서울', label: '서울' },
      { value: '경기', label: '경기' },
      { value: '인천', label: '인천' },
      { value: '부산', label: '부산' },
      { value: '대구', label: '대구' },
      { value: '광주', label: '광주' },
      { value: '대전', label: '대전' },
      { value: '울산', label: '울산' },
      { value: '세종', label: '세종' },
      { value: '강원', label: '강원' },
      { value: '충북', label: '충북' },
      { value: '충남', label: '충남' },
      { value: '전북', label: '전북' },
      { value: '전남', label: '전남' },
      { value: '경북', label: '경북' },
      { value: '경남', label: '경남' },
      { value: '제주', label: '제주' },
      { value: '선택안함', label: '선택안함' },
    ],
    [],
  );

  // 프로필 데이터로 폼 초기화
  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data;

      // 폼 값 설정
      reset({
        name: profile.name || '',
        intro: profile.intro || '',
        position: profile.position || '',
        gender: profile.gender || '남자',
        age: profile.age || '',
        location: profile.location || '',
      });

      // 드롭다운 라벨 초기 설정 - 한 번만 실행되도록 함
      const positionOption = positionOptions.find(
        (opt) => opt.value === profile.position,
      );
      if (positionOption) setPositionLabel(positionOption.label);

      const ageOption = ageOptions.find((opt) => opt.value === profile.age);
      if (ageOption) setAgeLabel(ageOption.label);

      const locationOption = locationOptions.find(
        (opt) => opt.value === profile.location,
      );
      if (locationOption) setLocationLabel(locationOption.label);
    }
  }, [profileData, reset]);

  // 폼 제출 처리
  const onSubmit = (data: IFormData) => {
    updateProfileMutation.mutate(data);
  };

  // 드롭다운 값 변경 핸들러 - useCallback으로 메모이제이션
  const handlePositionChange = useCallback(
    (value: string) => {
      setValue('position', value);
      const selectedOption = positionOptions.find((opt) => opt.value === value);
      if (selectedOption) setPositionLabel(selectedOption.label);
    },
    [setValue, positionOptions],
  );

  const handleAgeChange = useCallback(
    (value: string) => {
      setValue('age', value);
      const selectedOption = ageOptions.find((opt) => opt.value === value);
      if (selectedOption) setAgeLabel(selectedOption.label);
    },
    [setValue, ageOptions],
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      setValue('location', value);
      const selectedOption = locationOptions.find((opt) => opt.value === value);
      if (selectedOption) setLocationLabel(selectedOption.label);
    },
    [setValue, locationOptions],
  );

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
      className="w-full rounded-[16px] border border-Cgray300 p-[32px]"
    >
      <div className="flex flex-col gap-[32px]">
        {/* 이름 입력 필드 */}
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="name-input" className="typo-head3 text-main">
            사용자 이름
          </label>
          <input
            id="name-input"
            type="text"
            {...register('name', { required: true })}
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">이름을 입력해주세요</span>
          )}
        </div>

        {/* 자기소개 텍스트 영역 */}
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="intro-input" className="typo-head3 text-main">
            자기소개
          </label>
          <textarea
            id="intro-input"
            {...register('intro')}
            rows={3}
            className="h-[140px] resize-none rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>

        {/* 포지션 드롭다운 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[32px]">
          <div className="typo-head3 text-main">포지션</div>
          <Controller
            name="position"
            control={control}
            render={() => (
              <Dropdown
                aria-label="포지션"
                options={positionOptions}
                onChange={handlePositionChange}
                trigger={positionLabel}
                variant="icon"
                className="w-full"
                sideOffset={6}
              />
            )}
          />
        </div>

        {/* 성별 토글 버튼 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[32px]">
          <div className="typo-head3 text-main">성별</div>
          <div className="typo-head3 flex w-64 rounded-md border bg-white">
            {['남자', '여자', '비공개'].map((option) => (
              <button
                key={option}
                type="button"
                className={`flex-1 rounded-md px-4 py-2 transition-colors duration-200 ${
                  currentGender === option
                    ? 'bg-main font-medium text-white'
                    : 'bg-white'
                }`}
                onClick={() => setValue('gender', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 연령대 드롭다운 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[32px]">
          <div className="typo-head3 text-main">연령대</div>
          <Controller
            name="age"
            control={control}
            render={() => (
              <Dropdown
                aria-label="연령대"
                options={ageOptions}
                onChange={handleAgeChange}
                trigger={ageLabel}
                variant="icon"
                className="max-h-[200px] w-full"
                sideOffset={6}
              />
            )}
          />
        </div>

        {/* 지역 드롭다운 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[32px]">
          <div className="typo-head3 text-main">지역</div>
          <Controller
            name="location"
            control={control}
            render={() => (
              <Dropdown
                aria-label="지역"
                options={locationOptions}
                onChange={handleLocationChange}
                trigger={locationLabel}
                variant="icon"
                className="w-full"
                sideOffset={6}
                contentClassName="max-h-[200px] overflow-y-auto"
              />
            )}
          />
        </div>

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
            disabled={isSubmitting || updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? '저장 중...' : '변경사항 저장'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BasicEdit;
