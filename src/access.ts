/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; authCodes?: any[] } | undefined,
) {
  const { currentUser, authCodes = [] } = initialState ?? {};

  return {
    canAdmin: currentUser && currentUser.role === 'admin',
    normalRouteFilter: (route: any) => authCodes.includes(route.path),
  };
}
