import { Popover, PopoverContent } from '@/components/ui/popover';
import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Eye, MoreHorizontal, Pen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonDeleteProduct from '../components/ButtonDeleteProduct';

export const COLUMNS = (refetch: any): ITableColumn[] => [
  { title: 'ID', key: '_id', align: 'left', className: 'w-[250px]' },
  {
    title: 'Name',
    key: 'name',
    align: 'left',
    className: 'w-[250px]',
  },
  {
    title: 'Description',
    key: 'description',
    align: 'left',
    getCell: ({ row }) => (
      <div
        className="line-clamp-3 min-h-4 w-full px-2 py-1 font-medium text-[13px] text-grey-600"
        dangerouslySetInnerHTML={{ __html: row.description }}
      />
    ),
  },
  {
    title: 'Image',
    key: 'updated_by',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center">
        <Image src={row?.images?.[0] || '/images/no-image.svg'} alt="image" width={80} height={80} className="rounded" />
      </HStack>
    ),
  },
  {
    title: 'Total Sold Count',
    key: 'totalSoldCount',
    align: 'center',
  },
  {
    title: 'View Count',
    key: 'viewCount',
    align: 'center',
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
        <ButtonDeleteProduct {...row} refetch={refetch} />
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-36 p-2">
            <div className="flex flex-col gap-1">
              <Link
                href={`/products/${row._id}`}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-gray-700 text-sm hover:bg-gray-100"
              >
                <Eye className="h-4 w-4" />
                <span>View Detail</span>
              </Link>
              <Link
                href={`/products/${row._id}/edit`}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-blue-600 text-sm hover:bg-blue-50"
              >
                <Pen className="h-4 w-4" />
                <span>Edit</span>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </HStack>
    ),
  },
];
