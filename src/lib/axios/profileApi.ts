import axios from 'axios';

// 프로필 업데이트를 위한 타입 정의
export interface ProfileUpdateRequest {
  name: string;
  intro: string;
  position: string;
  gender: string;
  age: string;
  location: string;
}

// 프로필 업데이트 응답 타입 정의
export interface ProfileUpdateResponse {
  statusCode: number;
  data: {
    userId: number;
  };
  timestamp: string;
}

// 프로필 조회 응답 타입 정의
export interface ProfileResponse {
  statusCode: number;
  data: {
    userId: number;
    name: string;
    intro: string;
    position: string;
    gender: string;
    age: string;
    location: string;
    // 필요에 따라 더 많은 필드 추가 가능
  };
  timestamp: string;
}

// 연락 수단 업데이트 요청 타입 정의
export interface ContactInfoUpdateRequest {
  phone: string;
  kakao: string;
  github: string;
  blog: string;
}

// 연락 수단 업데이트 응답 타입 정의
export interface ContactInfoUpdateResponse {
  statusCode: number;
  data: {
    userId: number;
  };
  timestamp: string;
}

// 연락 수단 조회 응답 타입 정의
export interface ContactInfoResponse {
  statusCode: number;
  data: {
    userId: number;
    phone: string;
    kakao: string;
    github: string;
    blog: string;
  };
  timestamp: string;
}
// 프로필 이미지 업데이트 요청 타입 정의
export interface ProfileImageUpdateRequest {
  profilePicBase64: string;
  profilePicName: string;
}

// 프로필 이미지 업데이트 응답 타입 정의
export interface ProfileImageUpdateResponse {
  statusCode: number;
  data: {
    userId: number;
  };
  timestamp: string;
}

// 프로필 이미지 조회 응답 타입 정의
export interface ProfileImageResponse {
  statusCode: number;
  data: {
    userId: number;
    profilePic: string;
  };
  timestamp: string;
}

// 프로필 업데이트 API 함수
export const updateProfile = async (
  profileData: ProfileUpdateRequest,
): Promise<ProfileUpdateResponse> => {
  try {
    // 토큰 설정 (더미 토큰 사용)
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlaGR0anI1MTBAbmF2ZXIuY29tIiwiaWF0IjoxNzQwNjM2NTU5LCJleHAiOjE3NDA3MjI5NTl9.tzS85xEC1ttyOFVWbzZjFe3Fs3ZVpq5ylQAW3635KWs';

    // API 호출 설정
    const response = await axios.put(
      'https://deving.shop/api/v1/mypage/profile',
      profileData,
      {
        headers: {
          'Content-Type': 'application/json',
          token: token, // 토큰을 헤더에 추가
        },
        withCredentials: true, // 쿠키를 포함하기 위해 필요
      },
    );

    console.log('프로필 업데이트 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);

    throw error;
  }
};

// 프로필 조회 API 함수
export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    // 토큰 설정 (더미 토큰 사용)
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlaGR0anI1MTBAbmF2ZXIuY29tIiwiaWF0IjoxNzQwNjM2NTU5LCJleHAiOjE3NDA3MjI5NTl9.tzS85xEC1ttyOFVWbzZjFe3Fs3ZVpq5ylQAW3635KWs';

    // API 호출 설정
    const response = await axios.get(
      'https://deving.shop/api/v1/mypage/banner',
      {
        headers: {
          'Content-Type': 'application/json',
          token: token, // 토큰을 헤더에 추가
        },
        withCredentials: true, // 쿠키를 포함하기 위해 필요
      },
    );

    console.log('프로필 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 조회 실패:', error);
    throw error;
  }
};

// 연락 수단 정보 업데이트 API 함수
export const updateContactInfo = async (
  contactData: ContactInfoUpdateRequest,
): Promise<ContactInfoUpdateResponse> => {
  try {
    // 토큰 설정 (더미 토큰 사용)
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlaGR0anI1MTBAbmF2ZXIuY29tIiwiaWF0IjoxNzQwNjM2NTU5LCJleHAiOjE3NDA3MjI5NTl9.tzS85xEC1ttyOFVWbzZjFe3Fs3ZVpq5ylQAW3635KWs';

    // API 호출 설정
    const response = await axios.put(
      'https://deving.shop/api/v1/mypage/contacts',
      contactData,
      {
        headers: {
          'Content-Type': 'application/json',
          token: token, // 토큰을 헤더에 추가
        },
        withCredentials: true, // 쿠키를 포함하기 위해 필요
      },
    );

    console.log('연락 수단 업데이트 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('연락 수단 업데이트 실패:', error);
    throw error;
  }
};
// 연락 수단 조회 API 함수
export const getContactInfo = async (): Promise<ContactInfoResponse> => {
  try {
    // 토큰 설정 (더미 토큰 사용)
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlaGR0anI1MTBAbmF2ZXIuY29tIiwiaWF0IjoxNzQwNjM2NTU5LCJleHAiOjE3NDA3MjI5NTl9.tzS85xEC1ttyOFVWbzZjFe3Fs3ZVpq5ylQAW3635KWs';

    // API 호출 설정
    const response = await axios.get(
      'https://deving.shop/api/v1/mypage/banner',
      {
        headers: {
          'Content-Type': 'application/json',
          token: token, // 토큰을 헤더에 추가
        },
        withCredentials: true, // 쿠키를 포함하기 위해 필요
      },
    );

    console.log('연락 수단 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('연락 수단 조회 실패:', error);
    throw error;
  }
};
// 파일을 Base64로 변환하는 유틸리티 함수
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // reader.result는 "data:image/jpeg;base64,/9j/4AAQ..." 형식
      // Base64 문자열만 추출하여 반환
      const base64String = reader.result as string;
      const base64 = base64String.split(',')[1]; // "data:image/jpeg;base64," 부분 제거
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
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

    // 토큰 설정 (더미 토큰 사용)
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlaGR0anI1MTBAbmF2ZXIuY29tIiwiaWF0IjoxNzQwNjM2NTU5LCJleHAiOjE3NDA3MjI5NTl9.tzS85xEC1ttyOFVWbzZjFe3Fs3ZVpq5ylQAW3635KWs';

    // API 호출 설정
    const response = await axios.put(
      'https://deving.shop/api/v1/mypage/profilepic',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          token: token, // 토큰을 헤더에 추가
        },
        withCredentials: true, // 쿠키를 포함하기 위해 필요
      },
    );

    console.log('프로필 이미지 업데이트 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 이미지 업데이트 실패:', error);
    throw error;
  }
};
// 프로필 이미지 조회 API 함수
export const getProfileImage = async (): Promise<ProfileImageResponse> => {
  try {
    // 토큰 설정 (더미 토큰 사용)
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlaGR0anI1MTBAbmF2ZXIuY29tIiwiaWF0IjoxNzQwNjM2NTU5LCJleHAiOjE3NDA3MjI5NTl9.tzS85xEC1ttyOFVWbzZjFe3Fs3ZVpq5ylQAW3635KWs';

    // API 호출 설정
    const response = await axios.get(
      'https://deving.shop/api/v1/mypage/banner',
      {
        headers: {
          'Content-Type': 'application/json',
          token: token, // 토큰을 헤더에 추가
        },
        withCredentials: true, // 쿠키를 포함하기 위해 필요
      },
    );

    console.log('프로필 이미지 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 이미지 조회 실패:', error);
    throw error;
  }
};
