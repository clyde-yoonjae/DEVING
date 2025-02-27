'use client';

import { useToast } from '@/components/common/ToastContext';

export default function Page() {
  const { showToast } = useToast();

  return (
    <div>
      <button
        onClick={() => showToast('로그인 성공!', 'success', { duration: 3000 })}
        className="bg-blue-500 rounded px-4 py-2 text-white"
      >
        성공 토스트 보여주기
      </button>
      <button
        onClick={() => showToast('로그인 실패!', 'error', { duration: 3000 })}
        className="bg-blue-500 rounded px-4 py-2 text-white"
      >
        실패 토스트 보여주기
      </button>
      <button
        onClick={() =>
          showToast('로그인 실패!', 'error', {
            btnText: '재시도',
            onClick: () => alert('버튼 클릭'),
          })
        }
        className="bg-blue-500 rounded px-4 py-2 text-white"
      >
        토스트 보여주기(with button)
      </button>
    </div>
  );
}
