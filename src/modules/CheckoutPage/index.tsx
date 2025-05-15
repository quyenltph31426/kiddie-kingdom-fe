'use client';

import NotFound from '@/components/404';
import Breadcrumb from '@/components/Breadcrumb';
import H3 from '@/components/text/H3';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import Container from '@/components/wrapper/Container';
import { ROUTER } from '@/libs/router';
import { formatNumber } from '@/libs/utils';
import { useCheckoutStore } from '@/stores/CheckoutStore';
import { useUserStore } from '@/stores/UserStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import OrderSummary from './components/OrderSummary';
import PaymentMethod from './components/PaymentMethod';
import ShippingForm from './components/ShippingForm';

const CheckoutPage = () => {
  const router = useRouter();
  const form = useForm();
  const { user } = useUserStore();
  const { items, shippingAddress, paymentMethod, subtotal, shippingFee, discount, total } = useCheckoutStore();

  // If no items in checkout, show NotFound page

  const handleSubmitOrder = () => {
    // Validate shipping address
    const requiredFields = ['fullName', 'phoneNumber', 'email', 'address', 'city'];
    const missingFields = requiredFields.filter((field) => !shippingAddress[field as keyof typeof shippingAddress]);

    if (missingFields.length > 0) {
      toast.error('Please complete all required shipping information');
      return;
    }

    // Here you would submit the order to your API
    toast.success('Order placed successfully!');

    // Navigate to confirmation page or order status page
    // router.push(ROUTER.ORDER_CONFIRMATION);
  };

  if (items.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="bg-[#F5F5F5] pb-10">
      <Breadcrumb
        breadcrumbs={[{ name: 'Home', path: ROUTER.HOME }, { name: 'Cart', path: ROUTER.CART }, { name: 'Checkout' }]}
        className="bg-white"
      />

      <Container className="mt-8">
        <H3>Checkout</H3>

        <FormWrapper form={form} onSubmit={handleSubmitOrder}>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left column - Shipping & Payment */}
            <div className="col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="rounded bg-white p-6">
                <h4 className="mb-4 font-medium text-lg">Shipping Information</h4>
                <ShippingForm />
              </div>

              {/* Payment Method */}
              <div className="rounded bg-white p-6">
                <h4 className="mb-4 font-medium text-lg">Payment Method</h4>
                <PaymentMethod />
              </div>

              {/* Order Items */}
              <div className="rounded bg-white p-6">
                <h4 className="mb-4 font-medium text-lg">Order Items</h4>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-start gap-4">
                      {item.image && (
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border">
                          <Image src={item.image} alt={item.name} width={64} height={64} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="line-clamp-1 font-medium">{item.name}</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {item.attributes &&
                            Object.entries(item.attributes).map(([key, value]) => (
                              <div key={key} className="rounded bg-primary-100 px-2 py-1 text-xs">
                                {value}
                              </div>
                            ))}
                        </div>
                        <div className="mt-1 text-gray-500 text-sm">
                          {formatNumber(item.price)} x {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">{formatNumber(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Order Summary */}
            <div className="col-span-1">
              <div className="sticky top-6 rounded bg-white p-6">
                <h4 className="mb-4 font-medium text-lg">Order Summary</h4>
                <OrderSummary />

                <Button type="submit" className="mt-6 w-full">
                  Place Order
                </Button>

                <Link href={ROUTER.CART} className="mt-4 block text-center text-gray-500 text-sm hover:text-primary-600">
                  Return to Cart
                </Link>
              </div>
            </div>
          </div>
        </FormWrapper>
      </Container>
    </div>
  );
};

export default CheckoutPage;
