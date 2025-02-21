import { setAccessToken } from '@/lib/serverActions';
import { useMutation } from '@tanstack/react-query';
import { postLogin, postNameCheck } from 'service/api/user';

const useLoginMutation = ({
  onSuccessCallback,
}: {
  onSuccessCallback: () => void;
}) => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogin({ email, password }),
    onSuccess: async (res) => {
      // 쿠키 저장
      const accessToken = res.headers.token;
      if (accessToken) {
        await setAccessToken(accessToken);
      }

      // 메인페이지로 리다이렉트
      onSuccessCallback();
    },
    onError: () => {
      console.log('로그인 에러');
    },
  });
};

// 닉네임 중복 검사
const useNameCheckMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: () => void;
  onErrorCallback: () => void;
}) => {
  return useMutation({
    mutationFn: (name: string) => postNameCheck(name),
    onSuccess: () => {
      // 중복 검사 성공
      /**
       * TODO
       * - 중복확인 버튼 비활성화
       */
      onSuccessCallback();
    },
    onError: () => {
      // 중복 검사 실패
      onErrorCallback();
    },
  });
};

export { useLoginMutation, useNameCheckMutation };
