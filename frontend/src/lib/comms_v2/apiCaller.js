//@flow
import ApiClient from '../apiClient';
import type { CrudAction } from './typeDefs';

const apiClient = new ApiClient({
  basePath: process.env.BACKEND_BASE_PATH || `http://localhost:8000/`,
  fetchConfig: {
    headers: {
      Accept: 'application/json',
    },
  },
  methods: ['get', 'post', 'put', 'patch', 'delete', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});

export const apiCaller = (args) => {
  const { method, path, params, data, fetchConfig } = args[1].payload;
  return apiClient[method](path, { params, data, fetchConfig });
};
