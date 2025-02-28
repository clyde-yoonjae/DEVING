import { Button } from '@/components/ui/Button';

const PasswordInfo = () => {
  return (
    <div className="w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="name-input" className="typo-head3 text-Cgray700">
            비밀번호
          </label>
        </div>
        <Button variant="outline" className="w-[280px] select-none">
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default PasswordInfo;
