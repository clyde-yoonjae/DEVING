'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface ILoginFormData {
  id: string;
  pw: string;
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
  const onSubmit = (data: ILoginFormData) => {
    console.log('로그인 데이터: ', data);
  };
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
            <label htmlFor="id" className="typo-head3 text-Cgray700">
              아이디
            </label>
            <Input
              id="id"
              className="mb-[20px] mt-[8px]"
              placeholder="아이디를 입력해주세요."
              {...register('id', { required: '아이디를 입력해주세요.' })}
              errorMessage={errors.id?.message}
            />
            <label htmlFor="pw" className="typo-head3 text-Cgray700">
              비밀번호
            </label>
            <Input
              id="pw"
              type="password"
              className="mb-[20px] mt-[8px]"
              placeholder="비밀번호를 입력해주세요."
              {...register('pw', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 6,
                  message: '비밀번호는 최소 6자 이상이어야 합니다.',
                },
              })}
              errorMessage={errors.pw?.message}
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
