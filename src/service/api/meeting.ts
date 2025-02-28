import { authAPI } from '@/lib/axios/authApi';
import { basicAPI } from '@/lib/axios/basicApi';
import {
  CategoryTitle,
  IMeetingSearchCondition,
  PaginatedSearchMeeting,
  TopMeeting,
} from 'types/meeting';

const getTopMeetings = async (
  categoryTitle: CategoryTitle,
): Promise<TopMeeting[]> => {
  const res = await basicAPI.get(`/api/v1/meetings/top`, {
    params: { categoryTitle },
  });

  return res.data.data;
};

const getMeetings = async (
  pageParams: number,
  category: CategoryTitle,
  searchQueryObj: IMeetingSearchCondition,
): Promise<PaginatedSearchMeeting> => {
  const newSearchQueryObj = { ...searchQueryObj, lastMeetingId: pageParams };

  const res = await basicAPI.post(
    `/api/v1/meetings/search?categoryTitle=${category}`,
    newSearchQueryObj,
  );

  return res.data.data;
};

const likeMeeting = async (meetingId: number) => {
  const res = await authAPI.post(`/api/v1/meetings/${meetingId}/likes`);

  return res.data.data;
};

const cancelLikeMeeting = async (meetingId: number) => {
  const res = await authAPI.delete(`/api/v1/meetings/${meetingId}/likes`);

  return res.data.data;
};

export { getTopMeetings, getMeetings, likeMeeting, cancelLikeMeeting };
