'use client';
import { ErrorMessage, Result } from '@/app/types';
import useSWR from 'swr';
import { FetcherResponse } from 'swr/_internal';
import { BASE_URL } from './ApiController';

export function fetchUrl<T>(url: string) {
  const { data, error } = useSWR<T>(
    url,
    async (url: string) => await fetcher<T>(url),
    {
      revalidateOnFocus: false,
    },
  );

  return getResult(data, error);
}

export async function fetcher<T>(url: string): Promise<FetcherResponse<T>> {
  try {
    const options = {
      method: 'GET',
    };
    const response = await fetch(BASE_URL + url, options);
    if (!response.ok) {
      throw {
        message: response.statusText,
        statusCode: response.status,
      } as ErrorMessage;
    }
    const data: T = await response.json();
    return data as FetcherResponse<T>;
  } catch (error) {
    throw {
      message: 'An error has occurred',
      statusCode: 500,
    } as ErrorMessage;
  }
}

export function getResult<T>(
  data: T | undefined,
  error: ErrorMessage,
): Result<T, ErrorMessage> {
  if (data === undefined) {
    return {
      ok: false,
      loading: true,
    };
  } else if (error) {
    return {
      ok: false,
      error: {
        message: error.message,
        statusCode: 500,
      },
      loading: false,
    };
  } else {
    return {
      ok: true,
      value: data,
      loading: false,
    };
  }
}
