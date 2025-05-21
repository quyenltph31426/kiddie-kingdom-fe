import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import { cn } from '@/libs/common';
import { formatNumber } from '@/libs/utils';
import { format } from 'date-fns';
import ButtonDeleteVoucher from '../components/ButtonDeleteVoucher';
import FormEditVoucher from '../components/FormEditVoucher';

export const COLUMNS = (refetch: any): ITableColumn[] => [
  { title: 'ID', key: '_id', align: 'left', className: 'w-[200px]' },
  {
    title: 'Code',
    key: 'code',
    align: 'left',
  },
  {
    title: 'Tên voucher',
    key: 'name',
    align: 'left',
  },
  {
    title: 'Type',
    key: 'type',
    align: 'center',
    getCell: ({ row }) => (
      <span className={cn(row?.type === 'PERCENTAGE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800')}>{row?.type}</span>
    ),
  },
  {
    title: 'Value',
    key: 'value',
    align: 'center',
    getCell: ({ row }) => <span>{row?.type === 'PERCENTAGE' ? `${row?.value}%` : `$${formatNumber(row?.value)}`}</span>,
  },
  {
    title: 'Số lượng sử dụng tối đa',
    key: 'usageLimit',
    align: 'center',
  },
  {
    title: 'Thời gian áp dụng',
    key: 'period',
    align: 'center',
    getCell: ({ row }) => (
      <span className="text-xs">
        {format(new Date(row?.startDate), 'dd/MM/yyyy HH:mm')} - {format(new Date(row?.endDate), 'dd/MM/yyyy HH:mm')}
      </span>
    ),
  },
  {
    title: 'Trạng thái',
    key: 'isActive',
    align: 'center',
    getCell: ({ row }) => (
      <span className={`rounded px-2 py-1 text-xs ${row?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {row?.isActive ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    title: 'Hành động',
    key: 'actions',
    align: 'center',
    getCell: ({ row }) => (
      <HStack spacing={8} noWrap>
        <FormEditVoucher _id={row?._id} refetch={refetch} />
        <ButtonDeleteVoucher _id={row?._id} refetch={refetch} />
      </HStack>
    ),
  },
];
