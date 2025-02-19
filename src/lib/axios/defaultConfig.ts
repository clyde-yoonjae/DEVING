import { AxiosRequestConfig } from 'axios';

// import { HTTP_ERROR_MESSAGES } from 'constants/messages/errormessages';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const defaultConfig: AxiosRequestConfig = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
  //   timeoutErrorMessage: HTTP_ERROR_MESSAGES.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};
