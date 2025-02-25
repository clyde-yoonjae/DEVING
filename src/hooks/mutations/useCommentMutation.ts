import { useMutation } from '@tanstack/react-query';
import { postComment } from 'service/api/comment';

const useCommentMutation = () => {
  return useMutation({
    mutationFn: ({
      meetingId,
      req,
    }: {
      meetingId: number;
      req: { score: number; content: string };
    }) => postComment(meetingId, req),
    onSuccess: async (res) => {
      // 메인페이지로 리다이렉트
      // onSuccessCallback?.();
    },
    onError: () => {
      console.log('로그인 에러');
    },
  });
};

export { useCommentMutation };
