import type { VoucherSchema } from '@/modules/VoucherManagementPage/libs/validators';
import client from '../axios';
import type { IVoucher, IVoucherQuery, IVoucherResponse } from './types';

export const getVouchers = async (params: Partial<IVoucherQuery>): Promise<IVoucherResponse> => {
  const { data } = await client({
    url: '/api/admin/vouchers',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getVoucherById = async (id: string): Promise<IVoucher> => {
  const { data } = await client({
    url: `/api/admin/vouchers/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const createVoucher = async (formData: VoucherSchema): Promise<IVoucher> => {
  const { data } = await client({
    url: '/api/admin/vouchers',
    method: 'POST',
    data: formData,
  });
  return data?.data;
};

export const updateVoucher = async ({
  id,
  formData,
}: {
  id: string;
  formData: Partial<VoucherSchema>;
}): Promise<IVoucher> => {
  const { data } = await client({
    url: `/api/admin/vouchers/${id}`,
    method: 'PATCH',
    data: formData,
  });
  return data?.data;
};

export const deleteVoucher = async (id: string): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/vouchers/${id}`,
    method: 'DELETE',
  });
  return data?.data;
};
