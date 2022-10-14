export default [
  {
    name: '模板',
    path: '/template',
    icon: 'AreaChartOutlined',
    routes: [
      {
        name: '素材库',
        path: '/template/materialLibrary',
        component: './template/materialLibrary',
        access: 'normalRouteFilter',
      },
      { path: '/template', redirect: '/template/materialLibrary', access: 'normalRouteFilter' },
    ],
  },
];
