'use client';

import { useOrderByIdQuery } from '@/api/order/queries';
import Breadcrumb from '@/components/Breadcrumb';
import H2 from '@/components/text/H2';
import { Button } from '@/components/ui/button';
import Container from '@/components/wrapper/Container';
import { ROUTER } from '@/libs/router';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PaymentCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status');
  const [isLoading, setIsLoading] = useState(true);

  const { data: order, refetch } = useOrderByIdQuery({
    variables: orderId || '',
    enabled: !!orderId,
  });

  useEffect(() => {
    if (orderId) {
      const checkPaymentStatus = async () => {
        await refetch();
        setIsLoading(false);
      };

      checkPaymentStatus();
    } else {
      setIsLoading(false);
    }
  }, [orderId, refetch]);

  if (isLoading) {
    return <>Loading</>;
  }

  const isSuccess = status === 'success' || (order && order.status !== 'cancelled');

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-10">
      <Breadcrumb
        breadcrumbs={[{ name: 'Home', path: ROUTER.HOME }, { name: 'Payment', path: ROUTER.ORDERS }, { name: 'Result' }]}
        className="bg-white"
      />

      <Container className="mt-8">
        <div className="rounded-lg bg-white p-8 text-center">
          {isSuccess ? (
            <>
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
              <H2 className="mb-4">Payment Successful</H2>
              <p className="mb-6 text-gray-600">Your payment has been processed successfully. Thank you for your purchase!</p>
            </>
          ) : (
            <>
              <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
              <H2 className="mb-4">Payment Failed</H2>
              <p className="mb-6 text-gray-600">We couldn't process your payment. Please try again or contact customer support.</p>
            </>
          )}

          <div className="mt-6 flex justify-center gap-4">
            {orderId && (
              <Link href={`${ROUTER.ORDERS}/${orderId}`}>
                <Button variant="outline">View Order Details</Button>
              </Link>
            )}
            <Link href={ROUTER.HOME}>
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentCallbackPage;
