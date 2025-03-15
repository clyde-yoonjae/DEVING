'use client';

import { useQuitMeetingMutation } from '@/hooks/mutations/useMyMeetingMutation';
import { LogOut } from 'lucide-react';

interface LeaveMeetingButtonProps {
  meetingId: number;
  className?: string;
}

const LeaveMeetingButton = ({
  meetingId,
  className = '',
}: LeaveMeetingButtonProps) => {
  const { mutate: quitMeeting, isPending: isLoading } =
    useQuitMeetingMutation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    quitMeeting(meetingId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`absolute bottom-2 right-2 z-10 flex items-center rounded-md px-3 py-1.5 ${
        isLoading ? 'opacity-70' : ''
      } ${className}`}
      aria-label="모임 탈퇴하기"
      disabled={isLoading}
    >
      <LogOut
        size={16}
        className={`mr-1.5 ${isLoading ? 'animate-pulse' : ''}`}
      />
      <span className="typo-button2">
        {isLoading ? '처리 중...' : '모임 탈퇴하기'}
      </span>
    </button>
  );
};

export default LeaveMeetingButton;
