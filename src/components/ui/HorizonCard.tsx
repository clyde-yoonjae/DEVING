import { Heart } from 'lucide-react';
import Image from 'next/image';

import { Progress } from './Progress';

interface HorizonCardProps {
  children?: React.ReactElement;
  className?: string;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  title: string;
  location: string;
  onClickLike?: () => void;
}

const HorizonCard = ({
  children,
  className = '',
  thumbnailUrl = '',
  thumbnailHeight = 208,
  thumbnailWidth = 252,
  title,
  location,
  onClickLike,
}: HorizonCardProps) => {
  const handleLikeButton = () => {
    if (onClickLike) onClickLike();
  };

  return (
    <div
      className={`relative flex h-[240px] w-full flex-shrink-0 bg-BG p-4 ${className}`}
    >
      <Heart
        className="absolute right-4 top-4 cursor-pointer"
        width={24}
        height={24}
        color="#626675"
        onClick={handleLikeButton}
      />
      <div
        className={'relative'}
        style={{ height: `${thumbnailHeight}px`, width: `${thumbnailWidth}px` }}
      >
        {thumbnailUrl === '' ? (
          <Image
            className="rounded-[20px] object-cover"
            alt="card_thumbnail"
            fill
            src="/thumbnail.jpg"
          />
        ) : (
          <Image
            className="rounded-[20px] object-cover"
            alt="card_thumbnail"
            fill
            src={thumbnailUrl}
          />
        )}
      </div>
      <div className="flex-1 px-[40px]">
        <div className="typo-head2 flex justify-between text-Cgray800">
          {title}
        </div>
        <div className="mt-3 text-Cgray500">{location}</div>
        <Progress className="mt-4 overflow-hidden" value={33} total={100} />
      </div>
      {children}
    </div>
  );
};

export default HorizonCard;
