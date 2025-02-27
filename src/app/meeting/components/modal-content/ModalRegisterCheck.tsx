'use client';

import Modal from '@/components/ui/modal/Modal';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ModalRegisterCheck = () => {
  return (
    <div className="text-cg8 typo-head3 flex w-full justify-center">
      <p className="text-white">로그인이 필요한 서비스입니다.</p>
    </div>
  );
};
export default ModalRegisterCheck;
