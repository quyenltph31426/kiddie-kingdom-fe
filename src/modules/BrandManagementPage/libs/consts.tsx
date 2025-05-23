import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import Image from 'next/image';
import ButtonDeleteCategory from '../components/ButtonDeleteBrand';
import FormEditCategory from '../components/FormEditBrand';

export const COLUMNS = (refetch: any): ITableColumn[] => [
  { title: 'ID', key: '_id', align: 'left', className: 'w-[250px]' },
  {
    title: 'Tên thương hiệu',
    key: 'name',
    align: 'left',
  },
  {
    title: 'Website',
    key: 'website',
    align: 'left',
  },
  {
    title: 'Mô tả',
    key: 'description',
    align: 'left',
  },
  {
    title: 'Logo',
    key: 'updated_by',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center">
        <Image src={row?.logo || ''} alt="image" width={80} height={80} className="rounded" />
      </HStack>
    ),
  },
  {
    title: 'Ngày tạo',
    key: 'createdAt',
    align: 'left',
  },
  {
    title: 'Hành động',
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
