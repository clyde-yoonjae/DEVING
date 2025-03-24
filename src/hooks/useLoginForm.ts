import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { LoginFormData } from 'type-clyde/auth/form';

import { useLoginMutation } from './mutations/useUserMutation';

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  const router = useRouter();

  const { mutate } = useLoginMutation({
    onSuccessCallback: () => router.push('/'),
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    control,
    trigger,
  };
};

export default useLoginForm;
