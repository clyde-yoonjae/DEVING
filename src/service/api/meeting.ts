import { basicAPI } from '@/lib/axios/basicApi';
import { CategoryTitle, IMeetingSearchCondition } from 'types/meeting';

const getTopMeetings = async (category: CategoryTitle) => {
  const res = await basicAPI.get(
    `/api/v1/meetings/top?categoryTitle=${category}`,
  );

  return res.data.data;
};

const getMeetings = async (
  pageParams: number,
  category: CategoryTitle,
  searchQueryObj: IMeetingSearchCondition,
) => {
  const newSearchQueryObj = { ...searchQueryObj, lastMeetingId: pageParams };

  const res = await basicAPI.post(
    `/api/v1/meetings/search?categoryTitle=${category}`,
    newSearchQueryObj,
  );

  return res.data.data;
};
export { getTopMeetings, getMeetings };
