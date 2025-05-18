import { useVerifyVoucherMutation } from '@/api/voucher/mutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/libs/utils';
import { useCheckoutStore } from '@/stores/CheckoutStore';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

const OrderSummary = () => {
  const form = useFormContext();
  const { subtotal, shippingFee, discount, total, setDiscount } = useCheckoutStore();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Use verify voucher mutation
  const { mutate: verifyVoucher, isLoading: isVerifying } = useVerifyVoucherMutation({
    onSuccess: (data) => {
      if (data.valid && data.voucher) {
        // Set the discount and voucher ID in the checkout store
        setDiscount(Number(data.discountAmount));

        // Set the voucher ID in the form
        form.setValue('voucherId', data.voucher._id);

        toast.success(`Voucher ${data.voucher.code} applied successfully!`);
      } else {
        toast.error('Invalid or expired voucher code');
      }
      setIsApplyingCoupon(false);
    },
    onError: (error) => {
      toast.error('Failed to verify voucher. Please try again.');
      console.error('Voucher verification error:', error);
      setIsApplyingCoupon(false);
    },
  });

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a voucher code');
      return;
    }

    setIsApplyingCoupon(true);

    // Call the verify voucher API
    verifyVoucher({
      code: couponCode.trim(),
      orderAmount: subtotal,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-lg">Order Summary</h3>

      <div className="mb-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatNumber(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Fee</span>
          <span>{formatNumber(shippingFee)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatNumber(discount)}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatNumber(total)}</span>
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <div className="mr-2 flex-1">
          <Input placeholder="Enter voucher code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1" />
        </div>
        <Button type="button" size="sm" variant="shadow" disabled={isApplyingCoupon} onClick={handleApplyCoupon}>
          {isApplyingCoupon ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying
            </>
          ) : (
            'Apply'
          )}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
