import isEmpty from 'lodash/isEmpty';
import { stringify } from 'qs';
import storageService from './storageService';

class ApiClient {
  token = null;
  basePath = null;

  setToken(token) {
    this.token = token;
  }

  getAuthHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  constructor(passedConfig) {
    const baseConfig = {
      bodyEncoder: JSON.stringify,
      credentials: 'same-origin',
      format: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      methods: ['get', 'post', 'put', 'patch', 'delete'],
    };

    if (!passedConfig.basePath) {
      // e.g. 'https://example.com/api/v3'
      throw new Error('You must pass a base path to the ApiClient');
    }
    this.basePath = passedConfig.basePath;

    const methods = passedConfig.methods || baseConfig.methods;

    methods.forEach((method) => {
      this[method] = (path, { params = {}, data, fetchConfig = {} } = {}) => {
        const config = {
          ...baseConfig,
          ...passedConfig,
          ...fetchConfig,
          headers: {
            ...baseConfig.headers,
            ...(passedConfig ? passedConfig.headers : {}),
            ...(fetchConfig.headers || {}),
            ...this.getAuthHeaders(),
            'Accept-Language': storageService.get('language'),
          },
        };
        const {
          methods: _methods,
          basePath,
          headers,
          format,
          returnHeaders,
          bodyEncoder,
          ...otherConfig
        } = config;

        const requestPath = /^https?:\/\//i.test(path)
          ? path
          : basePath + path + this.queryString(params);

        const body = data ? bodyEncoder(data) : undefined;

        if (headers['Content-Type'] === 'multipart/form-data') {
          // see https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
          delete headers['Content-Type'];
        }

        return fetch(requestPath, {
          ...otherConfig,
          method,
          headers,
          body,
        })
          .then((response) => ({ response, format }))
          .then(this.handleErrors)
          .then((response) => {
            if (response.status === 204) return {};
            if (!returnHeaders) return response[format]();
            else
              return {
                headers: response.headers,
                response: response[format]().then((data) => data),
              };
          });
      };
    });
  }

  getMimeType(filename) {
    const ext = (/[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : '').toLowerCase();
    if (ext === 'png') {
      return 'image/png';
    }
    if (['jpeg', 'jpg'].includes(ext)) {
      return 'image/jpeg';
    }
    return 'application/octet-stream';
  }

  postFormData(formData, action) {
    return fetch(this.basePath + action.payload.path, {
      method: action.payload.method,
      headers: {
        ...this.getAuthHeaders(),
      },
      body: formData,
    });
  }

  upload(file, url, method = 'put', config = {}) {
    const f = method === 'post' ? this.post : this.put;
    return f(url, {
      data: file,
      fetchConfig: {
        headers: {
          'Content-Type': this.getMimeType(file.name),
          'Content-Disposition': `attachment; filename="${file.name}"`,
        },
        bodyEncoder: (f) => f,
        ...config,
      },
    });
  }

  queryString(params) {
    return !isEmpty(params) ? `?${stringify(params, { indices: false })}` : '';
  }

  handleErrors({ response, format }) {
    if (!response.ok) {
      return (
        response[format]()
          // if response parsing failed send back the entire response object
          .catch(() => {
            throw response;
          })
          // else send back the parsed error
          .then((parsedErr) => {
            if (format === 'json') {
              // eslint-disable-next-line
              throw {
                ...parsedErr,
                responseCode: response.status,
                responseText: response.statusText,
              };
            } else {
              throw parsedErr;
            }
          })
      );
    }
    return response;
  }
}

export default ApiClient;
