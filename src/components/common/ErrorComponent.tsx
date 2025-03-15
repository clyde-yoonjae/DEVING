import { useRouter } from 'next/navigation';

import { Button } from '../ui/Button';

interface ErrorComponentProps {
  className?: string;
}

const ErrorComponent = ({ className }: ErrorComponentProps) => {
  const router = useRouter();
  const retryHandler = () => {
    router.refresh();
  };
  return (
    <div
      className={`flex flex-col justify-center text-white ${className} h-screen w-full`}
    >
      <div className="text-center">
        문제가 발생했습니다.
        <br />
        다시 시도해주세요.
      </div>
      <div className="mt-10 flex w-full justify-center">
        <Button onClick={retryHandler}>다시 시도하기</Button>
      </div>
    </div>
  );
};

export default ErrorComponent;
