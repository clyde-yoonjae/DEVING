import { Input } from '@/components/ui/Input';

export default function ButtonExamples() {
  return (
    <div className="w-fill h-96 bg-BG p-10">
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" isValid />
      </div>

      <div className="mb-4 w-[460px]">
        <Input
          placeholder="Default"
          isValid={false}
          errorMessage="필수 입력 사항입니다."
        />
      </div>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" />
      </div>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" disabled />
      </div>
    </div>
  );
}
