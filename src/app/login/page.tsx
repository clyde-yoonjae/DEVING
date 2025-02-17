import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="flex w-[544px] flex-col gap-[48px] rounded-[16px] bg-BG_2 p-[40px]">
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
              className="mb-[20px]"
              placeholder="아이디를 입력해주세요."
            />
            <label htmlFor="pw" className="typo-head3 text-Cgray700">
              비밀번호
            </label>
            <Input
              id="pw"
              type="password"
              className="mb-[20px]"
              placeholder="비밀번호를 입력해주세요."
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
          <Button className="w-full">로그인</Button>
          <Button className="w-full" variant={'outline'}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}
