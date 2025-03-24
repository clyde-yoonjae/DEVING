import { ApiResponse } from 'type-clyde/common/api';

export interface CreateMeetingPayload {
  meetingTitle: string;
  categoryTitle: string;
  imageName: string;
  imageEncodedBase64: string;
  content: string;
  location: string;
  maxMember: number;
  startDate: string;
  isPublic: boolean;
  requireApproval: boolean;
  skillArray: string[];
}

export interface UpdateMeetingPayload
  extends Omit<CreateMeetingPayload, 'imageName' | 'imageEncodedBase64'> {
  imageName: string | null;
  imageEncodedBase64: string | null;
}

export interface MeetingResponseData {
  meetingId: number;
}

export type CreateMeetingResponse = ApiResponse<MeetingResponseData>;
