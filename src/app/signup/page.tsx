'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface ISignupFormData {
  id: string;
  pw: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupFormData>({
    mode: 'onBlur',
  });
  const onSubmit = (data: ISignupFormData) => {
    console.log('로그인 데이터: ', data);
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
              <label htmlFor="id" className="typo-head3 text-Cgray700">
                닉네임
              </label>
              <div className="flex flex-row  gap-[8px]">
                <Input
                  id="id"
                  className=" h-full"
                  placeholder="아이디를 입력해주세요."
                  {...register('id', { required: '아이디를 입력해주세요.' })}
                  errorMessage={errors.id?.message}
                />
                <Button variant={'outline'} size={'sm'} className="h-[50px]">
                  중복확인
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="id" className="typo-head3 text-Cgray700">
                아이디
              </label>
              <div className="flex flex-row  gap-[8px]">
                <Input
                  id="id"
                  className=" h-full"
                  placeholder="아이디를 입력해주세요."
                  {...register('id', { required: '아이디를 입력해주세요.' })}
                  errorMessage={errors.id?.message}
                />
                <Button variant={'outline'} size={'sm'} className="h-[50px]">
                  중복확인
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="id" className="typo-head3 text-Cgray700">
                포지션
              </label>
              <div className="flex gap-[8px]">
                <Button type="button" variant={'default'}>
                  프론트
                </Button>
                <Button type="button" variant={'outline'}>
                  백엔드
                </Button>
                <Button type="button" variant={'outline'}>
                  디자이너
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="pw" className="typo-head3 text-Cgray700">
                비밀번호
              </label>
              <Input
                id="pw"
                type="password"
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
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="pw" className="typo-head3 text-Cgray700">
                비밀번호 확인
              </label>
              <Input
                id="pw"
                type="password"
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
