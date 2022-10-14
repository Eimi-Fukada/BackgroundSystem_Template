import { get } from './request/http';

/**
 * 获取用户信息
 * @returns
 */
export const fetchUser = async () => {
  let authCodes: string[] = [];
  let currentUser = { name: '', email: '', avatar: '', role: '' };
  try {
    const { data } = await get('/api/currentUser');
    if (data) {
      const { email = '', name = '', avatar = '', auth = [], role } = data.data;
      currentUser = {
        name,
        email,
        avatar,
        role,
      };
      authCodes = auth;
    }
  } catch (error) {}
  return {
    authCodes,
    currentUser,
  };
};
