'use client';

import EditLogo from '@/assets/icon/editLogo.svg';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import { useUpdateProfileImageMutation } from '@/hooks/mutations/useMyPageMutation';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { MAX_FILE_SIZE } from '../../../../constants/mypage/mypageConstant';
import {
  BUTTON_ROUND,
  ERROR_MESSAGE,
  LABEL_VIEW,
  MODAL_CONTENT,
  PROFILE_CONTAINER,
  PROFILE_IMAGE_CONTAINER,
  PROFILE_IMAGE_EDIT_BUTTON,
  PROFILE_IMAGE_MODAL,
  PROFILE_IMAGE_MODAL_OVERLAY,
  PROFILE_IMAGE_WRAPPER,
} from '../../../../constants/mypage/mypageCss';
import SkeletonProfileImage from './skeletons/SkeletonProfileImage';

const ProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 프로필 데이터 조회
  const { data: profileData, isLoading: isProfileLoading } = useProfileQuery();

  // 프로필 이미지 업데이트
  const { mutate: updateImage, isPending: isUploading } =
    useUpdateProfileImageMutation();

  // 프로필 이미지 URL
  const profileImageUrl = profileData?.data?.profilePic || null;

  // 파일 선택 핸들러
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  // 파일 변경 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // 이전 미리보기 URL 해제
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    // 새 미리보기 URL 생성
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFile(file);

    // 파일 크기 검사
    setFileSizeError(
      file.size > MAX_FILE_SIZE
        ? '이미지 크기가 너무 큽니다. 최대 500KB까지 가능합니다.'
        : null,
    );
  };

  // 이미지 업로드 핸들러
  const handleConfirm = () => {
    if (!selectedFile || fileSizeError) return;

    updateImage(selectedFile, {
      onSuccess: () => {
        // 상태 초기화
        resetImageState();
        // 모달 닫기
        setIsModalOpen(false);
      },
    });
  };

  // 상태 초기화 함수 (중복 코드 제거)
  const resetImageState = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileSizeError(null);
  };

  // 모달 닫기 시 상태 초기화
  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetImageState();
  };

  if (isProfileLoading) {
    return <SkeletonProfileImage />;
  }

  return (
    <div className={PROFILE_CONTAINER}>
      <div className={LABEL_VIEW}>프로필 이미지</div>
      <div className={PROFILE_IMAGE_WRAPPER}>
        <div className={PROFILE_IMAGE_CONTAINER}>
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt="프로필 이미지"
              priority
              className="rounded-[20px] object-cover"
              fill
              unoptimized
              sizes="(max-width: 768px) 163px, 255px"
            />
          ) : (
            <EditLogo className="text-Cgray700" width={86} height={86} />
          )}
          <div className={PROFILE_IMAGE_EDIT_BUTTON}>
            <Button
              onClick={() => setIsModalOpen(true)}
              className={BUTTON_ROUND}
              icon={<Pencil />}
            />
          </div>
        </div>
      </div>

      {/* 파일 입력 (숨김) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="프로필 이미지 선택"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        confirmText={isUploading ? '업로드 중...' : '변경'}
        cancelText="취소"
        modalClassName="w-[343px] md:w-[450px]"
        buttonClassName="pt-0 px-[24px] pb-[24px]"
        disableConfirm={!!fileSizeError || !selectedFile}
      >
        <div className={MODAL_CONTENT}>
          <div className={LABEL_VIEW}>프로필 이미지</div>
          <div className="flex justify-center">
            <button
              type="button"
              className={PROFILE_IMAGE_MODAL}
              onClick={handleFileSelect}
              onKeyDown={(e) => e.key === 'Enter' && handleFileSelect()}
              aria-label="프로필 이미지 변경하기"
              disabled={isUploading}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="이미지 미리보기"
                  className="rounded-[20px] object-cover"
                  fill
                  sizes="(max-width: 768px) 123px, (max-width: 1024px) 163px, 203px"
                />
              ) : profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="현재 프로필 이미지"
                  className="rounded-[20px] object-cover"
                  fill
                  sizes="(max-width: 768px) 123px, (max-width: 1024px) 163px, 203px"
                />
              ) : (
                <EditLogo className="text-Cgray700" width={86} height={86} />
              )}
              <div className={PROFILE_IMAGE_MODAL_OVERLAY}>
                <p className="font-medium text-white">클릭하여 이미지 선택</p>
              </div>
            </button>
          </div>

          {/* 파일 크기 에러 메시지 */}
          {fileSizeError && (
            <div className={ERROR_MESSAGE}>{fileSizeError}</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProfileImage;
