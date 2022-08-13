import { CommonApiError, isAxiosError } from '@src/core/types/axios-error';
import { setClientAuthToken } from '@src/utils/authUtil';
import { ToastError, ToastWarn } from '@src/utils/toast';
import axios from 'axios';

export type ValidateResult = {
  email: string;
  username: string;
  profile_image: string;
};

export type SignInResult = ValidateResult & {
  access_token: string;
};

export const apiValidate = async () => {
  try {
    const { data } = await axios.get<ValidateResult>('/auth');
    return data;
  } catch (err) {
    ToastError('error occured during validation process');
    throw err;
  }
};

export const apiKakaoSignIn = async ({ access_token }: { access_token: string }) => {
  try {
    const { data } = await axios.post<SignInResult>('/auth/signin/kakao', {
      access_token,
    });
    setClientAuthToken(data.access_token);
    return data;
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('error occured during kakao signin process');
      throw err;
    }
  }
};
