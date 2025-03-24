import { MeetingBase } from './base';
import { CategoryTitle } from './base';
import { Member, MemberStatus } from './member';

export interface Meeting extends MeetingBase {
  isPublic: boolean;
  memberList: Member[];
}
export interface MyMeetingParticipated extends MeetingBase {
  categoryTitle: CategoryTitle;
  likesCount: number;
  myMemberStatus: MemberStatus;
  memberList: Member[];
  isMeetingManager: boolean;
}
export interface MyMeetingManage extends Meeting {
  likesCount: number;
}

export interface MyMeetingLikes extends MeetingBase {
  categoryTitle: CategoryTitle;
  likesCount: number;
}

export interface MyMeetingPending extends MyMeetingParticipated {}
