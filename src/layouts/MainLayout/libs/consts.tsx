'use client';

import { ROUTER } from '@/libs/router';

import { Icons } from '@/assets/icons';
import { Brain, Cake, User, User2, Package } from 'lucide-react';

export const sidebars: {
  iconActive?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  link?: string;
  line?: boolean;
}[] = [
  {
    icon: <Icons.home />,
    title: 'Dashboard',
    link: ROUTER.HOME,
    iconActive: null,
  },
  {
    icon: <User2 />,
    title: 'Admin Management',
    link: ROUTER.ADMIN_MANAGEMENT,
    iconActive: null,
  },
  {
    icon: <User />,
    title: 'User Management',
    link: ROUTER.USER_MANAGEMENT,
    iconActive: null,
  },

  {
    line: true,
  } as any,
  {
    icon: <Cake />,
    title: 'Categories',
    link: ROUTER.CATEGORY_MANAGEMENT,
  },
  {
    icon: <Brain />,
    title: 'Brand Management',
    link: ROUTER.BRAND_MANAGEMENT,
  },
  {
    icon: <Package />,
    title: 'Product Management',
    link: ROUTER.PRODUCT_MANAGEMENT,
  },
  {
    line: true,
  } as any,
  {
    icon: <Package />,
    title: 'Voucher Management',
    link: ROUTER.VOUCHER_MANAGEMENT,
  },
  {
    icon: <Package />,
    title: 'Order Management',
    link: ROUTER.ORDER_MANAGEMENT,
  },
];
