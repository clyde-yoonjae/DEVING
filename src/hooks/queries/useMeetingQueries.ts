import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMeetings, getTopMeetings } from 'service/api/meeting';
import { CategoryTitle, IMeetingSearchCondition } from 'types/meeting';

const MEETING_QUERY_KEYS = {
  topMeetings: ['topMeetings'] as const,
  meetings: ['meetings'] as const,
  meetingId: (id: string) => [...MEETING_QUERY_KEYS.meetings, id] as const,
};

const useTopMeetings = (category: CategoryTitle, options = {}) => {
  return useQuery({
    queryKey: MEETING_QUERY_KEYS.topMeetings,
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
    queryKey: MEETING_QUERY_KEYS.meetings,
    queryFn: ({ pageParam = 0 }) =>
      getMeetings(pageParam, category, searchQueryObj),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor;
    },
    ...option,
  });
};

export { MEETING_QUERY_KEYS, useTopMeetings, useInfiniteSearchMeetings };
