import axios, { AxiosError } from 'axios';

export type CommonApiError = {
  statusCode: number;
  message: string;
  error: string;
};

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}
