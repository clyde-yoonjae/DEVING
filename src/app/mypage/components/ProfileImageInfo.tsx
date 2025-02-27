'use client';

import EditLogo from '@/assets/icon/editLogo.svg';
import { Button } from '@/components/ui/Button';

import { IProfileImage } from '../../../service/api/mypage';

interface ProfileInfoProps {
  data: IProfileImage;
  onEditClick: () => void;
}

const ProfileInfo = ({ data, onEditClick }: ProfileInfoProps) => {
  return (
    <div className="flex flex-col pt-[83px]">
      <div className="typo-head3 text-Cgray700">프로필 이미지</div>
      <div className="flex justify-center gap-[24px] py-[24px]">
        <div className="relative flex h-[252px] w-[252px] items-center justify-center rounded-[20px] border border-Cgray300 bg-Cgray200">
          {data?.url ? (
            <img
              src={data.url}
              alt="프로필 이미지"
              className="h-full w-full rounded-[20px] object-cover"
            />
          ) : (
            <EditLogo className="text-Cgray700" width={86} height={86} />
          )}
          <div className="absolute bottom-[15px] right-[15px]">
            <Button
              onClick={onEditClick}
              className="h-[34px] w-[34px] rounded-full"
              icon={
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
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              }
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
