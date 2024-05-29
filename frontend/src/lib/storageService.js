//@flow
import Cookies from 'universal-cookie';
import type { IStorageService } from 'typedefs';

class StorageService implements IStorageService {
  cookies = null;

  constructor() {
    this.cookies = new Cookies();
  }

  // https://www.chromestatus.com/feature/4506322921848832
  // https://tools.ietf.org/html/draft-ietf-httpbis-cookie-alone-01
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Directives
  _getKey = (key: string): string =>
    window.location.protocol === 'https:' ? '__Secure-' + key : key;
  get = (key: string): string | number | null =>
    this.cookies ? this.cookies.get(this._getKey(key)) : null;
  set = (key: string, value: string | number) => {
    if (this.cookies) {
      this.cookies.set(this._getKey(key), value, {
        secure: window.location.protocol === 'https:',
        path: '/',
      });
    }
  };

  remove = (key: string) => {
    if (this.cookies) {
      this.cookies.remove(this._getKey(key), {
        secure: window.location.protocol === 'https:',
        path: '/',
      });
    }
  };
}

const storageService = new StorageService();
export default storageService;
