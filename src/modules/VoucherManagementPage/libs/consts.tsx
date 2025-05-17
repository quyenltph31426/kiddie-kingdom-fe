import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
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
    title: 'Name',
    key: 'name',
    align: 'left',
  },
  {
    title: 'Type',
    key: 'type',
    align: 'center',
    getCell: ({ row }) => <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">{row?.type}</span>,
  },
  {
    title: 'Value',
    key: 'value',
    align: 'center',
    getCell: ({ row }) => <span>{row?.type === 'PERCENTAGE' ? `${row?.value}%` : `$${row?.value}`}</span>,
  },
  {
    title: 'Usage Limit',
    key: 'usageLimit',
    align: 'center',
  },
  {
    title: 'Valid Period',
    key: 'period',
    align: 'center',
    getCell: ({ row }) => (
      <span className="text-xs">
        {format(new Date(row?.startDate), 'dd/MM/yyyy')} - {format(new Date(row?.endDate), 'dd/MM/yyyy')}
      </span>
    ),
  },
  {
    title: 'Status',
    key: 'isActive',
    align: 'center',
    getCell: ({ row }) => (
      <span className={`rounded px-2 py-1 text-xs ${row?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {row?.isActive ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    align: 'center',
    getCell: ({ row }) => (
      <HStack spacing={8}>
        <FormEditVoucher _id={row?._id} refetch={refetch} />
        <ButtonDeleteVoucher _id={row?._id} refetch={refetch} />
      </HStack>
    ),
  },
];
