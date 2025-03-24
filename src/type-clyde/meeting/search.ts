import { SortFieldType } from '../common/pagination';
import { MeetingBase } from './base';

export interface MeetingSearchCondition {
  keyword: string;
  skillArray: string[];
  sortField: SortFieldType;
  lastMeetingId: number | null;
  size: number;
}

export interface SearchMeeting extends MeetingBase {
  meetingTitle: string;
  startDate: string;
  meetingSkillArray: string[];
  name: string;
  profilePic: string;
  isLike: boolean;
  likesCount: number;
}
