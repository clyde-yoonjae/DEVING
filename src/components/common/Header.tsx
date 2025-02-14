import Logo from '@/assets/icon/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

import AfterLogin from './after-login';

const BeforeLogin = () => {
  return (
    <nav className="ml-auto flex">
      <Link
        href="/login"
        className="text-head3 flex h-[54px] w-[91px] items-center justify-center text-Cgray500"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="text-head3 flex  h-[54px] w-[91px] items-center justify-center text-Cgray500"
      >
        회원가입
      </Link>
    </nav>
  );
};

const Header = ({ isLogIn = false }) => {
  return (
    <header className="flex h-20 items-center bg-BG">
      <div className="item-center mx-auto flex w-full max-w-[1340px] items-center justify-between">
        <div className="flex-shrink-0">
          <Image src={Logo} width={40} height={40} alt="logo" />
        </div>
        {!isLogIn ? <AfterLogin /> : <BeforeLogin />}
      </div>
    </header>
  );
};
export default Header;
