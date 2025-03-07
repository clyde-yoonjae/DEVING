'use client';

import ModalPortal from '@/components/ui/modal/ModalPortal';
import {
  useExpelMutation,
  useMemberStatusMutation,
} from '@/hooks/mutations/useMyMeetingMutation';
import { useMyMeetingMemberProfileQuries } from '@/hooks/queries/useMyMeetingQueries';
import { useRouter } from 'next/navigation';

import ModalProfile from '../../../_features/ModalProfile';

export default function UserListModal({
  searchParams,
}: {
  searchParams: { userId: string; meetingId: string; memberStatus: string };
}) {
  const router = useRouter();
  const userId = Number(searchParams.userId);
  const meetingId = Number(searchParams.meetingId);
  const memberStatus = searchParams.memberStatus;

  // 유저 정보 파악
  const { data: selectedUser } = useMyMeetingMemberProfileQuries({
    meetingId,
    userId,
  });

  console.log('selectedUser: ', selectedUser);

  // 가입 승인 / 거절
  const { mutate: statusMutate } = useMemberStatusMutation(meetingId);

  // 내보내기
  const { mutate: expelMutate } = useExpelMutation(meetingId);

  const handleSecondModalConfirm = () => {
    if (!selectedUser) return; // ✅ selectedUser가 없으면 실행되지 않도록 방어

    // 가입 확인 api 연동
    // 만약, status가 approved라면 -> 내보내기 활성화
    // 만약, status가 pending이 아니라면 -> 닫기만 활성화

    if (memberStatus === 'PENDING') {
      statusMutate({
        setMemberStatus: 'APPROVED',
        userId: selectedUser.userId,
      });
    }

    console.log('모달 닫기!!!!');
    // router.back();
    router.replace(`/my-meeting/my/user-list?meetingId=${meetingId}`);
  };

  const handleSecondModalCancel = () => {
    if (!selectedUser) return; // ✅ selectedUser가 없으면 실행되지 않도록 방어

    // 가입 거절 api 연동
    if (memberStatus === 'PENDING') {
      statusMutate({
        setMemberStatus: 'REJECTED',
        userId: selectedUser.userId,
      });
    } else if (memberStatus === 'APPROVED') {
      expelMutate({
        setMemberStatus: 'EXPEL',
        userId: selectedUser.userId,
      });
    }
    console.log('모달 닫기!!!!');

    // router.back();
    router.replace(`/my-meeting/my/user-list?meetingId=${meetingId}`);
  };

  if (!selectedUser) return <div>로딩중</div>;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      role="button"
      onClick={() => {
        console.log('모달 외부 클릭 닫기');
        router.back();
      }} // 모달 외부 클릭 시 닫기
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.back();
        }
      }}
    >
      <div className="h-[200px] w-[200px] bg-white">프로필 모달</div>
      {/* <ModalProfile userId={userId} meetingId={meetingId} /> */}
      <ModalPortal
        isOpen={true}
        onClose={handleSecondModalCancel}
        onConfirm={handleSecondModalConfirm}
        confirmText={memberStatus === 'PENDING' ? '가입승인' : '닫기'}
        cancelText={
          memberStatus === 'PENDING'
            ? '가입거절'
            : memberStatus === 'APPROVED'
              ? '내보내기'
              : '닫기'
        }
        closeOnly={!(memberStatus === 'PENDING' || memberStatus === 'APPROVED')}
        modalClassName="w-[450px] overflow-hidden bg-BG_2"
        buttonClassName="w-full"
      >
        <ModalProfile user={selectedUser} />
      </ModalPortal>
    </div>
  );
}
