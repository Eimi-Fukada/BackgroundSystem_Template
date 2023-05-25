import makeRequest from '../httpsRequest'

const method = 'delete'

export default {
  '/list': makeRequest<null, { username: string; password: string }>({
    url: '/list',
    method,
  }),
}
