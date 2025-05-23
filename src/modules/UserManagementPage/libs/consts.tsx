import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import ButtonToggleUserStatus from '../components/ButtonToggleUserStatus';

export const COLUMNS = (refetch: any): ITableColumn[] => [
  { title: 'ID', key: '_id', align: 'left', className: 'w-[250px]' },
  {
    title: 'Username',
    key: 'username',
    align: 'left',
  },
  {
    title: 'Email',
    key: 'email',
    align: 'left',
  },
  {
    title: 'Avatar',
    key: 'updated_by',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center">
        <Image src={row?.avatar || '/images/no-image.svg'} alt="image" width={80} height={80} className="rounded" />
      </HStack>
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
    title: 'Email Verified',
    key: 'isEmailVerified',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center">
        {row?.isEmailVerified ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
      </HStack>
    ),
  },
  {
    title: 'Last Login',
    key: 'lastLogin',
    align: 'left',
    getCell: ({ row }) => (
      <div className="px-2 py-1 text-center">{row?.lastLogin ? format(new Date(row?.lastLogin), 'dd/MM/yyyy HH:mm') : 'Never'}</div>
    ),
  },
  {
    title: 'Ngày tạo',
    key: 'createdAt',
    align: 'left',
    getCell: ({ row }) => (
      <div className="px-2 py-1 text-center">{row?.createdAt ? format(new Date(row?.createdAt), 'dd/MM/yyyy HH:mm') : 'Never'}</div>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    align: 'center',
    className: 'w-[100px]',
    getCell: ({ row }) => <ButtonToggleUserStatus userId={row._id} isActive={row.isActive} refetch={refetch} />,
  },
];
