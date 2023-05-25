import makeRequest from '../httpsRequest'

const method = 'post'

export default {
  '/api/login/outLogin': makeRequest<null, null>({
    url: '/api/login/outLogin',
    method,
  }),
  '/api/login/account': makeRequest<
    null,
    {
      type: string
      username?: string
      password?: string
      phonenum?: string
      code?: string
    }
  >({
    url: '/api/login/account',
    method,
  }),
}
