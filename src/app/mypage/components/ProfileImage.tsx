'use client';

import EditLogo from '@/assets/icon/editLogo.svg';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import { getProfileImage, updateProfileImage } from '@/lib/axios/profileApi';
import { Pencil } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ProfileImage = () => {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 프로필 이미지 URL 상태
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  // 선택된 이미지 파일
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 선택된 이미지 미리보기
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 로딩 상태
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // 파일 입력 참조
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 프로필 이미지 로드
  useEffect(() => {
    fetchProfileImage();
  }, []);

  // 미리보기 URL 정리
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 URL 해제
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // 프로필 이미지 가져오기
  const fetchProfileImage = async () => {
    setFetchLoading(true);
    try {
      const response = await getProfileImage();
      if (response.data && response.data.profilePic) {
        setProfileImageUrl(response.data.profilePic);
      }
    } catch (error) {
      console.error('프로필 이미지를 불러오는데 실패했습니다:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 키보드 핸들러 - Enter 또는 Space 키로 파일 선택 다이얼로그 열기
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // 스크롤 방지
      handleFileSelect();
    }
  };

  // 파일 변경 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // 이미지 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 검증 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      setSelectedFile(file);

      // 미리보기 URL 생성
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // 이미지 업로드 핸들러 (모달 확인 버튼)
  const handleConfirm = async () => {
    if (!selectedFile) {
      setIsModalOpen(false);
      return;
    }

    setLoading(true);
    try {
      await updateProfileImage(selectedFile);

      // 업로드 성공 후 이미지 갱신
      await fetchProfileImage();

      // 상태 초기화
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      alert('프로필 이미지 업로드에 실패했습니다.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  // 모달 닫기 시 상태 초기화
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col pt-[83px]">
      <div className="typo-head3 text-Cgray700">프로필 이미지</div>
      <div className="flex justify-center gap-[24px] py-[24px]">
        <div className="relative flex h-[252px] w-[252px] items-center justify-center rounded-[20px] border border-Cgray300 bg-Cgray200">
          {fetchLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-Cgray700">로딩 중...</p>
            </div>
          ) : profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="프로필 이미지"
              className="h-full w-full rounded-[20px] object-cover"
            />
          ) : (
            <EditLogo className="text-Cgray700" width={86} height={86} />
          )}
          <div className="absolute bottom-[15px] right-[15px]">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-[34px] w-[34px] rounded-full"
              icon={<Pencil />}
            ></Button>
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
        confirmText={loading ? '업로드 중...' : '변경'}
        cancelText="취소"
        modalClassName="w-[450px]"
        buttonClassName="pt-0 px-[24px] pb-[24px]"
      >
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <div className="typo-head3 text-Cgray700">프로필 이미지</div>
          <div className="flex justify-center">
            <button
              type="button"
              className="relative flex h-[160px] w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-Cgray300 bg-Cgray200 p-0"
              onClick={handleFileSelect}
              onKeyDown={handleKeyDown}
              aria-label="프로필 이미지 변경하기"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="이미지 미리보기"
                  className="h-full w-full rounded-[20px] object-cover"
                />
              ) : profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="현재 프로필 이미지"
                  className="h-full w-full rounded-[20px] object-cover"
                />
              ) : (
                <EditLogo className="text-Cgray700" width={86} height={86} />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100">
                <p className="font-medium text-white">클릭하여 이미지 선택</p>
              </div>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileImage;
