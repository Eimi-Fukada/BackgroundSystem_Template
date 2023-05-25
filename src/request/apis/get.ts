import makeRequest from '../httpsRequest'

const method = 'get'

export default {
  '/api/login/captcha': makeRequest<null, { phone: string }>({
    url: '/api/login/captcha',
    method,
  }),
  '/api/rule': makeRequest<null, { current: number; pageSize: number }>({
    url: '/api/rule',
    method,
  }),
  '/api/currentUser': makeRequest<null>({
    url: '/api/currentUser',
    method,
  }),
}
