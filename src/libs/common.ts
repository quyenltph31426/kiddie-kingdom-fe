import { toast } from 'react-toastify';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function onMutateError(error: any) {
  if (!error) return;
  return toast.error(error?.response?.data?.message || error?.message || error?.statusText);
}

export const sleep = async (time: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
};

/**
 * Format currency with locale and currency symbol
 *
 * @param {number | string | null | undefined} value - The amount to format
 * @param {string} [currency='VND'] - The currency code
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value: number | string | null | undefined, currency: string = 'VND'): string {
  if (value === undefined || value === null) return '-';
  if (Number.isNaN(Number(value))) return `invalid amount: ${value}`;

  const amount = Number(value);

  // For VND, no decimal places
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // For other currencies, use standard formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format Number With Custom Fraction Precision
 * Can expan with more locale option
 *
 * @param {(string | number | null | undefined)} value The Inputed Number/String
 * @param {{ minFrac?: number; maxFrac?: number }} [params={
 *     maxFrac: undefined,
 *     minFrac: 2,
 *   }] maxFrac is set to undefined to not cause any data loss, minFrac decide how many zeros ex. 0.000 is 3
 * @returns {string} The Inputed Number Formated With Minimum And Maximum Fraction Digits
 */
export function FormatNum(
  value: string | number | null | undefined,
  params: { minFrac?: number; maxFrac?: number } = {
    maxFrac: undefined,
    minFrac: 2,
  }
): string {
  if (value === undefined || value === null) return '-';
  if (Number.isNaN(value)) return `invalid number: ${value}`;
  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: params.maxFrac,
    minimumFractionDigits: params.minFrac,
  });
}

export const formatDate = (date: Date, locale: string = 'en-us'): string => {
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
