'use client';

import { ReactNode, useState } from 'react';

import BasicEdit from './components/BasicEdit';
import BasicInfo from './components/BasicInfo';
import ContactEdit from './components/ContactEdit';
import ContactInfo from './components/ContactInfo';
import PasswordEdit from './components/PasswordEdit';
import PasswordInfo from './components/PasswordInfo';
import TechStackEdit from './components/TechStackEdit';
import TechStackInfo from './components/TechStackInfo';

// 섹션 타입 정의 - Added 'tech' type
type SectionType = 'basic' | 'password' | 'contact' | 'tech';

// 모듈형 섹션 컴포넌트 타입 정의
interface SectionProps {
  type: SectionType;
  withTransition?: boolean;
}

// 공통 섹션 컴포넌트
const ProfileSection = ({ type, withTransition = true }: SectionProps) => {
  // 편집 모드 상태
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // 정보 보기 모드에서 편집 모드로 전환
  const handleEnableEdit = (): void => {
    setIsEditMode(true);
  };

  // 편집 모드에서 정보 보기 모드로 전환 (편집 완료 후)
  const handleEditComplete = (): void => {
    setIsEditMode(false);
  };

  // 타입에 따른 컴포넌트 결정
  const renderContent = (): ReactNode => {
    if (isEditMode) {
      switch (type) {
        case 'basic':
          return <BasicEdit onEditComplete={handleEditComplete} />;
        case 'password':
          return <PasswordEdit onEditComplete={handleEditComplete} />;
        case 'contact':
          return <ContactEdit onEditComplete={handleEditComplete} />;
        case 'tech':
          return <TechStackEdit onEditComplete={handleEditComplete} />;
      }
    } else {
      switch (type) {
        case 'basic':
          return <BasicInfo onEnableEdit={handleEnableEdit} />;
        case 'password':
          return <PasswordInfo onEnableEdit={handleEnableEdit} />;
        case 'contact':
          return <ContactInfo onEnableEdit={handleEnableEdit} />;
        case 'tech':
          return <TechStackInfo onEnableEdit={handleEnableEdit} />;
      }
    }
  };

  // 트랜지션 효과 적용 여부에 따른 렌더링
  return withTransition ? (
    <div className="transition-opacity duration-300">{renderContent()}</div>
  ) : (
    renderContent()
  );
};

// 각 섹션에 대한 배포용 컴포넌트
export const BasicSection = () => <ProfileSection type="basic" />;
export const PasswordSection = () => <ProfileSection type="password" />;
export const ContactSection = () => <ProfileSection type="contact" />;
export const TechSection = () => <ProfileSection type="tech" />;

// 기본 내보내기 (모든 섹션을 관리하는 상위 컴포넌트)
const ProfilePage = () => {
  return (
    <div className="profile-manager flex flex-col gap-[56px]">
      <BasicSection />
      <ContactSection />
      <TechSection />
      <PasswordSection />
    </div>
  );
};

export default ProfilePage;
