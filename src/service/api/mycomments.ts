import { authAPI } from '@/lib/axios/authApi';
import { Paginated } from 'types/meeting';
import { MyComment } from 'types/myComment';

import { mypageURL } from './endpoints';

const getMyWrittenComments = async (
  lastCommentId: number,
): Promise<Paginated<MyComment>> => {
  const res = await authAPI.get(
    `${mypageURL.comments}?lastCommentId=${lastCommentId}&size=${3}`,
  );

  return res.data.data;
};

const getMyMeetingsWritableComments = async (
  lastCommentId: number,
): Promise<Paginated<MyComment>> => {
  const res = await authAPI.get(
    `${mypageURL.mettingComments}?lastMeetingId=${lastCommentId}&size=${3}`,
  );

  return res.data.data;
};

export { getMyWrittenComments, getMyMeetingsWritableComments };
