'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function InstallPWAPage() {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // PWA가 이미 설치되었는지 확인
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    // 이미 저장된 프롬프트 이벤트가 있는지 확인
    const checkPromptEvent = () => {
      if ((window as any).deferredPrompt) {
        setPromptEvent((window as any).deferredPrompt);
        setIsInstallable(true);
      }
    };

    checkPromptEvent();

    // beforeinstallprompt 이벤트 핸들러 등록
    const handler = (e: Event) => {
      // 기본 미니 인포바 방지
      e.preventDefault();
      // 이벤트 저장
      (window as any).deferredPrompt = e;
      setPromptEvent(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // appinstalled 이벤트 처리
    const installedHandler = () => {
      setIsInstalled(true);
      (window as any).deferredPrompt = null;
    };

    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!promptEvent) {
      return;
    }

    try {
      // 설치 프롬프트 표시
      await promptEvent.prompt();

      // 사용자 선택 결과 처리
      const choiceResult = await promptEvent.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('사용자가 앱 설치를 수락했습니다');
        setIsInstalled(true);
        (window as any).deferredPrompt = null;
      } else {
        console.log('사용자가 앱 설치를 거부했습니다');
      }
    } catch (error) {
      console.error('설치 중 오류 발생:', error);
    }
  };

  const renderInstallSteps = () => {
    // 모바일 브라우저 감지
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isChrome =
      /Chrome/i.test(navigator.userAgent) &&
      !/Edge|Edg/i.test(navigator.userAgent);
    const isSafari =
      /Safari/i.test(navigator.userAgent) &&
      !/Chrome/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
      return (
        <div className="mt-8 rounded-lg border border-Cgray300 bg-BG_2 p-6">
          <h3 className="typo-head3 mb-4 text-white">iOS에서 설치하기</h3>
          <ol className="space-y-6">
            <li className="flex items-start">
              <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-main text-white">
                1
              </div>
              <div>
                <p className="typo-body1 text-white">
                  Safari 브라우저 메뉴에서 "공유" 버튼을 탭하세요
                </p>
                <div className="mt-2 rounded-lg border border-Cgray300 bg-Cgray100 p-3">
                  <div className="flex h-16 w-full items-center justify-center rounded bg-Cgray200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-Cgray700"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-main text-white">
                2
              </div>
              <div>
                <p className="typo-body1 text-white">
                  "홈 화면에 추가" 옵션을 선택하세요
                </p>
                <div className="mt-2 rounded-lg border border-Cgray300 bg-Cgray100 p-3">
                  <div className="flex h-24 w-full items-center justify-center rounded bg-Cgray200">
                    <p className="typo-body1 text-Cgray700">홈 화면에 추가</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-main text-white">
                3
              </div>
              <div>
                <p className="typo-body1 text-white">"추가" 버튼을 탭하세요</p>
                <div className="mt-2 rounded-lg border border-Cgray300 bg-Cgray100 p-3">
                  <div className="flex h-16 w-full items-center justify-center rounded bg-Cgray200">
                    <button className="typo-button2 rounded bg-main px-4 py-2 text-white">
                      추가
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      );
    } else if (isChrome) {
      return (
        <div>
          {isInstallable ? (
            <div className="mt-8">
              <button
                onClick={handleInstallClick}
                className="typo-button1 flex w-full items-center justify-center gap-3 rounded-lg bg-main py-4 text-white transition-all duration-300 hover:bg-opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                DEVING 앱 설치하기
              </button>
              <p className="typo-caption1 mt-3 text-center text-Cgray500">
                * 설치 후에는 앱처럼 사용할 수 있어요!
              </p>
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-Cgray300 bg-BG_2 p-6">
              <h3 className="typo-head3 mb-4 text-white">
                Chrome에서 설치하기
              </h3>
              <ol className="space-y-6">
                <li className="flex items-start">
                  <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-main text-white">
                    1
                  </div>
                  <div>
                    <p className="typo-body1 text-white">
                      브라우저 메뉴(⋮)를 탭하세요
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-main text-white">
                    2
                  </div>
                  <div>
                    <p className="typo-body1 text-white">
                      "앱 설치" 또는 "홈 화면에 추가" 옵션을 선택하세요
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-main text-white">
                    3
                  </div>
                  <div>
                    <p className="typo-body1 text-white">
                      "설치" 버튼을 탭하세요
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="mt-8 rounded-lg border border-Cgray300 bg-BG_2 p-6">
          <h3 className="typo-head3 mb-4 text-white">설치 방법</h3>
          <p className="typo-body1 mb-4 text-Cgray700">
            현재 브라우저에서는 자동 설치가 지원되지 않습니다. 최적의 경험을
            위해 Chrome 또는 Safari 브라우저를 사용해 주세요.
          </p>
          <div className="mt-6 flex gap-4">
            <div className="flex-1 rounded-lg border border-Cgray300 bg-Cgray100 p-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-2 text-Cgray700"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="21.17" y1="8" x2="12" y2="8"></line>
                <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
              </svg>
              <p className="typo-body1 text-white">Chrome</p>
            </div>
            <div className="flex-1 rounded-lg border border-Cgray300 bg-Cgray100 p-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-2 text-Cgray700"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <p className="typo-body1 text-white">Safari</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <div className="mb-8 animate-fadeIn text-center">
        <div className="mb-4 inline-block rounded-full bg-main bg-opacity-10 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-main"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="2" x2="9" y2="4"></line>
            <line x1="15" y1="2" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="22"></line>
            <line x1="15" y1="20" x2="15" y2="22"></line>
            <line x1="20" y1="9" x2="22" y2="9"></line>
            <line x1="20" y1="14" x2="22" y2="14"></line>
            <line x1="2" y1="9" x2="4" y2="9"></line>
            <line x1="2" y1="14" x2="4" y2="14"></line>
          </svg>
        </div>
        <h1 className="typo-head1 mb-2 text-white">DEVING 앱 설치하기</h1>
        <p className="typo-body1 text-Cgray700">
          더 빠르고 편리한 경험을 위해 DEVING 앱을 설치하세요
        </p>
      </div>

      {isInstalled ? (
        <div className="animate-fadeIn rounded-lg border border-main border-opacity-30 bg-main bg-opacity-10 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-main bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-main"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="typo-head2 mb-2 text-white">설치 완료!</h2>
          <p className="typo-body1 mb-4 text-Cgray500">
            DEVING 앱이 성공적으로 설치되었습니다.
          </p>
          <Link
            href="/"
            className="typo-button2 inline-block rounded-lg bg-main px-6 py-2 text-white"
          >
            홈으로 돌아가기
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8 animate-fadeIn overflow-hidden rounded-lg border border-Cgray300 bg-BG_2 shadow-lg">
            <div className="to-blue-500 relative h-36 bg-gradient-to-r from-main">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/deving.svg"
                  alt="DEVING 로고"
                  width="120"
                  height="120"
                />
              </div>
            </div>
            <div className="p-6">
              <h2 className="typo-head3 mb-4 text-white">
                앱 설치 시 이런 점이 좋아요!
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-main bg-opacity-20 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-main"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="typo-body1 text-white">
                      홈 화면에서 바로 실행
                    </p>
                    <p className="typo-body2 text-Cgray700">
                      웹브라우저 없이 앱처럼 바로 실행할 수 있어요
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-main bg-opacity-20 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-main"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="typo-body1 text-white">빠른 로딩 속도</p>
                    <p className="typo-body2 text-Cgray700">
                      웹사이트보다 더 빠르게 로딩됩니다
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-main bg-opacity-20 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-main"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="typo-body1 text-white">오프라인 접속 가능</p>
                    <p className="typo-body2 text-Cgray700">
                      인터넷 연결이 불안정해도 기본 기능 사용 가능
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {renderInstallSteps()}
        </>
      )}
    </div>
  );
}
