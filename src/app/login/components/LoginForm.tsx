'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useLoginForm from '@/hooks/useLoginForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, onSubmit, errors, setFocusedField } =
    useLoginForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[544px] flex-col gap-[48px] rounded-[16px] bg-BG_2 p-[40px]"
    >
      <div>
        <h2 className="typo-head2 mb-[40px] text-center text-white">로그인</h2>
        <div>
          <label htmlFor="email" className="typo-head3 text-Cgray700">
            이메일
          </label>
          <Input
            id="email"
            className="mb-[20px] mt-[8px]"
            placeholder="이메일을 입력해주세요."
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
            errorMessage={errors.email?.message}
            onFocus={() => setFocusedField('email')}
          />
          <label htmlFor="pw" className="typo-head3 text-Cgray700">
            비밀번호
          </label>
          <Input
            id="password"
            type="password"
            className="mb-[20px] mt-[8px]"
            placeholder="비밀번호를 입력해주세요."
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
            onFocus={() => setFocusedField('password')}
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
        <Button
          type="button"
          className="w-full"
          variant={'outline'}
          onClick={() => router.push('/signup')}
        >
          회원가입
        </Button>
      </div>
    </form>
  );
};
export default LoginForm;
