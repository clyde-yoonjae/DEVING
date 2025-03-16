import Chip from '@/components/ui/Chip';

export const PositionSelect = ({
  position,
  setPosition,
}: {
  position: string;
  setPosition: (value: string) => void;
}) => {
  return (
    <div className="flex w-full gap-[8px]">
      <Chip
        className={`flex-1 hover:cursor-pointer`}
        isActive={position === '프론트엔드'}
        onClick={() => setPosition('프론트엔드')}
      >
        프론트엔드
      </Chip>
      <Chip
        className={`flex-1 hover:cursor-pointer`}
        isActive={position === '백엔드'}
        onClick={() => setPosition('백엔드')}
      >
        백엔드
      </Chip>
      <Chip
        className={`flex-1 hover:cursor-pointer`}
        isActive={position === '디자이너'}
        onClick={() => setPosition('디자이너')}
      >
        디자이너
      </Chip>
    </div>
  );
};
