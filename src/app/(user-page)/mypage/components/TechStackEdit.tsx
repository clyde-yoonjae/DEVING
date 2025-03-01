'use client';

import useTechSelection from '@/hooks/useTechSelection';
import { getIconColor, getIconsByCategory } from '@/util/getIconDetail';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { CategoryType } from 'types/techStack';

import CategoryTabs from '../../../../components/ui/tech-stack/tech-stack-components/CategoryTabs';
import SelectedTechList from '../../../../components/ui/tech-stack/tech-stack-components/SelectedTechList';
import TechButtonList from '../../../../components/ui/tech-stack/tech-stack-components/TechButtonList';
import {
  getProfile,
  updateSkills,
} from '../../../../service/api/mypageProfile';

interface TechStackEditProps {
  onEditComplete: () => void;
}

const TechStackEdit = ({ onEditComplete }: TechStackEditProps) => {
  const queryClient = useQueryClient();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  // 초기화 여부를 추적하는 플래그
  const [isInitialized, setIsInitialized] = useState(false);

  // 프로필 데이터 쿼리
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  // 기술 선택 로직 훅 사용
  const {
    clickedButtons,
    selectedCount,
    selectedNames,
    handleButtonClick,
    handleReset,
    handleRemoveSelection,
    setInitialSelection,
  } = useTechSelection({
    maxSelections: 5,
  });

  // 초기 스킬 설정 - 단 한 번만 실행되도록 개선
  useEffect(() => {
    if (!isInitialized && !isLoading && profileData?.data?.skillArray) {
      const skillArray = profileData.data.skillArray;
      if (skillArray.length > 0) {
        setInitialSelection(skillArray);
      }
      setIsInitialized(true); // 초기화 완료 표시
    }
  }, [profileData, isLoading, isInitialized, setInitialSelection]);

  // 기술 스택 업데이트 뮤테이션
  const updateSkillsMutation = useMutation({
    mutationFn: updateSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      onEditComplete();
    },
  });

  // 저장 처리
  const handleSave = () => {
    updateSkillsMutation.mutate(selectedNames);
  };

  if (isLoading) {
    return <div className="py-4 text-center">로딩 중...</div>;
  }

  return (
    <div className="rounded-lg border border-Cgray300 bg-Cgray200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="typo-head3 text-Cgray700">기술 스택 편집</h3>
        <span className="text-xs text-Cgray500">
          최대 5개 선택 가능 ({selectedCount}/5)
        </span>
      </div>

      {/* 선택된 기술 목록 */}
      <div className="mb-4">
        <SelectedTechList
          selectedNames={selectedNames}
          getIconColor={getIconColor}
          onRemove={handleRemoveSelection}
        />
      </div>

      {/* 카테고리 탭 */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onReset={handleReset}
      />

      {/* 기술 버튼 목록 */}
      <TechButtonList
        icons={getIconsByCategory(activeCategory)}
        clickedButtons={clickedButtons}
        selectedCount={selectedCount}
        maxSelections={5}
        onButtonClick={handleButtonClick}
      />

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onEditComplete}
          className="rounded-md border border-Cgray300 px-4 py-2 text-Cgray700"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-md bg-main px-4 py-2 text-white"
          disabled={updateSkillsMutation.isPending}
        >
          {updateSkillsMutation.isPending ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
};

export default TechStackEdit;
