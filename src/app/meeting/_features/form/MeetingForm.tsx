'use client';

import {
  CategoryField,
  DateField,
  DescriptionField,
  ImageField,
  InfoMessage,
  LocationField,
  MemberLimitField,
  PrivacyField,
  RequireApprovalField,
  SubmitButton,
  TechStackField,
  TitleField,
} from '@/app/meeting/_features/form/form-filed';
import { useToast } from '@/components/common/ToastContext';
import Modal from '@/components/ui/modal/Modal';
import useMeetingFormMutation from '@/hooks/mutations/useMeetingFormMutation';
import { convertImageToBase64 } from '@/util/base64';
import { AxiosError } from 'axios';
import { MEETING_TYPES } from 'constants/category/category';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateMeetingPayload, UpdateMeetingPayload } from 'types/meetingForm';

interface MeetingFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<CreateMeetingPayload> & { imageUrl?: string };
  meetingId?: number;
}

export default function MeetingForm({
  mode,
  initialData = {},
  meetingId,
}: MeetingFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 날짜 YYYY-MM-DD 형식으로 변환
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 카테고리 라벨에서 ID 찾기 (URL 용)
  const getCategoryId = (label: string) => {
    const category = MEETING_TYPES.find((type) => type.label === label);
    return category ? category.id : '';
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const { createMeeting, updateMeeting, isLoading } = useMeetingFormMutation({
    onSuccessCallback: (response, formData) => {
      const isCreateMode = mode === 'create';
      const message = isCreateMode
        ? '모임이 성공적으로 생성되었습니다'
        : '모임이 성공적으로 수정되었습니다';

      showToast(message, 'success', { duration: 3000 });

      const categoryId = getCategoryId(formData.categoryTitle);
      router.push(
        `/meeting/${categoryId}/${response.data.meetingId || meetingId}`,
      );
    },

    onErrorCallback: (error: AxiosError) => {
      let message;

      if (mode === 'create' && error?.response?.status === 403) {
        setIsLoginModalOpen(true);
        return;
      } else if (mode !== 'create' && error?.response?.status === 403) {
        message = '모임 수정 권한이 없습니다';
      } else {
        message =
          mode === 'create'
            ? '모임 생성에 실패했습니다'
            : '모임 수정에 실패했습니다';
      }

      showToast(message, 'error', { duration: 3000 });
    },
  });

  const defaultValues: CreateMeetingPayload = {
    meetingTitle: '',
    categoryTitle: '',
    imageName: '',
    imageEncodedBase64: '',
    content: '',
    location: '',
    maxMember: 0,
    startDate: formattedToday,
    isPublic: true,
    requireApproval: false,
    skillArray: [],
    ...initialData,
  };

  const defaultValuesRef = useRef(defaultValues);

  const methods = useForm<CreateMeetingPayload>({
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  // 초기 데이터가 변경되면 폼 재설정
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset({
        ...defaultValuesRef,
        ...initialData,
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (formData: CreateMeetingPayload) => {
    try {
      // 이미지 처리
      const fileInput = document.getElementById('image') as HTMLInputElement;

      if (mode === 'create') {
        // 생성 모드에서는 모든 필드 포함
        if (fileInput?.files && fileInput.files.length > 0) {
          const imageData = await convertImageToBase64(fileInput.files[0]);
          formData.imageName = imageData.name;
          formData.imageEncodedBase64 = imageData.base64;
        }

        await createMeeting.mutateAsync(formData);
      } else if (mode === 'edit' && meetingId) {
        // 수정 모드용 데이터 생성
        // imageUrl 덮어 없애기 위한 구조분해
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const { imageUrl: _, ...formDataWithoutUrl } = formData as any;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        const updateData: UpdateMeetingPayload = {
          ...formDataWithoutUrl,
          imageName: null,
          imageEncodedBase64: null,
        };

        // 이미지가 변경된 경우에만 이미지 데이터 설정
        if (fileInput?.files && fileInput.files.length > 0) {
          const imageData = await convertImageToBase64(fileInput.files[0]);
          updateData.imageName = imageData.name;
          updateData.imageEncodedBase64 = imageData.base64;
        }

        await updateMeeting.mutateAsync({ meetingId, formData: updateData });
      }
    } catch (error) {
      console.error('폼 제출 오류:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onConfirm={handleLogin}
        confirmText="로그인"
        cancelText="취소"
        modalClassName="w-96"
      >
        <p className="text-center text-white">로그인이 필요한 서비스 입니다.</p>
      </Modal>
      <div className="mx-auto w-full max-w-3xl p-6">
        <h1 className="typo-heading1 mb-8 text-center">
          {mode === 'create' ? '모임 생성하기' : '모임 수정하기'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TitleField required />
          <CategoryField required />
          <LocationField required />
          <DateField required />
          <MemberLimitField required />
          <TechStackField maxSelections={5} />
          <ImageField
            required={mode === 'create'}
            imageUrl={initialData.imageUrl}
          />
          <DescriptionField required />
          <RequireApprovalField />
          <PrivacyField />
          <InfoMessage />
          <SubmitButton
            text={mode === 'create' ? '모임 생성하기' : '모임 수정하기'}
            isLoading={isLoading}
          />
        </form>
      </div>
    </FormProvider>
  );
}
