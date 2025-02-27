import { useToast } from '@/components/common/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { postComment } from 'service/api/comment';
import { deleteMeetingQuit, postMeetingRegister } from 'service/api/meeting';

import { meetingKeys } from '../queries/useMeetingQueries';

const useMeetingMutation = ({
  onSuccessCallback,
  onErrorCallback,
  meetingId,
}: {
  onSuccessCallback: (state: string) => Promise<void>;
  onErrorCallback: () => void;
  meetingId: number;
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: ({ message }: { message: string }) =>
      postMeetingRegister({ meetingId, message }),
    onSuccess: async (res) => {
      console.log('res: ', res);
      if (res.status === 'APPROVED') {
        onSuccessCallback('registerComplete');
      } else if (res.status === 'PENDING') {
        onSuccessCallback('registerWait');
      }
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detailInfo(meetingId),
      });
    },
    onError: (error: AxiosError) => {
      console.log('모임 신청 실패, error: ', error);
      console.log('error.status: ', error.status);
      if (error.status === 400) {
        showToast(
          '이미 모임에 참가 신청을 했습니다. 승인을 기다려주세요.',
          'error',
        );
      }
      onErrorCallback();
    },
  });
};

const useMeetingQuitMutation = ({
  onSuccessCallback,
  onErrorCallback,
  meetingId,
}: {
  onSuccessCallback?: (state: string) => Promise<void>;
  onErrorCallback?: () => void;
  meetingId: number;
}) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMeetingQuit(meetingId),
    onSuccess: async (res) => {
      console.log('approve 상태에서 모임 탈퇴 성공res: ', res);
      showToast('모임 신청이 취소되었습니다.', 'success');
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detailInfo(meetingId),
      });
    },
    onError: (error: AxiosError) => {
      console.log('모임 탈퇴 실패: ', error);
      showToast('모임 신청 취소에 실패하였습니다.', 'error');
    },
  });
};

export { useMeetingMutation, useMeetingQuitMutation };
