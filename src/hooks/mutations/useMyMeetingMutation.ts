import { useToast } from '@/components/common/ToastContext';
import axiosInstance from '@/lib/axios/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { putExpel, putIsPublic, putMemberStatus } from 'service/api/mymeeting';
import { deleteCancel, deleteQuit } from 'service/api/mymeeting';

import { meetingKeys } from '../queries/useMeetingQueries';
import { myMeetingKeys } from '../queries/useMyMeetingQueries';

// 참가중인 모임 나가기 훅
const useQuitMeetingMutation = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetingId: number) => deleteQuit(meetingId),
    onSuccess: (_, meetingId) => {
      showToast('모임에서 탈퇴했습니다.', 'success');
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.participated(),
      });
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detailInfo(meetingId),
      });
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as
        | { data?: { request?: string } }
        | undefined;
      const errorMessage = errorData?.data?.request || '';

      if (
        errorMessage.includes('Meeting manager cannot quit meeting') &&
        error.response?.status === 400
      ) {
        showToast('주최자는 모임을 탈퇴할 수 없습니다.', 'error');
      } else {
        showToast('모임 탈퇴에 실패했습니다. 다시 시도해주세요.', 'error');
      }
    },
  });
};

// 승인 대기중인 모임 취소 훅
const useCancelPendingMutation = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetingId: number) => deleteCancel(meetingId),
    onSuccess: (_, meetingId) => {
      showToast('승인 대기를 취소했습니다.', 'success');
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.participated(),
      });
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detailInfo(meetingId),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        showToast('승인 대기 취소에 실패했습니다. 다시 시도해주세요.', 'error');
      }
    },
  });
};

const useMemberStatusMutation = (meetingId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      setMemberStatus,
      userId,
    }: {
      setMemberStatus: 'APPROVED' | 'REJECTED';
      userId: number;
    }) => putMemberStatus({ meetingId, userId, setMemberStatus }),
    onSuccess: (_, variables) => {
      if (variables.setMemberStatus === 'APPROVED') {
        showToast('해당 유저의 가입을 승낙했어요!', 'success');
      }
      if (variables.setMemberStatus === 'REJECTED') {
        showToast('해당 유저의 가입을 거절했어요!', 'error');
      }
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.manage(),
      });
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.memberProfile(meetingId, variables.userId),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        showToast('다시 시도해주세요.', 'error');
      }
    },
  });
};

// 내보내기
const useExpelMutation = (meetingId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      setMemberStatus,
      userId,
    }: {
      setMemberStatus: 'EXPEL';
      userId: number;
    }) => putExpel({ meetingId, userId, setMemberStatus }),
    onSuccess: (_, variables) => {
      showToast('해당 유저를 내보냈어요!', 'success');
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.manage(),
      });
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.memberProfile(meetingId, variables.userId),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        showToast('다시 시도해주세요.', 'error');
      }
    },
  });
};

// 공개 / 비공개 변경
const useChangePublic = (meetingId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isPublic: boolean) => putIsPublic(meetingId),
    onSuccess: (data, variables) => {
      console.log('비공개 api 응답 확인 data: ', data);
      if (!data.isPublic) {
        showToast('해당 모임을 비공개로 바꿨어요!', 'success');
      } else {
        showToast('해당 모임을 공개로 바꿨어요!', 'success');
      }
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.manage(),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        showToast('다시 시도해주세요.', 'error');
      }
    },
  });
};

export {
  useMemberStatusMutation,
  useExpelMutation,
  useChangePublic,
  useQuitMeetingMutation,
  useCancelPendingMutation,
};
