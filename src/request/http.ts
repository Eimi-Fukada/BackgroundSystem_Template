import service from '.';

/**
 * methods: 请求
 * @param url 请求地址
 * @param params 请求参数
 */

export function get(url: string, params?: any) {
  const config = {
    method: 'get',
    url: url,
  } as any;
  if (params) config.params = params;
  return service(config);
}

export function post(url: string, params?: any) {
  const config = {
    method: 'post',
    url: url,
  } as any;
  if (params) config.data = params;
  return service(config);
}

export function put(url: string, params?: any) {
  const config = {
    method: 'put',
    url: url,
  } as any;
  if (params) config.data = params;
  return service(config);
}

export function Delete(url: string, params?: any) {
  const config = {
    method: 'delete',
    url: url,
  } as any;
  if (params) config.params = params;
  return service(config);
}
