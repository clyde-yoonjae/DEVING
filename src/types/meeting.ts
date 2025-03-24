type CategoryTitle = '모각코' | '스터디' | '사이드 프로젝트' | '취미';

interface TopMeeting {
  meetingId: number;
  isLike: boolean;
  likesCount: number;
  location: string;
  maxMember: number;
  memberCount: number;
  thumbnail: string;
  title: string;
}

interface IMeetingSearchCondition {
  keyword: string;
  skillArray: string[];
  sortField: string;
  lastMeetingId: number | null;
  size: number;
}

interface SearchMeeting {
  meetingId: number;
  meetingTitle: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  startDate: string;
  meetingSkillArray: string[];
  name: string;
  profilePic: string;
  isLike: boolean;
  likesCount: number;
}

interface ErrorData {
  data: { entityType: string; errorMessage: string; request: string };
}

export type {
  CategoryTitle,
  TopMeeting,
  SearchMeeting,
  IMeetingSearchCondition,
  ErrorData,
};
