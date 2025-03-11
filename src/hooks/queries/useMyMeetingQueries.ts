import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getMyMeetingManage,
  getMyMeetingMemberProfile,
} from 'service/api/mymeeting';
import {
  getMyMeetingLikes,
  getMyMeetingParticipated,
} from 'service/api/mymeeting';
import { Paginated } from 'types/meeting';
import { IMyMeetingLikes, IMyMeetingManage } from 'types/myMeeting';

export const myMeetingKeys = {
  all: ['mymeeting'] as const,
  manage: () => [...myMeetingKeys.all, 'manage'] as const,
  participated: () => [...myMeetingKeys.all, 'participated'] as const,
  likes: () => [...myMeetingKeys.all, 'likes'] as const,
  memberProfile: (meetingId: number, userId: number) => [
    ...myMeetingKeys.all,
    'profile',
    { meetingId, userId },
  ],
};

// 내가 생성한 모임
export const useInfiniteMyMeetingManageQueries = () => {
  return useInfiniteQuery({
    queryKey: myMeetingKeys.manage(),
    queryFn: ({ pageParam }) => getMyMeetingManage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Paginated<IMyMeetingManage>) => {
      return lastPage.nextCursor ?? null;
    },
  });
};

// 내가 참여하고 있는 모임
export const useInfiniteMyMeetingParticipatedQueries = () => {
  return useInfiniteQuery({
    queryKey: myMeetingKeys.participated(),
    queryFn: ({ pageParam }) => getMyMeetingParticipated(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Paginated<IMyMeetingManage>) => {
      return lastPage.nextCursor ?? null;
    },
  });
};

// 내가 찜한 모임
export const useInfiniteMyMeetingLikesQueries = () => {
  return useInfiniteQuery({
    queryKey: myMeetingKeys.likes(),
    queryFn: ({ pageParam }) => getMyMeetingLikes(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Paginated<IMyMeetingLikes>) => {
      return lastPage.nextCursor ?? null;
    },
  });
};

// 특정 유저의 프로필 요청
export const useMyMeetingMemberProfileQuries = ({
  meetingId,
  userId,
}: {
  meetingId: number;
  userId: number;
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: myMeetingKeys.memberProfile(meetingId, userId),
    queryFn: () => getMyMeetingMemberProfile({ meetingId, userId }),
    enabled: userId !== undefined,
  });

  return { data, error, isLoading };
};
