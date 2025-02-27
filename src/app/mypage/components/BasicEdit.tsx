'use client';

import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// 폼 데이터 타입 정의
interface FormData {
  name: string;
  intro: string;
  position: string;
  gender: string;
  age: string;
  location: string;
}

const BasicInfo = () => {
  // 드롭다운 디스플레이를 위한 상태 관리
  const [positionLabel, setPositionLabel] = useState('프론트엔드');
  const [ageLabel, setAgeLabel] = useState('청소년');
  const [locationLabel, setLocationLabel] = useState('서울');

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: '김태양',
      intro:
        '안녕하세요-안녕하세요-안녕하세요-안녕하세요-안녕하세요-안녕하세요-안녕하세요-안녕하세요-',
      position: 'frontend',
      gender: '남자',
      age: '10대',
      location: 'seoul',
    },
  });

  // 현재 폼 값 관찰
  const currentGender = watch('gender');

  // 옵션 데이터
  const positionOptions = [
    { value: 'frontend', label: '프론트엔드' },
    { value: 'backend', label: '백엔드' },
    { value: 'designer', label: '디자이너' },
    { value: 'none', label: '해당없음' },
  ];
  const ageOptions = [
    { value: '10대', label: '청소년' },
    { value: '20대', label: '갓성인' },
    { value: '30대', label: '아저씨' },
    { value: '40대', label: '할아저씨' },
    { value: '50대이상', label: '할아부지' },
  ];
  const locationOptions = [
    { value: 'seoul', label: '서울' },
    { value: 'gyeonggi', label: '경기' },
    { value: 'incheon', label: '인천' },
    { value: 'busan', label: '부산' },
    { value: 'daegu', label: '대구' },
    { value: 'gwangju', label: '광주' },
    { value: 'daejeon', label: '대전' },
    { value: 'ulsan', label: '울산' },
    { value: 'sejong', label: '세종' },
    { value: 'gangwon', label: '강원' },
    { value: 'chungbuk', label: '충북' },
    { value: 'chungnam', label: '충남' },
    { value: 'jeonbuk', label: '전북' },
    { value: 'jeonnam', label: '전남' },
    { value: 'gyeongbuk', label: '경북' },
    { value: 'gyeongnam', label: '경남' },
    { value: 'jeju', label: '제주' },
  ];

  // 폼 제출 처리
  const onSubmit = (data: FormData) => {
    // API 호출 등의 로직을 구현할 수 있음
    console.log('제출 데이터:', data);
  };

  // 드롭다운 값 변경 핸들러
  const handlePositionChange = (value: string) => {
    setValue('position', value);
    const selectedOption = positionOptions.find((opt) => opt.value === value);
    if (selectedOption) setPositionLabel(selectedOption.label);
  };

  const handleAgeChange = (value: string) => {
    setValue('age', value);
    const selectedOption = ageOptions.find((opt) => opt.value === value);
    if (selectedOption) setAgeLabel(selectedOption.label);
  };

  const handleLocationChange = (value: string) => {
    setValue('location', value);
    const selectedOption = locationOptions.find((opt) => opt.value === value);
    if (selectedOption) setLocationLabel(selectedOption.label);
  };

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
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="typo-head3 text-main">포지션</label>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <Dropdown
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
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="typo-head3 text-main">성별</label>
          <div className="typo-head3 flex w-64 rounded-md border bg-white">
            {['남자', '여자'].map((option) => (
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
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="typo-head3 text-main">연령대</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <Dropdown
                options={ageOptions}
                onChange={handleAgeChange}
                trigger={ageLabel}
                variant="icon"
                className="w-full"
                sideOffset={6}
              />
            )}
          />
        </div>

        {/* 지역 드롭다운 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[32px]">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="typo-head3 text-main">지역</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Dropdown
                options={locationOptions}
                onChange={handleLocationChange}
                trigger={locationLabel}
                variant="icon"
                className="w-full"
                sideOffset={6}
              />
            )}
          />
        </div>

        {/* 제출 버튼 */}
        <div>
          <Button
            type="submit"
            className="w-[280px] select-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '변경사항 저장'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BasicInfo;
