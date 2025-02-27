import { useMutation } from '@tanstack/react-query';
import { postComment } from 'service/api/comment';
import { postMeetingRegister } from 'service/api/meeting';

const useMeetingMutation = () => {
  return useMutation({
    mutationFn: ({
      meetingId,
      message,
    }: {
      meetingId: number;
      message: string;
    }) => postMeetingRegister({ meetingId, message }),
    onSuccess: async (res) => {
      // 메인페이지로 리다이렉트
      // onSuccessCallback?.();
    },
    onError: () => {
      console.log('로그인 에러');
    },
  });
};

export { useMeetingMutation };
