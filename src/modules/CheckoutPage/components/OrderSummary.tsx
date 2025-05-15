'use client';

import { useCheckoutStore } from '@/stores/CheckoutStore';
import { formatNumber } from '@/libs/utils';
import { Separator } from '@/components/ui/separator';
import { TextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';

const OrderSummary = () => {
  const { subtotal, shippingFee, discount, total, setDiscount } = useCheckoutStore();
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const couponForm = useForm();

  const handleApplyCoupon = (data: any) => {
    // Mock coupon application - replace with actual API call
    setIsApplyingCoupon(true);

    setTimeout(() => {
      if (data.couponCode === 'DISCOUNT10') {
        setDiscount(subtotal * 0.1); // 10% discount
        toast.success('Coupon applied successfully!');
      } else {
        toast.error('Invalid coupon code');
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  return (
    <div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatNumber(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shippingFee > 0 ? formatNumber(shippingFee) : 'Free'}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatNumber(discount)}</span>
          </div>
        )}
      </div>

      <div className="my-4">
        <form onSubmit={couponForm.handleSubmit(handleApplyCoupon)} className="flex space-x-2">
          <TextField control={couponForm.control} name="couponCode" placeholder="Enter coupon code" className="flex-1" />
          <Button type="submit" variant="outline" size="sm" loading={isApplyingCoupon}>
            Apply
          </Button>
        </form>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-medium text-lg">
        <span>Total</span>
        <span className="text-primary-600">{formatNumber(total)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
