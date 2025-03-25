'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InstallBanner() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 로컬 스토리지 확인
    const bannerDismissed = localStorage.getItem('pwa-banner-dismissed');
    if (bannerDismissed) {
      setIsDismissed(true);
      return;
    }

    // PWA가 이미 설치되었는지 확인
    if (typeof window !== 'undefined') {
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsStandalone(true);
        return;
      }
    }

    // 배너 표시 타이밍 (페이지 로드 후 3초)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 배너 숨기기
  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // 설치 페이지로 이동
  const handleInstallClick = () => {
    router.push('/install-pwa');
    setIsVisible(false);
  };

  if (!isVisible || isStandalone || isDismissed) {
    return null;
  }

  return (
    <div className="animate-slideUpInstall fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-Cgray300 bg-BG_2 p-4 shadow-lg">
      <div className="flex items-center">
        <div className="relative mr-4 flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-main bg-opacity-20">
            <img
              src="/icons/logo_192.png"
              alt="DEVING 로고"
              width={32}
              height={32}
              className="rounded-md"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-main text-xs text-white shadow-md">
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
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="typo-head4 text-white">DEVING 앱 설치하기</h3>
          <p className="typo-body2 text-Cgray700">
            더 빠르고 편리한 경험을 즐겨보세요
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstallClick}
            className="typo-button2 rounded-md bg-main px-3 py-1.5 text-white"
          >
            설치하기
          </button>
          <button
            onClick={handleDismiss}
            className="flex h-8 w-8 items-center justify-center text-Cgray700 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
