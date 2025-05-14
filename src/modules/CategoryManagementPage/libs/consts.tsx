import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import Image from 'next/image';
import ButtonDeleteCategory from '../components/ButtonDeleteCategory';
import FormEditCategory from '../components/FormEditCategory';

export const COLUMNS = (refetch: any): ITableColumn[] => [
  { title: 'ID', key: '_id', align: 'left', className: 'w-[250px]' },
  {
    title: 'Name',
    key: 'name',
    align: 'left',
  },
  {
    title: 'Description',
    key: 'description',
    align: 'left',
  },
  {
    title: 'Image',
    key: 'updated_by',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center">
        <Image src={row?.image || ''} alt="image" width={80} height={80} className="rounded" />
      </HStack>
    ),
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
