import axiosInstance from '@/lib/axios/axiosInstance';
import { ApiResponse } from 'type-clyde/common/api';
import { Paginated } from 'type-clyde/common/pagination';
import { ICommentsCount } from 'type-clyde/meeting/comment';
import { Comment } from 'type-clyde/meeting/comment';

import { commentURL } from './endpoints';

const getCommentsCount = async (meetingId: number): Promise<ICommentsCount> => {
  const res = await axiosInstance.get(commentURL.count(meetingId));
  return res.data.data;
};

const getCommentsMeeting = async (
  meetingId: number,
  lastCommentId: number,
): Promise<Paginated<Comment>> => {
  const res = await axiosInstance.get(
    `/api/v1/comments/${meetingId}?lastCommentId=${lastCommentId}&size=3`,
  );
  return res.data.data;
};

const postComment = async (
  meetingId: number,
  req: { score: number; content: string },
) => {
  const res = await axiosInstance.post(commentURL.create(meetingId), req);
  return res.data.data;
};

export { getCommentsCount, getCommentsMeeting, postComment };
