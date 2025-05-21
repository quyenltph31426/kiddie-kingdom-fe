import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent } from '@/components/ui/popover';
import type { ITableColumn } from '@/components/ui/table';
import { TooltipComponent } from '@/components/ui/tooltip';
import { HStack } from '@/components/utilities';
import { formatNumber } from '@/libs/utils';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { Check, Eye, Info, MoreHorizontal, Pen, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonDeleteProduct from '../components/ButtonDeleteProduct';

export const COLUMNS = (refetch: any): ITableColumn[] => [
  { title: 'ID', key: '_id', align: 'left', className: 'w-[250px]' },
  {
    title: 'Tên sản phẩm',
    key: 'name',
    align: 'left',
    className: 'w-[250px]',
  },
  {
    title: 'Danh mục',
    key: 'primaryCategory',
    align: 'left',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{row?.primaryCategory?.name}</div>,
  },
  {
    title: 'Thương hiệu',
    key: 'brand',
    align: 'left',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{row?.brand?.name}</div>,
  },
  {
    title: 'Avatar',
    key: 'updated_by',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center">
        <Image src={row?.images?.[0] || '/images/no-image.svg'} alt="image" width={80} height={80} className="rounded" />
      </HStack>
    ),
  },
  {
    title: 'Giá nhập',
    key: 'currentPrice',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatNumber(row?.currentPrice)}</div>,
  },
  {
    title: 'Giá bán',
    key: 'originalPrice',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatNumber(row?.originalPrice)}</div>,
  },
  {
    title: 'Số lượng',
    key: 'totalQuantity',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatNumber(row?.totalQuantity)}</div>,
  },
  {
    title: 'Số lượng đã bán',
    key: 'totalSoldCount',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatNumber(row?.totalSoldCount)}</div>,
  },
  {
    title: 'Lượt xem',
    key: 'viewCount',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatNumber(row?.viewCount)}</div>,
  },
  {
    title: 'Đánh giá',
    key: 'averageRating',
    align: 'center',
    getCell: ({ row }) => (
      <div className="flex items-center px-2 py-1 text-center">
        {row?.averageRating?.toFixed(1) || '0.0'} <Star className="ml-1 h-4 w-4 text-yellow-400" />{' '}
      </div>
    ),
  },
  {
    title: 'Số lượng đánh giá',
    key: 'reviewCount',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatNumber(row?.reviewCount)}</div>,
  },
  {
    title: 'Ngày tạo',
    key: 'createdAt',
    align: 'left',
    getCell: ({ row }) => (
      <div className="px-2 py-1 text-center text-xs">{row?.createdAt ? format(new Date(row?.createdAt), 'dd/MM/yyyy HH:mm') : 'Never'}</div>
    ),
  },
  {
    title: 'Sản phẩm mới',
    key: 'isNewArrival',
    align: 'center',
    getCell: ({ row }) => (
      <div className="px-2 py-1 text-center">
        <Badge variant="outline">{row?.isNewArrival ? <Check /> : <X />}</Badge>
      </div>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    align: 'center',
    className: 'w-[200px]',
    getCell: ({ row }) => (
      <HStack pos="center" noWrap spacing={20}>
        {row.totalSoldCount > 0 ? (
          <>
            <TooltipComponent content="Không thể xóa sản phẩm đã có người mua!">
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

          <PopoverContent className="w-40 p-2">
            <div className="flex flex-col gap-1">
              <Link
                href={`/products/${row._id}/reviews`}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-gray-700 text-sm hover:bg-gray-100"
              >
                <Eye className="h-4 w-4" />
                <span>Xem đánh giá</span>
              </Link>
              <Link
                href={`/products/${row._id}/edit`}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-blue-600 text-sm hover:bg-blue-50"
              >
                <Pen className="h-4 w-4" />
                <span>Chỉnh sửa</span>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </HStack>
    ),
  },
];
