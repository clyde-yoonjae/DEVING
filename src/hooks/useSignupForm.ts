import { ISignupFormData } from '@/app/signup/page';
import {
  useEmailCheckMutation,
  useNameCheckMutation,
  useSignupMutation,
} from '@/hooks/mutations/useUserMutation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useDebounce from './useDebounde';

const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<ISignupFormData>({
    mode: 'onBlur',
    defaultValues: {
      position: '',
    },
  });

  const [focusedField, setFocusedField] = useState<
    'name' | 'email' | 'position' | 'password' | 'passwordCheck' | null
  >(null);

  useDebounce({
    value: watch(focusedField!),
    callBack: () => {
      if (focusedField) {
        trigger(focusedField);
      }
    },
  });

  // 처음에는 중복확인 버튼 비활성화
  const [isNameCheck, setIsNameCheck] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const router = useRouter();

  // 입력이 있다면 중복확인 버튼 활성화
  useEffect(() => {
    setIsNameCheck(false);
  }, [watch('name')]);

  useEffect(() => {
    setIsEmailCheck(false);
  }, [watch('email')]);

  // 중복확인 로직 수행
  const { mutate: nameCheckMutate } = useNameCheckMutation({
    onSuccessCallback: () => setIsNameCheck(true),
    onErrorCallback: () =>
      setError('name', {
        type: 'checkFail',
        message: '이미 존재하는 닉네임입니다.',
      }),
  });

  const { mutate: emailCheckMutate } = useEmailCheckMutation({
    onSuccessCallback: () => setIsEmailCheck(true),
    onErrorCallback: () =>
      setError('email', {
        type: 'checkFail',
        message: '이미 존재하는 이메일입니다.',
      }),
  });

  const handleNameCheck = () => {
    const name = watch('name');
    nameCheckMutate(name);
    trigger('name');
  };

  const handleEmailCheck = () => {
    const email = watch('email');
    emailCheckMutate(email);
    trigger('email');
  };

  // 회원가입 제출
  const { mutate: singupMutate } = useSignupMutation({
    onSuccessCallback: () => router.push('/login'),
  });

  const onSubmit = (data: ISignupFormData) => {
    if (!isNameCheck) {
      setError('name', {
        type: 'nameCheck',
        message: '닉네임 중복확인이 필요합니다.',
      });
    }
    if (!isEmailCheck) {
      setError('email', {
        type: 'emailCheck',
        message: '이메일 중복확인이 필요합니다.',
      });
    }

    if (Object.keys(errors).length) {
      return;
    }
    singupMutate(data);
  };

  // 포지션 클릭
  const handleClickPosition = (value: string) => {
    setValue('position', value);
    trigger('position');
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isNameCheck,
    handleNameCheck,
    isEmailCheck,
    handleEmailCheck,
    watch,
    handleClickPosition,
    dirtyFields,
    setFocusedField,
  };
};

export default useSignUpForm;
