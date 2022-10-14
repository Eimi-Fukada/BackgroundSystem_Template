interface RouteProps {
  path?: string;
  name?: string;
  routes?: RouteProps[];
}
/**
 * 根据path获取对应的name
 */
export default function getRouteName(path: string, array: RouteProps[]) {
  let name: string | undefined;
  array.find((value) => {
    if (value.path === path) {
      name = value.name;
    } else if (value.routes && value.routes.length > 0) {
      name = getRouteName(path, value.routes);
    }
    return name;
  });
  return name;
}
