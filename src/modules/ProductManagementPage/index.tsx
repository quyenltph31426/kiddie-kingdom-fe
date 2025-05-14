'use client';
import { useProductsQuery } from '@/api/product/queries';
import type { IProductQuery } from '@/api/product/types';
import { Icons } from '@/assets/icons';
import SearchTable from '@/components/SearchTable';
import H1 from '@/components/text/H1';
import { Button } from '@/components/ui/button';
import TableBase, { TablePagination } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { ROUTER } from '@/libs/router';
import Link from 'next/link';
import React, { useState } from 'react';
import { COLUMNS } from './libs/consts';

const defaultQuery = {
  page: 1,
  limit: 10,
};
const ProductManagementPage = () => {
  const [paramsQuery, setParamsQuery] = useState<Partial<IProductQuery>>(defaultQuery);

  const { data, isFetching, refetch } = useProductsQuery({
    variables: paramsQuery,
    refetchOnMount: true,
  });

  return (
    <Container>
      <H1 className="mb-8 font-orbitron">Product management</H1>
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

        {/* <FormCreateCategory refetch={refetch} /> */}
        <Link href={ROUTER.CREATE_PRODUCT}>
          <Button>
            <Icons.plus />
            Create
          </Button>
        </Link>
      </HStack>

      <div className="my-6 min-h-[400px]">
        <TableBase loading={isFetching} columns={COLUMNS(refetch)} dataSource={data?.items || []} />
      </div>

      <TablePagination
        onPageChange={(page) => setParamsQuery({ ...paramsQuery, page })}
        loading={isFetching}
        onPageSizeChange={(pageSize) => setParamsQuery({ ...paramsQuery, page: 1, limit: pageSize })}
        pagination={{
          ...data?.meta,
          limit: Number(paramsQuery.limit),
          page: Number(paramsQuery.page),
        }}
      />
    </Container>
  );
};

export default ProductManagementPage;
