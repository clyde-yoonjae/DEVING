import NotYet from '@/components/common/NotYet';
import { myMeetingKeys } from '@/hooks/queries/useMyMeetingQueries';
import { QUERY_KEYS } from '@/hooks/queries/useMyPageQueries';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getMyMeetingManage } from 'service/api/mymeeting';
import { getBanner } from 'service/api/mypageProfile';
import { Paginated } from 'types/meeting';
import { IMyMeetingManage } from 'types/myMeeting';

import Created from '../_features/Created';
// import Joined from '../../components/Joined';
import Tab from '../_features/Tab';

export default async function Page({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const type = searchParams?.type;

  const queryClient = new QueryClient();

  // 배너
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.banner(),
    queryFn: () => getBanner(),
  });

  if (type === 'created') {
    // 내가 만든 모임 리스트 prefetch
    await queryClient.prefetchInfiniteQuery({
      queryKey: myMeetingKeys.manage(),
      queryFn: ({ pageParam }) => getMyMeetingManage(pageParam),
      getNextPageParam: (lastPage: Paginated<IMyMeetingManage>) =>
        lastPage.nextCursor ?? false,
      initialPageParam: 0,
    });
  } else {
    // 참여 중인 모임 prefetch
  }

  return (
    <div>
      <div className="mt-6 flex flex-col gap-[24px]">
        <Tab type={type} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {type === 'created' ? <Created /> : <NotYet />}
      </HydrationBoundary>
    </div>
  );
}
