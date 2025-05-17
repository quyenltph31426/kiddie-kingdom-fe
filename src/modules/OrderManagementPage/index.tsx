'use client';
import { useOrdersQuery } from '@/api/order/queries';
import type { IOrderQuery } from '@/api/order/types';
import SearchTable from '@/components/SearchTable';
import H3 from '@/components/text/H3';
import { DateRangePicker } from '@/components/ui/date-range-picker/index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TableBase, { TablePagination } from '@/components/ui/table';
import { HStack, VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { COLUMNS, ORDER_STATUS_OPTIONS, defaultQuery } from './libs/consts';

const OrderManagementPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
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

  const handleSearch = () => {
    setParamsQuery((prev) => ({
      ...prev,
      orderNumber: searchText || undefined,
      page: 1,
    }));
  };

  const handleStatusChange = (status: string) => {
    setParamsQuery((prev) => ({
      ...prev,
      status: status === 'ALL' ? undefined : (status as any),
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

  return (
    <Container>
      <VStack spacing={24}>
        <HStack pos="apart">
          <H3>Order Management</H3>
        </HStack>

        <VStack spacing={12}>
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
                initialDateFrom={paramsQuery.startDate ? new Date(paramsQuery.startDate) : undefined}
                initialDateTo={paramsQuery.endDate ? new Date(paramsQuery.endDate) : undefined}
                align="start"
                locale="en-US"
                btnProps={{
                  variant: 'outline',
                  className: 'h-10 w-full sm:w-[300px]',
                }}
                prefix="Date Range:"
              />

              <Select defaultValue="ALL" onValueChange={handleStatusChange} value={paramsQuery.status || 'ALL'}>
                <SelectTrigger className="h-10 w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Orders</SelectItem>
                  {ORDER_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </HStack>
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
