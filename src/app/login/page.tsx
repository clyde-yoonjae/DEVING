'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { basicAPI } from '@/lib/axios/basicApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ILoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginFormData>({
    mode: 'onBlur',
  });
  const router = useRouter();

  const getAccessTokenFromCookie = () => {
    const cookies = document.cookie.split('; ');
    const accessTokenCookie = cookies.find((row) =>
      row.startsWith('accessToken='),
    );
    return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
  };

  // 로그인 이미 됐다면 메인페이지로 이동
  // useEffect(() => {
  //   const accessToken = getAccessTokenFromCookie();
  //   if (accessToken) {
  //     router.push('/');
  //   }
  // }, []);

  const onSubmit = async (data: ILoginFormData) => {
    console.log('로그인 데이터: ', data);
    const res = await basicAPI.post(`/api/v1/auths/login`, data);
    console.log('res: ', res);

    const accessToken = res.headers.token;
    if (accessToken) {
      document.cookie = `accessToken=${accessToken}`;
    }
    router.push('/');
  };

  console.log(
    'watch email',
    errors.email?.message,
    'boolean: ',
    !!errors.email?.message,
  );
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[544px] flex-col gap-[48px] rounded-[16px] bg-BG_2 p-[40px]"
      >
        <div>
          <h2 className="typo-head2 mb-[40px] text-center text-white">
            로그인
          </h2>
          <div>
            <label htmlFor="email" className="typo-head3 text-Cgray700">
              아이디
            </label>
            <Input
              id="email"
              className="mb-[20px] mt-[8px]"
              placeholder="아이디를 입력해주세요."
              state={`${errors.email?.message ? 'error' : 'default'}`}
              {...register('email', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
              errorMessage={errors.email?.message}
            />
            <label htmlFor="pw" className="typo-head3 text-Cgray700">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              className="mb-[20px] mt-[8px]"
              placeholder="비밀번호를 입력해주세요."
              state={`${errors.password?.message ? 'error' : 'default'}`}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 6,
                  message: '비밀번호는 최소 6자 이상이어야 합니다.',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: '비밀번호는 영문과 숫자를 포함해야 합니다.',
                },
              })}
              errorMessage={errors.password?.message}
            />

            <div className="flex justify-between">
              <p className="text-Cgray700">비밀번호를 잊으셨나요?</p>
              <Link href="/" className="text-main underline">
                비밀번호 수정
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <Button type="submit" className="w-full">
            로그인
          </Button>
          <Button type="button" className="w-full" variant={'outline'}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}
