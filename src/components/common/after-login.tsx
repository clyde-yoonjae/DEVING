'use client';

import Profile from '@/assets/icon/profile.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown';
import Image from 'next/image';
import Link from 'next/link';

const AfterLogin = () => {
  return (
    <nav className="ml-auto flex">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image src={Profile} width={40} height={40} alt="profile" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem size="s" onSelect={() => alert('로그아웃')}>
              마이페이지
            </DropdownMenuItem>
            <DropdownMenuItem
              size="s"
              onSelect={() => {
                alert('로그아웃');
              }}
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="typo-head3 m-auto w-[77px] text-center text-Cgray500">
          김밥식
        </span>
      </div>
    </nav>
  );
};

export default AfterLogin;
