import { useQuery } from '@tanstack/react-query';
import { getTopMeetings } from 'service/api/meeting';
import { CategoryTitle } from 'types/meeting';

export const MEETING_QUERY_KEYS = {
  meetings: ['meetings'] as const,
  meetingId: (id: string) => [...MEETING_QUERY_KEYS.meetings, id] as const,
};

export const useTopMeetings = (category: CategoryTitle, options = {}) => {
  return useQuery({
    queryKey: MEETING_QUERY_KEYS.meetings,
    queryFn: () => getTopMeetings(category),
    ...options,
  });
};
