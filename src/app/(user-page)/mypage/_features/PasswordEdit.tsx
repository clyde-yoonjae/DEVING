'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUpdatePasswordMutation } from '@/hooks/mutations/useMyPageMutation';
import { useForm } from 'react-hook-form';

import {
  BUTTON_ACTIONS,
  BUTTON_OUTLINE,
  BUTTON_PRIMARY,
  FIELD_CONTAINER,
  FORM_CONTAINER,
  LABEL_EDIT,
  SECTION_CONTAINER,
} from '../../../../constants/mypage/mypageCss';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  passwordCheck: string;
}

interface PasswordEditProps {
  onEditComplete: () => void;
}

const PasswordEdit = ({ onEditComplete }: PasswordEditProps) => {
  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      passwordCheck: '',
    },
  });

  // 현재 새 비밀번호 값 감시
  const newPassword = watch('newPassword');

  // 비밀번호 업데이트 뮤테이션 커스텀 훅 사용
  const { mutate: updatePassword, isPending: isUpdating } =
    useUpdatePasswordMutation();

  // 폼 제출 처리
  const onSubmit = (data: PasswordFormData) => {
    // 비밀번호 일치 여부 확인
    if (data.newPassword !== data.passwordCheck) {
      setError('passwordCheck', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다',
      });
      return;
    }

    // 비밀번호 업데이트 뮤테이션 호출
    updatePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        passwordCheck: data.passwordCheck,
      },
      {
        onSuccess: () => {
          // 편집 모드 종료
          onEditComplete();
        },
        onError: () => {
          // 모든 서버 에러를 기존 비밀번호 필드 에러로 설정
          setError('currentPassword', {
            type: 'manual',
            message: '기존 비밀번호와 다릅니다',
          });
        },
      },
    );
  };

  // 취소 핸들러
  const handleCancel = () => {
    onEditComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={FORM_CONTAINER}>
      <div className={SECTION_CONTAINER}>
        <div className={FIELD_CONTAINER}>
          <label htmlFor="currentPassword" className={LABEL_EDIT}>
            기존 비밀번호
          </label>
          <Input
            id="currentPassword"
            type="password"
            errorMessage={errors.currentPassword?.message}
            {...register('currentPassword', {
              required: '기존 비밀번호를 입력해주세요',
            })}
          />
        </div>

        <div className={FIELD_CONTAINER}>
          <label htmlFor="newPassword" className={LABEL_EDIT}>
            새 비밀번호
          </label>
          <Input
            id="newPassword"
            type="password"
            errorMessage={errors.newPassword?.message}
            {...register('newPassword', {
              required: '새 비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다',
              },
            })}
          />
        </div>

        <div className={FIELD_CONTAINER}>
          <label htmlFor="passwordCheck" className={LABEL_EDIT}>
            비밀번호 확인
          </label>
          <Input
            id="passwordCheck"
            type="password"
            errorMessage={errors.passwordCheck?.message}
            {...register('passwordCheck', {
              required: '비밀번호 확인을 입력해주세요',
              validate: (value) =>
                value === newPassword || '비밀번호가 일치하지 않습니다',
            })}
          />
        </div>

        <div className={BUTTON_ACTIONS}>
          <Button
            type="button"
            variant="outline"
            className={BUTTON_OUTLINE}
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            type="submit"
            className={BUTTON_PRIMARY}
            disabled={isSubmitting || isUpdating}
          >
            {isUpdating ? '변경 중...' : '비밀번호 변경'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PasswordEdit;
