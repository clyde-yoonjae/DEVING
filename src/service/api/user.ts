import { basicAPI } from '@/lib/axios/basicApi';

const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await basicAPI.post('/api/v1/auths/login', { email, password });

  return res;
};

const postNameCheck = async (name: string) => {
  const res = await basicAPI.get(`/api/v1/auths/signup/name?name=${name}`);
  return res;
};
export { postLogin, postNameCheck };
