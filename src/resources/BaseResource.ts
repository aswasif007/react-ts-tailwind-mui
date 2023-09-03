import axios from 'axios';
import { Dict } from '../types';
import { IDataContext, StoreActionType } from '../contexts/DataContext';

const API_ROOT = 'https://example.com';

class BaseResource<T> {
  private static cancelTokens: Dict<any> = {};
  private static store: IDataContext;

  public data?: T;

  constructor(data?: T) {
    this.data = data;
  }

  static get endpoint(): string {
    throw new Error('Endpoint not defined');
  }

  private static httpRequest(
    method: 'get' | 'post' | 'patch' | 'delete',
    endpoint: string,
    ...args: any[]
  ) {
    const url = API_ROOT + endpoint;
    this.cancelTokens[method + ' ' + url]?.cancel();

    const source = axios.CancelToken.source();
    this.cancelTokens[method + ' ' + url] = source;

    if (args.length > 0) {
      args[args.length - 1]['cancelToken'] = source.token;
    }

    return axios[method](url, ...args).then((res) => {
      delete this.cancelTokens[method + ' ' + url];
      return res.data;
    });
  }

  static get http() {
    return {
      get: (endpoint: string, params: any) =>
        this.httpRequest('get', endpoint, { params }),
      post: (endpoint: string, params: any, body: any) =>
        this.httpRequest('post', endpoint, body, { params }),
      patch: (endpoint: string, params: any, body: any) =>
        this.httpRequest('patch', endpoint, body, { params }),
      delete: (endpoint: string, params: any) =>
        this.httpRequest('delete', endpoint, { params }),
    };
  }

  updateStore() {
    BaseResource.store.dispatch({
      type: StoreActionType.Upsert,
      target: this.constructor.name,
      payload: this.data,
    });
  }

  static setStore(store: IDataContext) {
    BaseResource.store = store;
  }
}

export default BaseResource;
