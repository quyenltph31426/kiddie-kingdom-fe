'use client';
import { useAdminsQuery } from '@/api/admin/queries';
import type { IAdminQuery } from '@/api/admin/types';
import { useUsersQuery } from '@/api/user/queries';
import SearchTable from '@/components/SearchTable';
import H1 from '@/components/text/H1';
import TableBase, { TablePagination } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { onMutateError } from '@/libs/common';
import React, { useState } from 'react';
import FormCreateCategory from './components/FormCreateAdmin';
import { COLUMNS } from './libs/consts';

const defaultQuery = {
  page: 1,
  limit: 10,
};
const UserManagementPage = () => {
  const [paramsQuery, setParamsQuery] = useState<Partial<IAdminQuery>>(defaultQuery);

  const { data, isFetching, refetch } = useUsersQuery({
    variables: paramsQuery,
    onError: onMutateError,
  });

  return (
    <Container>
      <H1 className="mb-8 font-orbitron">User management</H1>
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

        <FormCreateCategory refetch={refetch} />
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

export default UserManagementPage;
