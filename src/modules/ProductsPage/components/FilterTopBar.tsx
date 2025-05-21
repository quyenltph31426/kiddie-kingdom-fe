import SelectCustom from '@/components/ui/select-custom';
import { HStack } from '@/components/utilities';
import React from 'react';
import { FILTER_LIST } from '../libs/consts';

type Props = {
  total: number;
};
const FilterTopBar = ({ total }: Props) => {
  return (
    <HStack pos="apart" noWrap className="text-sm">
      <span></span>

      <span>{total || 0} sản phẩm</span>

      <HStack>
        Sắp xếp: <SelectCustom data={FILTER_LIST} />
      </HStack>
    </HStack>
  );
};

export default FilterTopBar;
