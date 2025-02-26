type CategoryTitle = '모각코' | '스터디' | '사이드프로젝트' | '취미';

interface IMeeting {
  meetingId: number;
  isLike: boolean;
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
  lastMeetingId: number;
  size: number;
}

export type { CategoryTitle, IMeeting, IMeetingSearchCondition };
