// page.tsx (서버 컴포넌트)
import { Suspense } from 'react';

import MyPageClient from './MyPageClient';
import ProfileImage from './_features/ProfileImage';
import SkeletonBasicInfo from './_features/skeletons/SkeletonBasicInfo';

export default function MyPage() {
  return (
    <div className="flex flex-col px-[24px] pb-[100px]">
      <div className="md:mb-8">
        <ProfileImage />
      </div>

      <Suspense fallback={<SkeletonBasicInfo />}>
        <MyPageClient />
      </Suspense>
    </div>
  );
}
