// check cookies, axios header
import axios from 'axios';
import Cookies from 'js-cookie';

export const setClientAuthToken = (token: string) => {
  Cookies.set('jwt', `Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const setServerAuthToken = (bearerToken: string) => {
  axios.defaults.headers.common['Authorization'] = bearerToken;
};

export const getAuthToken = (): string => {
  const token =
    Cookies.get('jwt')?.toString() ||
    axios.defaults.headers.common['Authorization']?.toString() ||
    '';
  return token;
};
