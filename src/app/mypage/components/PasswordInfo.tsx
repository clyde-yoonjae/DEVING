import { Button } from '@/components/ui/Button';

const PasswordInfo = () => {
  return (
    <form className="w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="name-input" className="typo-head3 text-Cgray700">
            비밀번호
          </label>
          <input
            id="name-input"
            type="password"
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="w-[280px] select-none"
        >
          비밀번호 변경
        </Button>
      </div>
    </form>
  );
};

export default PasswordInfo;
