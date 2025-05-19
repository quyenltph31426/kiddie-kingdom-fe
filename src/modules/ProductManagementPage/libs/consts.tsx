import { Popover, PopoverContent } from '@/components/ui/popover';
import type { ITableColumn } from '@/components/ui/table';
import { TooltipComponent } from '@/components/ui/tooltip';
import { HStack } from '@/components/utilities';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { Eye, Info, MoreHorizontal, Pen, Star } from 'lucide-react';
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
    title: 'Average Rating',
    key: 'averageRating',
    align: 'center',
    getCell: ({ row }) => (
      <div className="flex items-center px-2 py-1 text-center">
        {row?.averageRating?.toFixed(1) || '0.0'} <Star className="ml-1 h-4 w-4 text-yellow-400" />{' '}
      </div>
    ),
  },
  {
    title: 'Review Count',
    key: 'reviewCount',
    align: 'center',
  },
  {
    title: 'Created At',
    key: 'createdAt',
    align: 'left',
    getCell: ({ row }) => (
      <div className="px-2 py-1 text-center text-xs">{row?.createdAt ? format(new Date(row?.createdAt), 'dd/MM/yyyy HH:mm') : 'Never'}</div>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    className: 'w-[200px]',
    getCell: ({ row }) => (
      <HStack pos="center" noWrap spacing={20}>
        {row.totalSoldCount > 0 ? (
          <>
            <TooltipComponent content="Cannot delete product that has been sold!">
              <Info />
            </TooltipComponent>
          </>
        ) : (
          <ButtonDeleteProduct {...row} refetch={refetch} />
        )}

        <Popover>
          <PopoverTrigger asChild>
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-36 p-2">
            <div className="flex flex-col gap-1">
              <Link
                href={`/products/${row._id}/reviews`}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-gray-700 text-sm hover:bg-gray-100"
              >
                <Eye className="h-4 w-4" />
                <span>View Reviewer</span>
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
