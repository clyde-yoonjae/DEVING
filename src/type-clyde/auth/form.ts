// types/auth.ts
import {
  Control,
  FieldErrors,
  FieldValues,
  FormState,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

// Position 타입 정의
export type UserPosition = '프론트엔드' | '백엔드' | '디자이너' | '선택 안함';

// 기본 InputProps 정의
export interface InputProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  trigger?: UseFormTrigger<T>;
}

// 로그인 폼 데이터 타입
export interface LoginFormData {
  email: string;
  password: string;
}

// 회원가입 폼 데이터 타입 (로그인 폼 데이터 확장)
export interface SignupFormData extends LoginFormData {
  name: string;
  position: UserPosition;
  passwordCheck: string;
}

// NameInput 컴포넌트 props 타입
export interface NameInputProps extends InputProps<SignupFormData> {
  isNameCheck: boolean;
  handleNameCheck: () => void;
  setIsNameCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

// PasswordInput 컴포넌트 props 타입
export interface PasswordInputProps extends InputProps<SignupFormData> {
  dirtyFields: FormState<SignupFormData>['dirtyFields'];
}
