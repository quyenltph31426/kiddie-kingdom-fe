'use client';

import { useCreateOrderMutation } from '@/api/order/queries';
import NotFound from '@/components/404';
import Breadcrumb from '@/components/Breadcrumb';
import H3 from '@/components/text/H3';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import Container from '@/components/wrapper/Container';
import { ROUTER } from '@/libs/router';
import { formatNumber } from '@/libs/utils';
import { useCartStore } from '@/stores/CartStore';
import { useCheckoutStore } from '@/stores/CheckoutStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import OrderSummary from './components/OrderSummary';
import PaymentMethod from './components/PaymentMethod';
import ShippingForm from './components/ShippingForm';
import { type OrderSchema, orderSchema } from './libs/validators';

const PageCheckout = () => {
  const router = useRouter();
  const form = useForm<OrderSchema>({
    defaultValues: {
      items: [],
      paymentMethod: 'CASH_ON_DELIVERY',
      shippingAddress: {
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        district: '',
        ward: '',
        postalCode: '',
        isDefault: true,
      },
      voucherId: '',
    },
  });
  const { items, clearCheckout } = useCheckoutStore();
  const { removeMultipleFromCart } = useCartStore(); // Import removeMultipleFromCart from CartStore





  if (items.length === 0) {
    return <NotFound />;
  }


};

export default PageCheckout;
