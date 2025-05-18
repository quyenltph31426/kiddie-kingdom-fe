import { createQuery, createMutation } from 'react-query-kit';
import { getVouchers, getVoucherById, createVoucher, updateVoucher, deleteVoucher } from './requests';
import type { IVoucherResponse, IVoucher, IVoucherQuery } from './types';
import type { VoucherSchema } from '@/modules/VoucherManagementPage/libs/validators';

export const useVouchersQuery = createQuery<IVoucherResponse, Partial<IVoucherQuery>>({
  queryKey: ['admin/vouchers'],
  fetcher: (params) => getVouchers(params),
});

export const useVoucherByIdQuery = createQuery<IVoucher, string>({
  queryKey: ['voucher'],
  fetcher: (id) => getVoucherById(id),
});

export const useCreateVoucherMutation = createMutation<IVoucher, VoucherSchema>({
  mutationFn: (data) => createVoucher(data),
});

export const useUpdateVoucherMutation = createMutation<IVoucher, { id: string; formData: Partial<VoucherSchema> }>({
  mutationFn: ({ id, formData }) => updateVoucher({ id, formData }),
});

export const useDeleteVoucherMutation = createMutation<void, string>({
  mutationFn: (id) => deleteVoucher(id),
});
