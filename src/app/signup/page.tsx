'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  useEmailCheckMutation,
  useNameCheckMutation,
} from '@/hooks/mutations/useUserMutation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ChipContainer } from './components/ChipContainer';

interface ISignupFormData {
  name: string;
  email: string;
  position: string;
  password: string;
  passwordCheck: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<ISignupFormData>({
    mode: 'onBlur',
  });
  const [position, setPosition] = useState('');

  console.log(watch('name'));
  const onSubmit = (data: ISignupFormData) => {
    console.log('로그인 데이터: ', data);
  };

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

  // 2. 입력이 있다면 중복확인 버튼 활성화
  console.log('dirtyFields: ', dirtyFields?.name);

  useEffect(() => {
    if (dirtyFields?.name) {
      setIsNameCheck(false);
    }
    if (dirtyFields?.email) {
      setIsEmailCheck(false);
    }
  }, [dirtyFields, watch('name'), watch('email')]);

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
    console.log('name: ', name);
    nameCheckMutate(name);
  };

  const handleEmailCheck = () => {
    const email = watch('email');
    emailCheckMutate(email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[544px] flex-col rounded-[16px] bg-BG_2 p-[40px]"
      >
        <div>
          <h2 className="typo-head2 mb-[40px] text-center text-white">
            회원가입
          </h2>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="name" className="typo-head3 text-Cgray700">
                닉네임
              </label>
              <div className="flex flex-row  gap-[8px]">
                <Input
                  id="name"
                  className="h-full"
                  placeholder="닉네임을 입력해주세요."
                  {...register('name', { required: '닉네임을 입력해주세요.' })}
                  errorMessage={errors.name?.message}
                  state={isNameCheck ? 'success' : 'default'}
                />
                <Button
                  disabled={isNameCheck}
                  variant={'outline'}
                  size={'sm'}
                  className="h-[50px]"
                  type="button"
                  onClick={handleNameCheck}
                >
                  중복확인
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="id" className="typo-head3 text-Cgray700">
                이메일
              </label>
              <div className="flex flex-row  gap-[8px]">
                <Input
                  id="email"
                  className=" h-full"
                  placeholder="이메일을 입력해주세요."
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: '올바른 이메일 형식이 아닙니다.',
                    },
                  })}
                  state={isEmailCheck ? 'success' : 'default'}
                  errorMessage={errors.email?.message}
                />
                <Button
                  disabled={isEmailCheck}
                  variant={'outline'}
                  size={'sm'}
                  className="h-[50px]"
                  onClick={handleEmailCheck}
                  type="button"
                >
                  중복확인
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="id" className="typo-head3 text-Cgray700">
                포지션
              </label>
              {/* <div className="flex gap-[8px]">
                <Button type="button" variant={'default'}>
                  프론트
                </Button>
                <Button type="button" variant={'outline'}>
                  백엔드
                </Button>
                <Button type="button" variant={'outline'}>
                  디자이너
                </Button>
              </div> */}
              <ChipContainer position={position} setPosition={setPosition} />
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="password" className="typo-head3 text-Cgray700">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다.',
                  },
                })}
                errorMessage={errors.password?.message}
              />
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="pw" className="typo-head3 text-Cgray700">
                비밀번호 확인
              </label>
              <Input
                id="passwordCheck"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...register('passwordCheck', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다.',
                  },
                })}
                errorMessage={errors.passwordCheck?.message}
              />
            </div>
          </div>
        </div>
        <div className="mb-[20px] mt-[48px] flex flex-col">
          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </div>
        <div className="flex justify-between">
          <p className="text-Cgray700">비밀번호를 잊으셨나요?</p>
          <Link href="/" className="text-main underline">
            비밀번호 수정
          </Link>
        </div>
      </form>
    </div>
  );
}
