import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import Image from 'next/image';
import ButtonDeleteBanner from '../components/ButtonDeleteBanner';
import FormEditBanner from '../components/FormEditBanner';

export const COLUMNS = (refetch: any): ITableColumn[] => [
  { title: 'ID', key: '_id', align: 'left', className: 'w-[200px]' },
  {
    title: 'Title',
    key: 'title',
    align: 'left',
  },
  {
    title: 'Subtitle',
    key: 'subtitle',
    align: 'left',
  },
  {
    title: 'Image',
    key: 'image',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center">
        <Image src={row?.image || ''} alt={row?.title || 'banner'} width={120} height={60} className="rounded object-cover" />
      </HStack>
    ),
  },
  {
    title: 'Type',
    key: 'type',
    align: 'center',
    getCell: ({ row }) => <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">{row?.type?.replace('_', ' ')}</span>,
  },
  {
    title: 'Order',
    key: 'order',
    align: 'center',
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
        <FormEditBanner _id={row?._id} refetch={refetch} />
        <ButtonDeleteBanner _id={row?._id} refetch={refetch} />
      </HStack>
    ),
  },
];
