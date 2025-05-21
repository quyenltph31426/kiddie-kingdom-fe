'use client';

import { ROUTER } from '@/libs/router';

import { Icons } from '@/assets/icons';
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  ImageIcon,
  ListOrdered,
  Briefcase,
  ShoppingBag,
  Tag,
  ShoppingCart,
  TicketPercent,
} from 'lucide-react';

export const sidebars: {
  iconActive?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  link?: string;
  line?: boolean;
}[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: 'Tổng Quan',
    link: ROUTER.HOME,
    iconActive: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Quản Lý Admin',
    link: ROUTER.ADMIN_MANAGEMENT,
    iconActive: <ShieldCheck className="h-5 w-5 text-white" />,
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Quản Lý Người Dùng',
    link: ROUTER.USER_MANAGEMENT,
    iconActive: <Users className="h-5 w-5 text-white" />,
  },
  {
    icon: <ImageIcon className="h-5 w-5" />,
    title: 'Quản Lý Banner',
    link: ROUTER.BANNERS_MANAGEMENT,
    iconActive: <ImageIcon className="h-5 w-5 text-white" />,
  },

  {
    line: true,
  } as any,
  {
    icon: <ListOrdered className="h-5 w-5" />,
    title: 'Quản Lý Danh Mục',
    link: ROUTER.CATEGORY_MANAGEMENT,
    iconActive: <ListOrdered className="h-5 w-5 text-white" />,
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: 'Quản Lý Thương Hiệu',
    link: ROUTER.BRAND_MANAGEMENT,
    iconActive: <Briefcase className="h-5 w-5 text-white" />,
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    title: 'Quản Lý Sản Phẩm',
    link: ROUTER.PRODUCT_MANAGEMENT,
    iconActive: <ShoppingBag className="h-5 w-5 text-white" />,
  },
  {
    line: true,
  } as any,
  {
    icon: <TicketPercent className="h-5 w-5" />,
    title: 'Quản Lý Voucher',
    link: ROUTER.VOUCHER_MANAGEMENT,
    iconActive: <TicketPercent className="h-5 w-5 text-white" />,
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: 'Quản Lý Đơn Hàng',
    link: ROUTER.ORDER_MANAGEMENT,
    iconActive: <ShoppingCart className="h-5 w-5 text-white" />,
  },
];
