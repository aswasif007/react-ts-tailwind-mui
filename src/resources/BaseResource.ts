import axios from 'axios';
import { Dict } from '../types';

class BaseResource<T> {
  public data?: T;

  constructor(data?: T) {
    this.data = data;
  }

  static get endpoint(): string {
    throw new Error('Endpoint not defined');
  }

  static httpGet(url: string, q: Dict<string | number> = {}) {
    return axios.get(url, {
      params: q,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default BaseResource;
