import { Button } from '@/components/ui/Button';

const ContectInfo = () => {
  return (
    <form className="w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="phone-input" className="typo-head3 text-main">
            전화번호
          </label>
          <input
            id="phone-input"
            type="text"
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="kakako-input" className="typo-head3 text-main">
            카카오톡 ID
          </label>
          <input
            id="kakaotalk-input"
            type="text"
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="github-input" className="typo-head3 text-main">
            깃허브
          </label>
          <input
            id="github-input"
            type="text"
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="blog-input" className="typo-head3 text-main">
            블로그
          </label>
          <input
            id="blog-input"
            type="text"
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-Cgray200 py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div>
          <Button type="submit" className="w-[280px] select-none">
            변경사항 저장
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContectInfo;
