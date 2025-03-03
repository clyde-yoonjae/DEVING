import Image from 'next/image';

export default function NotYet() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-white">
      <Image
        className="mb-8"
        src="/cat_profile.png"
        alt="404_image"
        width={120}
        height={120}
      />
      <h1 className="typo-head1 mb-8">준비 중인 페이지입니다.</h1>
      <div className="typo-head3 mb-[6px] text-Cgray500">
        아직 준비 중인 페이지입니다. 조금만 기다려주세요.
      </div>
      <a href="/meeting" className="typo-head4 text-main underline">
        홈으로 돌아가기
      </a>
    </div>
  );
}
