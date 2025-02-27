// /service/api/mypage.ts
import api from './index';

// 타입 정의
export interface IBasicInfoType {
  name: string;
  intro?: string;
  position: string;
  gender: string;
  age: string;
  location: string;
}

export interface IContactInfoType {
  phone: string | null;
  kakaotalkId: string | null;
  github: string | null;
  blog: string | null;
}

export interface IPasswordChangeType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IProfileImage {
  url: string;
  thumbnailUrl?: string;
}

export interface IUserProfileType {
  basicInfo: IBasicInfoType;
  contactInfo: IContactInfoType;
  profileImage: IProfileImage;
}

// 프로필 정보 가져오기
export const fetchUserProfile = async (): Promise<IUserProfileType> => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('프로필 정보 가져오기 실패:', error);
    throw error;
  }
};

// 기본 정보 업데이트
export const updateBasicInfo = async (
  data: IBasicInfoType,
): Promise<IBasicInfoType> => {
  try {
    const response = await api.put('/user/profile/basic', data);
    return response.data;
  } catch (error) {
    console.error('기본 정보 업데이트 실패:', error);
    throw error;
  }
};
