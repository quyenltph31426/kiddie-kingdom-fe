import React from 'react';

import { Icons } from '@/assets/icons';
import { VStack } from './utilities';

type Props = {
  message?: string;
};
const NoDataAvailable = ({ message }: Props) => {
  return (
    <VStack spacing={16} align="center">
      <span>
        <Icons.noData />
      </span>
      <span className="font-semibold text-grey-500 text-sm">{message || 'No data available!'}</span>
    </VStack>
  );
};

export default NoDataAvailable;
