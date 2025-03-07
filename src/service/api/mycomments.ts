import { authAPI } from '@/lib/axios/authApi';
import { Paginated } from 'types/meeting';
import { MyComment } from 'types/myComment';

import { mypageURL } from './endpoints';

const getMyWrittenComments = async (
  lastCommentId: number,
): Promise<Paginated<MyComment>> => {
  const res = await authAPI.get(
    `${mypageURL.comments}?${lastCommentId}&size=${3}`,
  );

  return res.data.data;
};

export { getMyWrittenComments };
