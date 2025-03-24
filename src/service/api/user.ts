import axiosInstance from '@/lib/axios/axiosInstance';
import { SignupFormData } from 'type-clyde/auth/form';
import { LoginFormData } from 'type-clyde/auth/form';

import { authURL } from './endpoints';

const postLogin = async ({ email, password }: LoginFormData) => {
  const res = await axiosInstance.post(`${authURL.login}`, {
    email,
    password,
  });

  return res.data.data;
};

const getNameCheck = async (name: string) => {
  const res = await axiosInstance.get(`${authURL.checkName}${name}}`);

  return res;
};

const getEmailCheck = async (email: string) => {
  const res = await axiosInstance.get(`${authURL.checkEmail}${email}}`);
  return res;
};

const postSignup = async (data: SignupFormData) => {
  const res = await axiosInstance.post(`${authURL.signup}`, data);
  return res;
};

const deleteLogout = async () => {
  const res = await axiosInstance.delete(`${authURL.logout}`);
  return res;
};

export { postLogin, getNameCheck, getEmailCheck, postSignup, deleteLogout };
