import { getAccessToken } from '@/lib/serverActions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from './mutations/useUserMutation';
import useDebounce from './useDebounde';

interface ILoginFormData {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ILoginFormData>({
    mode: 'onBlur',
  });

  const router = useRouter();
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(
    null,
  );

  // 입력창 포커스 1초 뒤 유효성 검사
  useDebounce({
    value: watch(focusedField!),
    callBack: () => {
      if (focusedField) {
        trigger(focusedField);
      }
    },
  });

  // 로그인 이미 됐다면 메인페이지로 이동
  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await getAccessToken();
      if (accessToken !== null) {
        router.push('/');
      } else {
        /**
         * TODO
         * 쿠키 불러오는 로딩 상태 관리
         */
      }
      return accessToken;
    };

    checkLoginStatus();
  }, []);

  const { mutate } = useLoginMutation({
    onSuccessCallback: () => router.push('/'),
  });

  const onSubmit = async (data: ILoginFormData) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    setFocusedField,
    onSubmit,
  };
};

export default useLoginForm;
