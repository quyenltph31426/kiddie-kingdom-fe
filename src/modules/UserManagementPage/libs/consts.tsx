import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import Image from 'next/image';
import ButtonDeleteCategory from '../components/ButtonDeleteAdmin';
import FormEditCategory from '../components/FormEditAdmin';

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
    title: 'Role',
    key: 'role',
    align: 'left',
  },
  {
    title: 'Created At',
    key: 'createdAt',
    align: 'left',
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    className: 'w-[200px]',
    getCell: ({ row }) => (
      <HStack pos="center" noWrap spacing={20}>
        <ButtonDeleteCategory {...row} refetch={refetch} />

        <FormEditCategory _id={row._id} refetch={refetch} />
      </HStack>
    ),
  },
];
