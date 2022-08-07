import { isAxiosError } from '@src/core/types/axios-error';
import { setClientAuthToken } from '@src/utils/authUtil';
import { ToastError, ToastSuccess, ToastWarn } from '@src/utils/toast';
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

export const apiSignIn = async (email: string, password: string) => {
  try {
    const { data } = await axios.post<SignInResult>('/auth/signin', {
      email: email,
      password: password,
    });
    setClientAuthToken(data.access_token);
    return data;
  } catch (err) {
    ToastWarn('Login Failed. Try Again');
    throw err;
  }
};

type SignUpError = {
  statusCode: number;
  message: string;
  error: string;
};

export const apiSignUp = async (
  username: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    await axios.post('/auth/signup', {
      username,
      email,
      password,
    });
    ToastSuccess('Sign Up Success');
  } catch (err) {
    if (isAxiosError<SignUpError>(err)) {
      ToastWarn(err.response.data.message);
    } else {
      ToastWarn('Signup Failed. Try Again');
    }
    throw err;
  }
};
