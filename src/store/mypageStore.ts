// /store/profileStore.ts
import { create } from 'zustand';

// 섹션 타입 정의
type SectionType =
  | 'view'
  | 'editBasic'
  | 'editContact'
  | 'editPassword'
  | 'editProfileImage';

// 스토어 상태 인터페이스
interface ProfileState {
  // 현재 활성화된 섹션 (보기 모드 또는 수정 모드)
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

// Zustand 스토어 생성
export const useProfileStore = create<ProfileState>((set) => ({
  // 초기 상태
  activeSection: 'view',

  // 활성 섹션 설정
  setActiveSection: (section) => set({ activeSection: section }),
}));
