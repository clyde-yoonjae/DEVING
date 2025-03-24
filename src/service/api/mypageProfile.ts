import axiosInstance from '@/lib/axios/axiosInstance';
import { fileToBase64 } from '@/util/imageBase64';
import { Banner } from 'type-clyde/meeting/banner';
import {
  ContactInfo,
  ContactInfoUpdateResponse,
  PasswordUpdateRequest,
  PasswordUpdateResponse,
  ProfileImageUpdateRequest,
  ProfileImageUpdateResponse,
  ProfileResponse,
  ProfileUpdateResponse,
  UserBaseInfo,
} from 'type-clyde/user/profile';

// 프로필 조회 API 함수 (통합된 엔드포인트)
export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const response = await axiosInstance.get('/api/v1/mypage/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 프로필 업데이트 API 함수
export const updateProfile = async (
  profileData: UserBaseInfo,
): Promise<ProfileUpdateResponse> => {
  try {
    const response = await axiosInstance.put(
      '/api/v1/mypage/profile',
      profileData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 연락 수단 정보 업데이트 API 함수
export const updateContactInfo = async (
  contactData: ContactInfo,
): Promise<ContactInfoUpdateResponse> => {
  try {
    const response = await axiosInstance.put(
      '/api/v1/mypage/contact',
      contactData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 프로필 이미지 업데이트 API 함수
export const updateProfileImage = async (
  file: File,
): Promise<ProfileImageUpdateResponse> => {
  try {
    // 파일을 Base64로 변환
    const base64 = await fileToBase64(file);

    // 요청 데이터 구성
    const requestData: ProfileImageUpdateRequest = {
      profilePicBase64: base64,
      profilePicName: file.name,
    };

    const response = await axiosInstance.put(
      '/api/v1/mypage/profilepic',
      requestData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 업데이트 API 함수
export const updatePassword = async (
  passwordData: PasswordUpdateRequest,
): Promise<PasswordUpdateResponse> => {
  try {
    const response = await axiosInstance.put(
      '/api/v1/mypage/password',
      passwordData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 기술 스택 업데이트 API 함수
export const updateSkills = async (
  skillArray: string[],
): Promise<ProfileUpdateResponse> => {
  try {
    const response = await axiosInstance.post('/api/v1/mypage/skills', {
      skillArray,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 배너 정보 불러오기
export const getBanner = async (): Promise<Banner | null> => {
  try {
    const res = await axiosInstance.get('/api/v1/mypage/banner');
    return res.data.data;
  } catch (error) {
    return null;
  }
};
