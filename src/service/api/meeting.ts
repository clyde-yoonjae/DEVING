import { basicAPI } from '@/lib/axios/basicApi';
import { CategoryTitle, IMeetingSearchCondition } from 'types/meeting';

const getTopMeetings = async (category: CategoryTitle) => {
  const res = await basicAPI.get(
    `/api/v1/meetings/top?categoryTitle=${category}`,
  );

  return res.data.data;
};

const getMeetings = async (
  category: CategoryTitle,
  searchQueryObj: IMeetingSearchCondition,
) => {
  const params = new URLSearchParams();
  params.set('request', JSON.stringify(searchQueryObj));

  const res = await basicAPI.get(
    `/api/v1/meetings/top?categoryTitle=${category}&${params.toString()}`,
  );

  return res.data.data;
};
export { getTopMeetings, getMeetings };
