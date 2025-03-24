import { ContactInfo } from 'type-clyde/user/profile';

export type CategoryTitle = '모각코' | '스터디' | '사이드 프로젝트' | '취미';

export interface MeetingBase {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
}

export interface UserProfile {
  userId: number;
  name: string;
  profilePic: string;
  intro: string;
  email: string;
  position: string;
  gender: string;
  age: string;
  location: string;
  skillArray: string[];
  contactResponse: ContactInfo;
}
