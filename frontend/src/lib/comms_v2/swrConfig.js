import { apiCaller } from './apiCaller';

export const swrConfig = {
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryInterval: 5000,
  errorRetryCount: 3,
  fetcher: apiCaller,
};
