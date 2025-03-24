import axiosInstance from '@/lib/axios/axiosInstance';
import { Paginated } from 'type-clyde/common/pagination';
import { MemberProfile } from 'type-clyde/meeting';
import { MyMeetingManage } from 'type-clyde/meeting/myMeeting';
import { MyMeetingParticipated } from 'type-clyde/meeting/myMeeting';
import { MyMeetingLikes, MyMeetingPending } from 'type-clyde/meeting/myMeeting';

import { myMeetingURL } from './endpoints';

// 내가 만든 모임 불러오기
const getMyMeetingManage = async (
  lastMeetingId: number,
): Promise<Paginated<MyMeetingManage>> => {
  const res = await axiosInstance.get(
    `${myMeetingURL.manage}?lastMeetingId=${lastMeetingId}&size=${6}`,
  );

  return res.data.data;
};

// 내가 참여하고있는 모임 불러오기
const getMyMeetingParticipated = async (
  lastMeetingId: number,
): Promise<Paginated<MyMeetingParticipated>> => {
  const res = await axiosInstance.get(
    `${myMeetingURL.all}?lastMeetingId=${lastMeetingId}&size=${6}`,
  );

  return res.data.data;
};

// 승인 대기중인 모임 불러오기
const getMyMeetingPending = async (
  lastMeetingId: number,
): Promise<Paginated<MyMeetingPending>> => {
  const res = await axiosInstance.get(
    `${myMeetingURL.pending}?lastMeetingId=${lastMeetingId}&size=${6}`,
  );

  return res.data.data;
};

// 내가 찜한 모임 불러오기
const getMyMeetingLikes = async (
  lastMeetingId: number,
): Promise<Paginated<MyMeetingLikes>> => {
  const res = await axiosInstance.get(
    `${myMeetingURL.likes}?lastMeetingId=${lastMeetingId}&size=${6}`,
  );

  return res.data.data;
};

// 맴버 프로필 불러오기
const getMyMeetingMemberProfile = async ({
  userId,
  meetingId,
}: {
  userId?: number;
  meetingId: number;
}): Promise<MemberProfile> => {
  const res = await axiosInstance.get(
    `${myMeetingURL.memberProfile}?userId=${userId}&meetingId=${meetingId}`,
  );

  return res.data.data;
};

// 가입 승인 / 거절
const putMemberStatus = async ({
  userId,
  meetingId,
  setMemberStatus,
}: {
  userId: number;
  meetingId: number;
  setMemberStatus: 'APPROVED' | 'REJECTED';
}) => {
  const res = await axiosInstance.put(`${myMeetingURL.memberStatus}`, {
    userId,
    meetingId,
    setMemberStatus,
  });

  return res.data.data;
};

// 강퇴
const putExpel = async ({
  userId,
  meetingId,
  setMemberStatus,
}: {
  userId: number;
  meetingId: number;
  setMemberStatus: 'EXPEL';
}) => {
  const res = await axiosInstance.put(`${myMeetingURL.expel}`, {
    userId,
    meetingId,
    setMemberStatus,
  });

  return res.data.data;
};

// 공개 / 비공개 설정
const putIsPublic = async (meetingId: number) => {
  const res = await axiosInstance.put(`${myMeetingURL.isPublic(meetingId)}`);
  return res.data.data;
};

// 참가중인 모임 나가기
const deleteQuit = async (meetingId: number) => {
  const res = await axiosInstance.delete(`${myMeetingURL.quit(meetingId)}`);
  return res.data.data;
};

// 승인 대기중인 모임 취소하기
const deleteCancel = async (meetingId: number) => {
  const res = await axiosInstance.delete(`${myMeetingURL.cancel(meetingId)}`);
  return res.data.data;
};

export {
  getMyMeetingManage,
  getMyMeetingMemberProfile,
  getMyMeetingParticipated,
  getMyMeetingLikes,
  putMemberStatus,
  putExpel,
  putIsPublic,
  deleteQuit,
  deleteCancel,
  getMyMeetingPending,
};
