import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getMeetingDetail,
  getMeetingDetailManager,
  getMeetings,
  getTopMeetings,
} from 'service/api/meeting';
import type { CategoryTitle, IMeetingSearchCondition } from 'types/meeting';

const getSortedSearchQuery = (
  searchQueryObj: IMeetingSearchCondition,
): IMeetingSearchCondition => ({
  ...searchQueryObj,
  skillArray: [...searchQueryObj.skillArray].sort(),
});

const MEETING_QUERY_KEYS = {
  topMeetings: (category: string) => ['topMeetings', category] as const,
  meetings: (category: string, searchQueryObj: IMeetingSearchCondition) => {
    const sortedSearchQueryObj = getSortedSearchQuery(searchQueryObj);
    return ['meetings', category, sortedSearchQueryObj] as const;
  },
  meetingId: (
    id: string,
    category: string,
    searchQueryObj: IMeetingSearchCondition,
  ) =>
    [
      ...MEETING_QUERY_KEYS.meetings(
        category,
        getSortedSearchQuery(searchQueryObj),
      ),
      id,
    ] as const,
};
const useTopMeetings = (category: CategoryTitle, options = {}) => {
  return useQuery({
    queryKey: MEETING_QUERY_KEYS.topMeetings(category),
    queryFn: () => getTopMeetings(category),
    ...options,
  });
};

const useInfiniteSearchMeetings = (
  category: CategoryTitle,
  searchQueryObj: IMeetingSearchCondition,
  option = {},
) => {
  return useInfiniteQuery({
    queryKey: MEETING_QUERY_KEYS.meetings(category, searchQueryObj),
    queryFn: ({ pageParam = 0 }) =>
      getMeetings(pageParam, category, searchQueryObj),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor;
    },
    ...option,
  });
};

// query key
export const meetingKeys = {
  all: ['meeting'] as const,
  detailInfo: (id: number) => [...meetingKeys.all, id, 'detail'] as const,
  detailInfoUser: (id: number) => [...meetingKeys.all, id, 'manager'] as const,
};

export const useDetailQueries = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: meetingKeys.detailInfo(id),
    queryFn: () => getMeetingDetail(id),
  });

  return { data, error, isLoading };
};

// 디테일의 유저,,, ,어떻게 관리...?
export const useDetailUserQueries = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: meetingKeys.detailInfoUser(id),
    queryFn: () => getMeetingDetailManager(id),
  });

  return { data, error, isLoading };
};

export { MEETING_QUERY_KEYS, useTopMeetings, useInfiniteSearchMeetings };
