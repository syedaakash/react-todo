//@flow
import useSWR from 'swr';
import type { CrudAction } from './typeDefs';
import { SWREntity } from './typeDefs';

export const useGlobalSWR = (action: CrudAction, fallbackData?: any): SWREntity => {
  const { data, error, mutate, isValidating } = useSWR([action.payload.path, action]);

  return {
    data: data ? data : fallbackData ? fallbackData : undefined,
    isLoading: (!error && !data) || isValidating,
    isError: error,
    mutate: mutate,
    isSWR: true,
  };
};
