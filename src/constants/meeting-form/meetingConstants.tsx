// 가입 방식 옵션
export const JOIN_METHODS = [
  { id: 'immediate', label: '바로 참가' },
  { id: 'approval', label: '승인 후 참가' },
];

// 모임 공개 여부 옵션
export const PRIVACY_OPTIONS = [
  { id: 'public', label: '공개' },
  { id: 'private', label: '비공개' },
];

// 이미지 관련 상수
export const IMAGE_CONFIG = {
  MAX_SIZE_MB: 5,
  ACCEPTED_FORMATS: ['.jpg', '.jpeg', '.png'],
  MIME_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
};
