'use client';

import { RadioGroupField } from '@/components/form';
import { useCheckoutStore } from '@/stores/CheckoutStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const paymentSchema = z.object({
  paymentMethod: z.string().min(1, 'Please select a payment method'),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const paymentMethods = [
  {
    value: 'credit_card',
    label: 'Credit Card',
    image: '/images/payment/credit-card.png',
  },
  {
    value: 'paypal',
    label: 'PayPal',
    image: '/images/payment/paypal.png',
  },
  {
    value: 'bank_transfer',
    label: 'Bank Transfer',
    image: '/images/payment/bank-transfer.png',
  },
  {
    value: 'cash_on_delivery',
    label: 'Cash on Delivery',
    image: '/images/payment/cod.png',
  },
];

const PaymentMethod = () => {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: paymentMethod.type || 'credit_card',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.paymentMethod) {
        // setPaymentMethod(value.paymentMethod.);
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch, setPaymentMethod]);

  return (
    <div>
      <RadioGroupField
        control={form.control}
        name="paymentMethod"
        data={paymentMethods.map((method) => ({
          value: method.value,
          label: (
            <div className="flex items-center space-x-3">
              <div className="h-8 w-12 flex-shrink-0">
                <Image src={method.image} alt={method.label} width={48} height={32} className="h-full w-full object-contain" />
              </div>
              <span>{method.label}</span>
            </div>
          ),
        }))}
        className="space-y-3"
      />
    </div>
  );
};

export default PaymentMethod;
