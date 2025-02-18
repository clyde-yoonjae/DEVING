import Logo from '@/assets/icon/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

import AfterLogin from './after-login';

const BeforeLogin = () => {
  return (
    <nav className="ml-auto flex">
      <Link
        href="/login"
        className="text-head3 mr-[91px] flex h-[54px] items-center justify-center text-white"
      >
        로그인
      </Link>
    </nav>
  );
};

const Header = ({ isLogIn = false }) => {
  return (
    <header className="flex h-20 items-center bg-main px-[24px]">
      <div className="item-center mx-auto flex w-full max-w-[1340px] items-center justify-between">
        <div className="mr-[40px] flex-shrink-0">
          <Image src={Logo} width={40} height={40} alt="logo" />
        </div>
        <div className="flex items-center">
          <ul className="flex items-center text-Cgray700">
            <li className="typo-head4 p-[16px]">모각코</li>
            <li className="typo-head4 p-[16px]">스터디</li>
            <li className="typo-head4 p-[16px]">사이드 프로젝트</li>
            <li className="typo-head4 p-[16px]">취미</li>
          </ul>
        </div>
        {isLogIn ? <AfterLogin /> : <BeforeLogin />}
      </div>
    </header>
  );
};
export default Header;
