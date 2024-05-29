//@flow
import type { CrudAction, ID } from './typeDefs';
import type { Method } from './actionTypes';
import {
  CREATE,
  CREATE_ERROR,
  CREATE_SUCCESS,
  DELETE,
  DELETE_ERROR,
  DELETE_SUCCESS,
  FETCH,
  FETCH_ERROR,
  FETCH_ONE,
  FETCH_ONE_ERROR,
  FETCH_ONE_SUCCESS,
  FETCH_SUCCESS,
  UPDATE,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
} from './actionTypes';

type Opts = {
  method?: Method,
  fetchConfig?: Object,
};
type Promise = {
  resolve: (result: *) => void,
  reject: (err: *) => void,
};

export function fetchCollection<T>(
  model: string,
  path: string,
  params: Object = {},
  opts: Opts = {},
  promise?: Promise
): CrudAction<T[]> {
  const fetchConfig = opts.fetchConfig || undefined;
  const method = opts.method || 'get';

  return {
    type: FETCH,
    meta: {
      success: FETCH_SUCCESS,
      failure: FETCH_ERROR,
      params,
      model,
    },
    payload: {
      fetchConfig,
      method,
      path,
      params,
      promise,
    },
  };
}

export function fetchRecord<T>(
  model: string,
  id: ID,
  path: string,
  params: Object = {},
  opts: Opts = {},
  promise?: Promise
): CrudAction<T> {
  const fetchConfig = opts.fetchConfig || undefined;
  const method = opts.method || 'get';

  return {
    type: FETCH_ONE,
    meta: {
      success: FETCH_ONE_SUCCESS,
      failure: FETCH_ONE_ERROR,
      model,
      id,
      params,
    },
    payload: {
      fetchConfig,
      method,
      path,
      params,
      promise,
    },
  };
}

export function createRecord<T>(
  model: string,
  path: string,
  data: $Shape<T> = {},
  params: Object = {},
  opts: Opts = {},
  promise?: Promise
): CrudAction<T> {
  const fetchConfig = opts.fetchConfig || undefined;
  const method = opts.method || 'post';

  return {
    type: CREATE,
    meta: {
      success: CREATE_SUCCESS,
      failure: CREATE_ERROR,
      model,
    },
    payload: {
      fetchConfig,
      method,
      path,
      data,
      params,
      promise,
    },
  };
}

export function updateRecord<T>(
  model: string,
  id: ID,
  path: string,
  data: $Shape<T> = {},
  params: Object = {},
  opts: Opts = {},
  promise?: Promise
): CrudAction<T> {
  const fetchConfig = opts.fetchConfig || undefined;
  const method = opts.method || 'put';

  return {
    type: UPDATE,
    meta: {
      success: UPDATE_SUCCESS,
      failure: UPDATE_ERROR,
      model,
      id,
    },
    payload: {
      fetchConfig,
      method,
      path,
      data,
      params,
      promise,
    },
  };
}

export function deleteRecord(
  model: string,
  id: ID,
  path: string,
  params: Object = {},
  opts: Opts = {},
  promise?: Promise
): CrudAction<void> {
  const fetchConfig = opts.fetchConfig || undefined;
  const method = opts.method || 'delete';

  return {
    type: DELETE,
    meta: {
      success: DELETE_SUCCESS,
      failure: DELETE_ERROR,
      model,
      id,
    },
    payload: {
      fetchConfig,
      method,
      path,
      params,
      promise,
    },
  };
}
