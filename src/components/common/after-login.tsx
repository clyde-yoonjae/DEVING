'use client';

import Profile from '@/assets/icon/profile.svg';
import Image from 'next/image';
import Link from 'next/link';

import Dropdown from './Dropdown';

const AfterLogin = () => {
  const menu = [
    { label: '내 모임' },
    { label: '마이페이지' },
    { label: '로그아웃' },
  ];
  return (
    <nav className="ml-auto hidden lg:flex">
      <div className="flex items-center">
        <Dropdown
          items={menu}
          trigger={<Image src={Profile} width={40} height={40} alt="profile" />}
        />
        <span className="typo-head3 m-auto w-[77px] text-center text-white">
          김밤식
        </span>
      </div>
    </nav>
  );
};

export default AfterLogin;
