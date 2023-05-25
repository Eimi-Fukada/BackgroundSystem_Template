import apis from './request'

/**
 * 获取用户信息
 * @returns
 */
export const fetchUser = async () => {
  let authCodes: string[] = []
  let currentUser = { name: '', email: '', avatar: '', role: '' }
  try {
    const { data } = await apis.get['/api/currentUser']({ data: null })
    if (data) {
      const {
        email = '',
        name = '',
        avatar = '',
        auth = [],
        role,
      } = data as any
      currentUser = {
        name,
        email,
        avatar,
        role,
      }
      authCodes = auth
    }
  } catch (error) {}
  return {
    authCodes,
    currentUser,
  }
}
