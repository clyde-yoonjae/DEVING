import { MeetingBase } from './base';

export interface TopMeeting extends MeetingBase {
  isLike: boolean;
  likesCount: number;
}

export interface CreateMeetingResponse {
  meetingId: number;
}
