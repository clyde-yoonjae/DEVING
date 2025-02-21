import { ISignupFormData } from '@/app/signup/page';
import {
  useEmailCheckMutation,
  useNameCheckMutation,
  useSignupMutation,
} from '@/hooks/mutations/useUserMutation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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

  /**
   * TODO
   * 포커스 1초 되 유효성 검사 - 닉네임, 이메일, 비밀번호, 비밀번호 확인
   */

  /**
   * TODO
   * 중복확인 플로우 체크
   * 1. 처음에는 중복확인 버튼 비활성화(''인 경우)
   * 2. 입력이 있다면 중복확인 버튼 활성화
   *  - 입력 중에는 비활성화
   * 3. 중복확인 성공시
   *  - 해당 인풋 성공 표시(보더 색 변경), disabled 없이 그대로 유지
   *  - 중복확인 버튼 비활성화
   * 3.1. 중복확인 성공 후 다시 입력 시
   *  - 중복확인 버튼 활성화
   *  - 해당 인풋 성공 처리 취소
   * 4. 중복확인 실패시
   *  - 해당 인풋 에러메시지 표시
   *  - 중복확인 버튼은 계속 활성화
   */

  // 닉네임 중복 체크 확인.
  // 1. 처음에는 중복확인 버튼 비활성화
  const [isNameCheck, setIsNameCheck] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const router = useRouter();

  // 2. 입력이 있다면 중복확인 버튼 활성화
  useEffect(() => {
    setIsNameCheck(false);
  }, [watch('name')]);

  useEffect(() => {
    setIsEmailCheck(false);
  }, [watch('email')]);

  // 3. 중복확인 로직 수행
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

  const { mutate: singupMutate } = useSignupMutation({
    onSuccessCallback: () => router.push('/login'),
  });

  const onSubmit = (data: ISignupFormData) => {
    console.log('회원가입 데이터: ', data);

    /**
     * TODO
     * - 닉네임 중복검사 했는지 확인
     * - 이메일 중복검사 했는지 확인
     * - position 선택했는지 확인
     * - 비밀번호 입력했는지 확인
     * - 비밀번호 확인 입력했는지 확인
     */

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
    // if (watch('position') === '') {
    //   setError('position', {
    //     type: 'positionCheck',
    //     message: '포지션을 선택해 주세요.',
    //   });
    // }

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
  };
};

export default useSignUpForm;
