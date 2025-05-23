'use client';

import { useVouchersQuery } from '@/api/voucher/queries';
import type { IVoucherQuery } from '@/api/voucher/types';
import SearchTable from '@/components/SearchTable';
import H1 from '@/components/text/H1';
import TableBase, { TablePagination } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { useState } from 'react';
import FormCreateVoucher from './components/FormCreateVoucher';
import { COLUMNS } from './libs/consts';

const defaultQuery = {
  page: 1,
  limit: 10,
};

const VoucherManagementPage = () => {
  const [paramsQuery, setParamsQuery] = useState<Partial<IVoucherQuery>>(defaultQuery);

  const { data, isFetching, refetch } = useVouchersQuery({
    variables: paramsQuery,
  });

  return (
    <Container>
      <H1 className="mb-8 font-orbitron">Quản lý voucher</H1>
      <HStack pos="apart">
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

        <FormCreateVoucher refetch={refetch} />
      </HStack>

      <div className="my-6 min-h-[400px]">
        <TableBase loading={isFetching} columns={COLUMNS(refetch)} dataSource={data?.items || []} />
      </div>

      {data && (
        <TablePagination
          pagination={data?.meta}
          onPageChange={(page) => {
            setParamsQuery((prev) => ({
              ...prev,
              page,
            }));
          }}
        />
      )}
    </Container>
  );
};

export default VoucherManagementPage;
