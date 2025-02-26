import { basicAPI } from '@/lib/axios/basicApi';
import { CategoryTitle } from 'types/meeting';

const getTopMeetings = async (category: CategoryTitle) => {
  const res = await basicAPI.get(
    `/api/v1/meetings/top?categoryTitle=${category}`,
  );

  return res.data.data;
};
export { getTopMeetings };
