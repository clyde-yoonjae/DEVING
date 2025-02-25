import { authAPI } from '@/lib/axios/authApi';

export interface MeetingDetail {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  content: string;
  startdate: string;
  requireApproval: boolean;
  isLike: boolean;
  isMember: boolean;
}

export interface MeetingManager {
  name: string;
  profilePic: string;
  email: string;
  intro: string;
  phone: string;
  skillArray: string[];
}

const getMeetingDetail = async (id: number): Promise<MeetingDetail> => {
  const res = await authAPI.get(`/api/v1/meetings/detail/${id}`);
  return res.data.data;
};

const getMeetingDetailManager = async (id: number): Promise<MeetingManager> => {
  const res = await authAPI.get(`/api/v1/meetings/detail/manager/${id}`);
  return res.data.data;
};

export { getMeetingDetail, getMeetingDetailManager };
