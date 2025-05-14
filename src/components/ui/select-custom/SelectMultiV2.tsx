import React, { useMemo } from 'react';
import type { Props as StateManagerProps } from 'react-select';
import Select from 'react-select';

interface IData {
  label: string;
  value: string;
  image?: string;
  group?: string;
}

export type SelectMultiCustomProps = {
  value?: string[];
  height?: string | number;
  data?: IData[];
  onChange?: (data: IData[]) => void;
  onValueChange?: (value: string[]) => void;
  isError?: boolean;
  maxMenuHeight?: number;
  placeholder?: string;
} & Omit<StateManagerProps, 'options' | 'onChange' | 'value' | 'placeholder'>;

const SelectMultiCustom = ({
  value,
  defaultValue,
  onValueChange,
  onChange,
  data = [],
  isError,
  maxMenuHeight,
  ...props
}: SelectMultiCustomProps) => {
  const _value: any = useMemo(() => {
    if (!value || !data) return [];
    // eslint-disable-next-line consistent-return
    return data?.filter((item) => value.includes(item.value));
  }, [value, data]);

  // const _defaultValue: any = useMemo(() => {
  //   if (!defaultValue || !data) return undefined;
  //   // eslint-disable-next-line consistent-return
  //   return data.find((x) => x.value === defaultValue) || undefined;
  // }, [defaultValue, data]);

  return (
    <Select
      openMenuOnClick
      isMulti
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          height: props.height || '42px',
          minHeight: '36px !important',
          fontSize: '14px',
          backgroundColor: '#FAFAFA26 !important',
          borderColor: isError ? '#E0384B' : state.isFocused ? '#00A061 !important' : '#e7e7e7 !important',
          boxShadow: isError
            ? '0px 0px 0px 4px #E0384B40'
            : state.isFocused
              ? '0px 0px 0px 4px #38E09640 !important'
              : '0px 1px 2px 0px #1018280D !important',
          borderRadius: '8px',
          overflow: 'hidden',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '8px',
          overflow: 'hidden',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          maxHeight: maxMenuHeight ? `${maxMenuHeight}px !important` : undefined,
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: '#8a5136 !important',
        }),
        indicatorSeparator: (baseStyles, state) => ({
          display: 'none',
        }),
        placeholder: (defaultStyles) => {
          return {
            ...defaultStyles,
            fontSize: '14px',
            fontWeight: 400,
            color: '#8A513659',
          };
        },
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#dfcea8',
          primary: '#fd3654',
        },
      })}
      {...props}
      options={data}
      value={_value}
      onChange={(e: any) => {
        onChange?.(e);
        onValueChange?.(e.map((x: IData) => x.value) || []);
      }}
    />
  );
};
export default SelectMultiCustom;
