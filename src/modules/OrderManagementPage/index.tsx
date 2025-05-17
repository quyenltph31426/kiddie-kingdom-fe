'use client';
import { useOrdersQuery } from '@/api/order/queries';
import type { IOrderQuery } from '@/api/order/types';
import SearchTable from '@/components/SearchTable';
import H3 from '@/components/text/H3';
import { DateRangePicker } from '@/components/ui/date-range-picker/index';
import SelectCustom from '@/components/ui/select-custom';
import TableBase, { TablePagination } from '@/components/ui/table';
import { HStack, VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  COLUMNS,
  ORDER_STATUS_OPTIONS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_OPTIONS,
  SHIPPING_STATUS_OPTIONS,
  defaultQuery,
} from './libs/consts';

const OrderManagementPage = () => {
  const [paramsQuery, setParamsQuery] = useState<Partial<IOrderQuery>>(defaultQuery);

  const { data, isFetching, refetch } = useOrdersQuery({
    variables: paramsQuery,
  });

  const handlePageChange = (page: number) => {
    setParamsQuery((prev) => ({
      ...prev,
      page,
    }));
  };

  const handlePageSizeChange = (limit: number) => {
    setParamsQuery((prev) => ({
      ...prev,
      page: 1,
      limit,
    }));
  };

  const handleOrderStatusChange = (selected: any) => {
    setParamsQuery((prev) => ({
      ...prev,
      status: selected.value === 'ALL' ? undefined : selected.value,
      page: 1,
    }));
  };

  const handlePaymentStatusChange = (selected: any) => {
    setParamsQuery((prev) => ({
      ...prev,
      paymentStatus: selected.value === 'ALL' ? undefined : selected.value,
      page: 1,
    }));
  };

  const handleShippingStatusChange = (selected: any) => {
    setParamsQuery((prev) => ({
      ...prev,
      shippingStatus: selected.value === 'ALL' ? undefined : selected.value,
      page: 1,
    }));
  };

  const handlePaymentMethodChange = (selected: any) => {
    setParamsQuery((prev) => ({
      ...prev,
      paymentMethod: selected.value === 'ALL' ? undefined : selected.value,
      page: 1,
    }));
  };

  const handleDateRangeChange = (values: any) => {
    if (values.range) {
      setParamsQuery((prev) => ({
        ...prev,
        startDate: format(values.range.from, 'yyyy-MM-dd'),
        endDate: format(new Date(values.range.to.setHours(23, 59, 0, 0)), 'yyyy-MM-dd HH:mm:ss'),
        page: 1,
      }));
    } else {
      // Clear date filters if no range is selected
      const { startDate, endDate, ...rest } = paramsQuery;
      setParamsQuery(rest);
    }
  };

  // Prepare data for SelectCustom components
  const orderStatusOptions = [
    { label: 'All Order Status', value: 'ALL' },
    ...ORDER_STATUS_OPTIONS.map((option) => ({ label: option.label, value: option.value })),
  ];

  const paymentStatusOptions = [
    { label: 'All Payment Status', value: 'ALL' },
    ...PAYMENT_STATUS_OPTIONS.map((option) => ({ label: option.label, value: option.value })),
  ];

  const shippingStatusOptions = [
    { label: 'All Shipping Status', value: 'ALL' },
    ...SHIPPING_STATUS_OPTIONS.map((option) => ({ label: option.label, value: option.value })),
  ];

  const paymentMethodOptions = [
    { label: 'All Payment Methods', value: 'ALL' },
    ...Object.entries(PAYMENT_METHOD_LABELS).map(([value, label]) => ({ label, value })),
  ];

  return (
    <Container>
      <VStack spacing={32}>
        <HStack pos="apart">
          <H3>Order Management</H3>
        </HStack>

        <VStack spacing={16}>
          <HStack pos="apart" className="flex-col gap-4 sm:flex-row">
            <SearchTable
              listFilter={[]}
              loading={isFetching}
              onSearch={({ key, value }) => {
                if (key === 'all') {
                  setParamsQuery((prev) => ({
                    ...prev,
                    page: 1,
                    search: value,
                  }));
                  return;
                }
                if (value) {
                  setParamsQuery((prev) => ({
                    ...prev,
                    page: 1,
                    search_all: '',
                    search_by: key,
                    search_key: value,
                  }));
                } else {
                  setParamsQuery(defaultQuery);
                }
              }}
            />

            <HStack pos="apart" className="flex-col gap-4 sm:flex-row">
              <DateRangePicker
                onUpdate={handleDateRangeChange}
                initialDateFrom={paramsQuery.startDate ? format(new Date(paramsQuery.startDate), 'yyyy-MM-dd') : undefined}
                initialDateTo={paramsQuery.endDate ? format(new Date(paramsQuery.endDate), 'yyyy-MM-dd') : undefined}
                align="start"
                locale="en-US"
                btnProps={{
                  variant: 'outline',
                  className: 'h-10 w-full sm:w-[300px]',
                }}
              />
            </HStack>
          </HStack>

          <HStack className="flex-wrap gap-4" pos="right">
            {/* Payment Method Filter */}
            <div className="w-full sm:w-[180px]">
              <SelectCustom
                data={paymentMethodOptions}
                value={paramsQuery.paymentMethod || 'ALL'}
                onChange={handlePaymentMethodChange}
                placeholder="Payment Method"
              />
            </div>

            {/* Payment Status Filter */}
            <div className="w-full sm:w-[180px]">
              <SelectCustom
                data={paymentStatusOptions}
                value={paramsQuery.paymentStatus || 'ALL'}
                onChange={handlePaymentStatusChange}
                placeholder="Payment Status"
              />
            </div>

            {/* Shipping Status Filter */}
            <div className="w-full sm:w-[180px]">
              <SelectCustom
                data={shippingStatusOptions}
                value={paramsQuery.shippingStatus || 'ALL'}
                onChange={handleShippingStatusChange}
                placeholder="Shipping Status"
              />
            </div>
          </HStack>
        </VStack>

        <TableBase
          columns={COLUMNS(refetch)}
          dataSource={data?.items}
          loading={isFetching}
          // onRowClick={(row) => router.push(`${ROUTER.ORDER_MANAGEMENT}/${row._id}`)}
        />

        <TablePagination
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pagination={data?.meta || {}}
          loading={isFetching}
        />
      </VStack>
    </Container>
  );
};

export default OrderManagementPage;
