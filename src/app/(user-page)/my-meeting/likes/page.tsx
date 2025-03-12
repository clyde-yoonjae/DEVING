import { myMeetingKeys } from '@/hooks/queries/useMyMeetingQueries';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getMyMeetingLikes } from 'service/api/mymeeting';
import { Paginated } from 'types/meeting';
import { IMyMeetingLikes } from 'types/myMeeting';

import Likes from '../_features/Likes';

export default async function LikesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: myMeetingKeys.likes(),
    queryFn: ({ pageParam }) => getMyMeetingLikes(pageParam),
    getNextPageParam: (lastPage: Paginated<IMyMeetingLikes>) =>
      lastPage.nextCursor ?? false,
    initialPageParam: 0,
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Likes />
      </HydrationBoundary>
    </div>
  );
}
