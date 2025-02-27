'use client';

import { Button } from '@/components/ui/Button';
import HorizonCard from '@/components/ui/HorizonCard';
import VerticalCard from '@/components/ui/VerticalCard';
import Modal from '@/components/ui/modal/Modal';
import {
  useMeetingMutation,
  useMeetingQuitMutation,
} from '@/hooks/mutations/useMeetingMutation';
import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';
import { getAccessToken } from '@/lib/serverActions';
import { getDDay } from '@/util/date';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MeetingDetail } from 'service/api/meeting';

import ModalBeforeLogin from './modal-content/ModalBeforeLogin';
import ModalCancel from './modal-content/ModalCancel';
import ModalRegisterCheck from './modal-content/ModalRegisterCheck';
import ModalRegisterComplete from './modal-content/ModalRegisterComplete';
import ModalRegisterInput from './modal-content/ModalRegisterInput';
import ModalRegisterWait from './modal-content/ModalRegisterWait';
import SkeletonMeetingTotalInfo from './skeletons/SkeletonMeetingTotalInfo';

const CardRightSection = ({ meeting }: { meeting: MeetingDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState<{
    state: string; // 로그인 전, 신청 확인, 신청 입력, 신청 완료
    confirmText: string;
    cancelText: string;
    modalClassName?: string;
  }>({
    state: '',
    confirmText: '',
    cancelText: '',
  });
  const router = useRouter();

  const [ment, setMent] = useState('');

  const getToken = async () => {
    const token = await getAccessToken(); // 서버에서 데이터 패칭
    return token;
  };

  const handleModalOpen = async (state: string) => {
    // 경우의 수를 따져가며 여기서 모달 열기
    const token = await getToken();

    // 로그인 전인지 확인
    if (!token) {
      state = 'beforeLogin';
    }

    switch (state) {
      case 'cancel':
        setModalValue({
          state,
          confirmText: '신청 취소',
          cancelText: '돌아가기',
        });
        break;
      case 'beforeLogin':
        setModalValue({
          state,
          confirmText: '로그인',
          cancelText: '취소',
        });
        break;
      case 'registerCheck':
        setModalValue({
          state,
          confirmText: '신청',
          cancelText: '취소',
        });
        break;
      case 'registerInput':
        console.log('registerInput');
        setModalValue({
          state,
          confirmText: '보내기',
          cancelText: '취소',
          modalClassName: 'w-[520px] py-[12px]',
        });
        break;
      case 'registerWait':
        setModalValue({
          state,
          confirmText: '내 모임 보러가기',
          cancelText: '확인',
        });
      case 'registerComplete':
        setModalValue({
          state,
          confirmText: '내 모임 보러가기',
          cancelText: '확인',
        });
    }
    setIsModalOpen(true);
  };

  const { mutate } = useMeetingMutation({
    onSuccessCallback: handleModalOpen,
    onErrorCallback: () => setIsModalOpen(false),
    meetingId: meeting.meetingId,
  });

  const { mutate: cancelMutate } = useMeetingQuitMutation({
    meetingId: meeting.meetingId,
  });

  // 모달의 confirm 버튼 동작을 현재 modalType에 따라 동적으로 처리
  const handleModalConfirm = () => {
    switch (modalValue.state) {
      case 'cancel':
        setIsModalOpen(false);
        cancelMutate();
        break;
      case 'beforeLogin':
        setIsModalOpen(false);
        router.push('/login');
        break;
      case 'registerCheck':
        handleModalOpen('registerInput');
        break;
      case 'registerInput':
        mutate({ message: ment });
        setMent('');
        break;
      case 'registerWait':
        router.push('/mypage');
        setIsModalOpen(false);
      case 'registerComplete':
        router.push('/mypage');
        setIsModalOpen(false);
      default:
        setIsModalOpen(false);
        break;
    }
  };

  // 모달 내부 콘텐츠를 조건부로 렌더링
  const renderModalContent = () => {
    switch (modalValue.state) {
      case 'cancel':
        return <ModalCancel />;
      case 'beforeLogin':
        return <ModalRegisterCheck />;
      case 'registerCheck':
        return <ModalBeforeLogin meeting={meeting} />;
      case 'registerInput':
        return <ModalRegisterInput ment={ment} setMent={setMent} />;
      case 'registerWait':
        return <ModalRegisterWait />;
      case 'registerComplete':
        return <ModalRegisterComplete />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col justify-end gap-[24px] py-[16px] md:p-[16px] lg:h-[208px] lg:w-[318px]">
      <div className="md:ml-[8px] lg:ml-0">
        <p className="typo-head3 text-Cgray500">모임 시작</p>
        <div className="flex items-end">
          <p className="typo-head1 text-Cgray800">
            {getDDay(meeting.startdate)}
          </p>
          <p className="typo-button1 mb-2 ml-1 text-Cgray800">일</p>
        </div>
      </div>
      {!meeting.isMember ? (
        meeting.maxMember === meeting.memberCount ? (
          <Button className="w-full" disabled>
            인원이 꽉찼어요
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => handleModalOpen('registerCheck')}
          >
            신청하기
          </Button>
        )
      ) : (
        <Button
          className="w-full"
          variant={'outline'}
          onClick={() => handleModalOpen('cancel')}
        >
          신청 취소하기
        </Button>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        confirmText={modalValue.confirmText}
        cancelText={modalValue.cancelText}
        modalClassName={`w-96 ${modalValue.modalClassName}`}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

const CardWarpper = ({ meetingId }: { meetingId: number }) => {
  const { data: meeting, isLoading, error } = useDetailQueries(meetingId);

  if (isLoading || !meeting) {
    return <SkeletonMeetingTotalInfo />;
  }

  return (
    <>
      {/* 모바일 */}
      <div className="flex flex-col md:hidden lg:hidden">
        <VerticalCard
          className="h-fit w-full"
          thumbnailHeight={252}
          thumbnailWidth={343}
          key={meeting.meetingId}
          title={meeting.title}
          thumbnailUrl={meeting.thumbnail}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
        >
          <CardRightSection meeting={meeting} />
        </VerticalCard>
      </div>
      {/* 테블릿 */}
      <div className="hidden w-full flex-col px-[16px] md:flex lg:hidden">
        <HorizonCard
          className="items-center"
          key={meeting.meetingId}
          title={meeting.title}
          thumbnailUrl={meeting.thumbnail}
          thumbnailHeight={252}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
        />
        <CardRightSection meeting={meeting} />
      </div>
      {/* 데스크탑 */}
      <div className="hidden w-full p-[16px] lg:flex">
        <HorizonCard
          title={meeting.title}
          thumbnailUrl={meeting.thumbnail}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
          className="flex-col lg:flex-row"
        >
          <CardRightSection meeting={meeting} />
        </HorizonCard>
      </div>
    </>
  );
};
export default CardWarpper;
