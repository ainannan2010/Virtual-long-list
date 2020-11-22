import { request } from '@/utils';

class IData {
  getNewsList(payload) {
    return request({
      url: '/data',
      method: 'get',
      params: payload
    });
  }
}

const dataService = new IData();

export { dataService };
