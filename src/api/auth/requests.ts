import type { CreateAccountSchema, EditAccountSchema } from '@/layouts/MainLayout/libs/validators';
import { env } from '@/libs/const';
import type { AuthSchema } from '@/modules/LoginPage/libs/validators';
import axios from 'axios';
import client from '../axios';
import type { ILoginResponse, IUploadAvatarResponse, IUser, IWalletConnect } from './types';

export const loginRequest = async (formData: AuthSchema): Promise<ILoginResponse> => {
  const { data } = await client({
    url: '/api/admin/auth/signin',
    method: 'POST',
    data: formData,
  });

  return data?.data;
};

export const connectWallet = async (formData: IWalletConnect): Promise<ILoginResponse> => {
  const { data } = await client({
    url: '/api/admin/auth/connect-wallet',
    method: 'POST',
    data: formData,
  });

  return data?.data;
};

export const logoutRequest = async (): Promise<boolean> => {
  const { data } = await client({
    url: '/api/auth/logout',
    method: 'POST',
  });

  return data.data;
};

export const editAccount = async (formData: Omit<EditAccountSchema, 'wallet_address'>): Promise<boolean> => {
  const { data } = await client({
    url: '/api/auth/update-account',
    method: 'POST',
    data: formData,
  });

  return data.data;
};

export const getUserLogin = async (): Promise<IUser> => {
  const { data } = await client({
    url: '/api/admin/auth/me',
    method: 'GET',
  });

  return data?.data;
};
export const userLogout = async (): Promise<IUser> => {
  const { data } = await client({
    url: '/api/admin/auth/logout',
    method: 'POST',
  });

  return data;
};

export const refreshTokenRequest = async (refreshToken: string): Promise<ILoginResponse> => {
  const { data } = await axios.get(`${env.API_URL}/api/admin/auth/refresh-token`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data?.data;
};

export const uploadAvatar = async (formData: FormData): Promise<IUploadAvatarResponse> => {
  const { data } = await client({
    url: '/api/s3/upload-file',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return data?.data;
};

export const createAccount = async ({ formData, token }: { formData: CreateAccountSchema; token: string }): Promise<ILoginResponse> => {
  const { data } = await axios({
    url: `${env.API_URL}/api/auth/create-account`,
    method: 'POST',
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data?.data;
};
