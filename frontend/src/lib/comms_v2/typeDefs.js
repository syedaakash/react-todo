//@flow

import { mutate as mutateFunc } from 'swr';
import { API_CALL, CREATE, DELETE, FETCH, FETCH_ONE, UPDATE } from './actionTypes';

export type Method = 'get' | 'post' | 'put' | 'delete';

export type SWREntity<T> = {
  data: T,
  isLoading: boolean,
  isError: Object,
  mutate: mutateFunc,
};

/* CrudAction And All Associated Types */

export type ID = string | number | null;

export type Model = string;

export type Meta = {
  success: string,
  failure: string,
  params?: Object,
  model: Model,
  id?: ID,
  fetchTime?: number,
};

export type CrudAction<T> = {
  // eslint-disable-next-line flowtype/space-after-type-colon
  type:
    | typeof FETCH
    | typeof FETCH_ONE
    | typeof CREATE
    | typeof UPDATE
    | typeof DELETE
    | typeof API_CALL,
  meta: Meta,
  payload: {
    method: Method,
    path: string,
    data?: T,
    params: Object,
    fetchConfig?: Object,
    onResponse: ({}, boolean) => void,
  },
  fakeCall: boolean,
};

export type Selection<T> = {
  otherInfo?: Object,
  data?: T,
  ids?: ID[],
  isLoading: boolean,
  needsFetch: boolean,
  error?: Error,
  fetch?: CrudAction<T>,
};
export type Entity<T> = T | Selection<T>;
