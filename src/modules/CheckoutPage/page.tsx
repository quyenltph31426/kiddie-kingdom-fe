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

  const { mutate: createOrder, isLoading } = useCreateOrderMutation({
    onSuccess: (data) => {
      // Get the IDs of items that were successfully ordered
      const orderedItemIds = items.map((item) => item._id).filter(Boolean);

      // Remove these items from the cart
      if (orderedItemIds.length > 0) {
        removeMultipleFromCart(orderedItemIds);
      }

      if (data.paymentMethod === 'ONLINE_PAYMENT' && data?.paymentSession) {
        window.location.href = data.paymentSession?.url;
        clearCheckout();
      } else {
        router.push(`${ROUTER.ORDERS}/${data._id}`);
        toast.success('Tạo mới đơn hàng thành công!');
        clearCheckout();
      }
    },
    onError: (error) => {
      toast.error('Tạo mới đơn hàng thất bại!');
    },
  });

  const handleSubmitOrder = (formData: OrderSchema) => {
    const { items } = useCheckoutStore.getState();

    const orderData = {
      items: items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
      paymentMethod: formData.paymentMethod,
      shippingAddress: formData.shippingAddress,
      voucherId: formData.voucherId || undefined,
    };

    const validationResult = orderSchema.safeParse(orderData);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();

      // Hiển thị thông báo lỗi
      const firstError = validationResult.error.errors[0];
      toast.error(firstError?.message || 'Please check your order information');
      return;
    }

    // Nếu validation thành công, gửi request tạo đơn hàng
    createOrder(orderData);
  };

  if (items.length === 0) {
    return <NotFound />;
  }


};

export default PageCheckout;
