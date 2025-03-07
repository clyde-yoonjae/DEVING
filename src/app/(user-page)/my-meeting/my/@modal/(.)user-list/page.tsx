'use client';

import { myMeetingKeys } from '@/hooks/queries/useMyMeetingQueries';
import { useBannerQueries } from '@/hooks/queries/useMyPageQueries';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getMyMeetingMemberProfile } from 'service/api/mymeeting';
import { Paginated } from 'types/meeting';
import { IMyMeetingManage, Member } from 'types/myMeeting';

import ModalUserList from '../../../_features/ModalUserList';

export default function UserListModal({
  searchParams,
}: {
  searchParams: { meetingId: string };
}) {
  const router = useRouter();
  const meetingId = Number(searchParams.meetingId);
  const queryClient = useQueryClient();

  // react queryr 캐시에서 데이터를 가져오기
  const cachedMeetings = queryClient.getQueryData<{
    pages: Paginated<IMyMeetingManage>[];
  }>(myMeetingKeys.manage());

  // 캐시에서 특정 meetingId의 memberList 찾기
  const memberList =
    cachedMeetings?.pages
      ?.flatMap((page) => page.content)
      ?.find((meeting) => meeting.meetingId === meetingId)?.memberList || [];

  // 유저 정보 파악
  const { data: currentUser, isLoading, error } = useBannerQueries();

  if (!currentUser) return;

  const handlePrefetchProfile = async (member: Member) => {
    const queryKey = myMeetingKeys.memberProfile(meetingId, member.userId);

    // 캐시에 데이터가 있는지 확인
    const cachedData = queryClient.getQueryData(queryKey);

    if (!cachedData) {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: () =>
          getMyMeetingMemberProfile({ meetingId, userId: member.userId }),
      });
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={() => router.back()} // 모달 외부 클릭 시 닫기
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.back();
        }
      }}
    >
      <ModalUserList
        meetingId={meetingId}
        memberList={memberList}
        currentUser={currentUser}
        handlePrefetchProfile={handlePrefetchProfile}
      />
    </div>
  );
}
