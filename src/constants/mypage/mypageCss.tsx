// 컨테이너 스타일
export const FORM_CONTAINER =
  'w-full rounded-[16px] border border-Cgray300 p-[32px]';
export const FORM_CONTAINER_SM =
  'w-full rounded-[16px] border border-Cgray300 p-[16px] md:p-[32px]';

// 섹션 및 필드 레이아웃
export const SECTION_CONTAINER = 'flex flex-col gap-[32px]';
export const FIELD_CONTAINER = 'flex flex-col gap-[8px]';
export const FIELD_CONTAINER_MD = 'flex flex-col gap-[16px]';
export const FIELD_SECTION =
  'flex flex-col gap-[16px] border-b border-Cgray300 pb-[16px] md:pb-[32px]';

// 입력 필드 스타일
export const INPUT_FIELD_VIEW =
  'typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none';
export const INPUT_FIELD_EDIT =
  'typo-button1 h-[40px] rounded-[16px] border-b border-Cgray300 bg-Cgray200 px-4 py-2 text-Cgray700 focus:outline-none md:h-[50px]';
export const TEXTAREA_FIELD_VIEW =
  'h-[140px] resize-none rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none';
export const TEXTAREA_FIELD_EDIT =
  'h-[140px] resize-none rounded-[16px] border-b border-Cgray300 bg-Cgray200 px-4 py-2 text-Cgray700 focus:outline-none';

// 타이포그래피
export const LABEL_VIEW = 'typo-head3 text-Cgray700';
export const LABEL_EDIT = 'typo-head3 text-main';
export const ERROR_TEXT = 'text-sm text-warning';

// 버튼
export const BUTTON_PRIMARY = 'h-[40px] w-[140px] select-none md:h-[46px]';
export const BUTTON_OUTLINE = 'h-[40px] w-[140px] md:h-[46px]';
export const BUTTON_WIDE = 'h-[40px] w-[295px] md:h-[46px] md:w-[280px]';
export const BUTTON_ROUND =
  'h-[28px] w-[28px] rounded-full md:h-[34px] md:w-[34px]';
export const BUTTON_ACTIONS = 'flex justify-between';
export const BUTTON_CENTER = 'flex justify-center md:justify-start';

// 탭 네비게이션
export const TAB_BUTTON =
  'w-1/4 px-5 py-3 text-center font-medium transition-colors';
export const TAB_ACTIVE = 'text-main';
export const TAB_INACTIVE = 'text-Cgray500 hover:text-Cgray400';
export const TAB_CONTAINER = 'relative flex w-full md:mb-6';
export const TAB_INDICATOR =
  'absolute bottom-0 h-1 bg-main transition-all duration-200 ease-in-out';

// 기술 스택
export const TECH_CONTAINER =
  'rounded-lg border border-Cgray300 bg-BG p-[32px]';
export const TECH_TAG =
  'flex items-center gap-1 rounded-full border border-main bg-Cgray100 px-2 py-1 shadow-sm';
export const TECH_TAG_TEXT =
  'cursor-default text-xs font-medium sm:inline-block';
export const TECH_HEADER = 'mb-4 flex items-center justify-between';
export const TECH_LIST = 'flex flex-wrap gap-2';

// 프로필 이미지
export const PROFILE_CONTAINER = 'flex flex-col pt-[83px]';
export const PROFILE_IMAGE_CONTAINER =
  'relative flex h-[163px] w-[163px] items-center justify-center rounded-[20px] border border-Cgray300 bg-Cgray200 md:h-[255px] md:w-[255px]';
export const PROFILE_IMAGE_WRAPPER = 'flex justify-center gap-[24px] py-[24px]';
export const PROFILE_IMAGE_EDIT_BUTTON =
  'absolute bottom-[8px] right-[8px] md:bottom-[15px] md:right-[15px]';
export const PROFILE_IMAGE_MODAL =
  'relative flex h-[123px] w-[123px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-Cgray300 bg-Cgray200 p-0 md:h-[163px] md:w-[163px] lg:h-[203px] lg:w-[203px]';
export const PROFILE_IMAGE_MODAL_OVERLAY =
  'absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100';
export const MODAL_CONTENT =
  'flex flex-col items-center justify-center gap-[16px]';

// 상태 스타일
export const LOADING_STATE = 'p-4 text-center';
export const ERROR_STATE = 'text-red-500 p-4 text-center';
export const EMPTY_STATE = 'text-Cgray500';
export const ERROR_MESSAGE = 'mt-2 text-center text-sm text-warning';

// 페이지 레이아웃
export const PAGE_CONTAINER = 'flex flex-col px-[24px] pb-[100px]';
export const ACTIVE_SECTION = 'mt-4';

// 토글 버튼 (별도 함수로 구현할 부분)
export const TOGGLE_BUTTON_BASE =
  'flex flex-1 flex-col items-center justify-center gap-1 rounded-md py-1 transition-colors duration-300 md:py-2';
export const TOGGLE_BUTTON_ACTIVE = 'bg-default text-main';
export const TOGGLE_BUTTON_INACTIVE = 'bg-disable text-Cgray500';
