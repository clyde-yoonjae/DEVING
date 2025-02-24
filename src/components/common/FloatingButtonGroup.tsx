import { FloatingButton } from '@/components/ui/FloatingButton';
import { ArrowUp, Plus } from 'lucide-react';

const FloatingButtonGroup = () => {
  return (
    <>
      <FloatingButton
        icon={<ArrowUp className="stroke-main" />}
        className="bottom-24 bg-solid"
      />
      {/* 웹 노출 */}
      <FloatingButton className="hidden md:hidden lg:flex" icon={<Plus />} />
      {/* 테블릿, 모바일 노출 노출 */}
      <FloatingButton
        className="flex md:flex lg:hidden"
        variant="text"
        icon={<Plus />}
      >
        모임 만들기
      </FloatingButton>
    </>
  );
};

export default FloatingButtonGroup;
