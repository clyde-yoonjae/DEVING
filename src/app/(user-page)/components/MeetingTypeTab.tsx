'use client';

import { usePathname, useRouter } from 'next/navigation';

const MeetingTypeTab = () => {
  const router = useRouter();
  const activeStyle = 'border-b-2 border-main text-main';

  const pathname = usePathname();
  const segments = pathname.split('/');
  const tab = segments[2] || 'my';

  return (
    <div className="mt-[40px] flex gap-[24px]">
      <button
        className={`typo-button1 p-4 text-[17px] font-bold text-Cgray500 ${tab === 'my' && activeStyle}`}
        onClick={() => router.push('/my-meeting/my?type=created')}
      >
        나의 모임
      </button>
      <button
        className={`typo-button1 p-4 text-[17px] font-bold text-Cgray500 ${tab === 'likes' && activeStyle}`}
        onClick={() => router.push('/my-meeting/likes')}
      >
        찜한 모임
      </button>
      <button
        className={`typo-button1 p-4 text-[17px] font-bold text-Cgray500 ${tab === 'comments' && activeStyle}`}
        onClick={() => router.push('/my-meeting/comments')}
      >
        나의 리뷰
      </button>
    </div>
  );
};

export default MeetingTypeTab;
