import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const PasswordInfo = () => {
  return (
    <form className="w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex w-full flex-col gap-[8px]">
          <label htmlFor="password-input" className="typo-head3 text-main">
            기존 비밀번호
          </label>
          <Input id="password-input" type="password" />
        </div>
        <div className="flex w-full flex-col gap-[8px]">
          <label htmlFor="new-password-input" className="typo-head3 text-main">
            새 비밀번호
          </label>
          <Input id="new-password-input" state="success" type="password" />
        </div>
        <div className="flex w-full flex-col gap-[8px]">
          <label
            htmlFor="check-password-input"
            className="typo-head3 text-main"
          >
            비밀번호 확인
          </label>
          <Input
            id="check-password-input"
            errorMessage="필수 입력 사항입니다."
            type="password"
          />
        </div>
        <Button type="submit" className="w-[280px] select-none">
          비밀번호 변경
        </Button>
      </div>
    </form>
  );
};

export default PasswordInfo;
