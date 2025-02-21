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

const getNameCheck = async (name: string) => {
  const res = await basicAPI.get(`/api/v1/auths/signup/name?name=${name}`);
  return res;
};

const getEmailCheck = async (email: string) => {
  const res = await basicAPI.get(`/api/v1/auths/signup/email?email=${email}`);
  return res;
};

export { postLogin, getNameCheck, getEmailCheck };
