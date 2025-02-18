'use client';

import Logo from '@/assets/icon/logo.svg';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Profile from '../../assets/icon/profile.svg';
import Dropdown from './Dropdown';

const BeforeLogin = () => {
  return (
    <nav className="ml-auto flex">
      <Link
        href="/login"
        className="text-head3 hidden h-[54px] items-center justify-center text-white lg:flex"
      >
        로그인
      </Link>
    </nav>
  );
};

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

const MobileBeforeLogin = () => {
  return (
    <div className="py-[24px]">
      <Link className="typo-head3 p-[16px] text-Cgray500" href="/login">
        로그인
      </Link>
      <Link className="typo-head3 p-[16px] text-main" href="/signup">
        회원가입
      </Link>
    </div>
  );
};

const MobileAfterLogin = () => {
  return (
    <div className="flex flex-col py-[24px]">
      <div className="flex justify-between">
        <Link className="typo-head3 p-[16px] text-Cgray500" href="/login">
          로그아웃
        </Link>
        <div className="flex">
          <Image src={Profile} width={40} height={40} alt="profile" />
          <span className="typo-head3 m-auto w-[77px] text-center text-white">
            김밤식
          </span>
        </div>
      </div>
      <Link className="typo-head4 p-[16px] text-Cgray400" href="/signup">
        마이페이지
      </Link>
      <Link className="typo-head4 p-[16px] text-Cgray400" href="/signup">
        나의 모임
      </Link>
    </div>
  );
};

const Header = ({ isLogIn = false }) => {
  return (
    <div>
      <header className="flex h-20 items-center bg-BG px-[24px] lg:bg-main">
        <div className="item-center mx-auto flex w-full max-w-[1340px] items-center justify-between">
          <div className="mr-[40px] flex-shrink-0">
            <Image src={Logo} width={40} height={40} alt="logo" />
          </div>
          <div className="hidden items-center lg:flex">
            <ul className="flex items-center text-Cgray700">
              <li className="typo-head4 p-[16px]">모각코</li>
              <li className="typo-head4 p-[16px]">스터디</li>
              <li className="typo-head4 p-[16px]">사이드 프로젝트</li>
              <li className="typo-head4 p-[16px]">취미</li>
            </ul>
          </div>
          {!isLogIn ? <BeforeLogin /> : <AfterLogin />}
          <div className="text-white lg:hidden">
            <Menu />
          </div>
        </div>
      </header>
      <div className="absolute h-screen w-screen bg-BG px-[24px]  lg:hidden">
        {!isLogIn ? <MobileBeforeLogin /> : <MobileAfterLogin />}
        <ul className="text-Cgray400">
          <li className="typo-head3 p-[16px]">모각코</li>
          <li className="typo-head3 p-[16px]">스터디</li>
          <li className="typo-head3 p-[16px]">사이드 프로젝트</li>
          <li className="typo-head3 p-[16px]">취미</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
