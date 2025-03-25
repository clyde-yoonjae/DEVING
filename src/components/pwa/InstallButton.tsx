'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InstallButton() {
  const router = useRouter();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // PWA가 이미 설치되었는지 확인
    if (typeof window !== 'undefined') {
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsStandalone(true);
      }
    }
  }, []);

  // 앱이 이미 설치된 경우 버튼을 표시하지 않음
  if (isStandalone) {
    return null;
  }

  const handleInstallClick = () => {
    router.push('/install-pwa');
  };

  return (
    <button
      onClick={handleInstallClick}
      className="group typo-button2 flex items-center gap-2 rounded-md bg-main px-4 py-2 text-white transition-colors duration-300 hover:bg-opacity-90"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:animate-slideDown"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </div>
      <span>앱 설치하기</span>
    </button>
  );
}
