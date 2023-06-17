import template from './template'

export default [
  // { name: '登录', path: '/login', component: './login', layout: false, hideInMenu: true },
  // 这里是所有权限都有的
  {
    name: 'Grace',
    path: '/welcome',
    icon: 'SmileOutlined',
    component: './welcome',
  },
  {
    path: '/login',
    layout: false,
    component: './login',
  },
  // 这里是所有权限都有的
  {
    name: '团队管理',
    path: '/team',
    icon: 'TeamOutlined',
    access: 'canAdmin',
    routes: [
      {
        path: '/team',
        redirect: '/team/role',
      },
      {
        name: '角色管理',
        path: '/team/role',
        component: './role',
      },
      {
        path: '/team/role/editPermission',
        component: './editPermission',
        hideInMenu: true,
        name: '编辑权限',
      },
      {
        name: '账号管理',
        path: '/team/account',
        component: './account',
      },
    ],
  },
  {
    name: '报表管理',
    path: '/report',
    icon: 'PieChartOutlined',
    routes: [
      {
        path: '/report',
        redirect: '/report/business',
        access: 'normalRouteFilter',
      },
      {
        name: '业务报表',
        path: '/report/business',
        component: './bussiness',
        access: 'normalRouteFilter',
      },
    ],
  },
  {
    name: '消息管理',
    path: '/news',
    icon: 'SendOutlined',
    routes: [
      {
        path: '/news',
        redirect: '/news/postMessage',
        access: 'normalRouteFilter',
      },
      {
        name: '消息推送',
        path: '/news/postMessage',
        component: './postMessage',
        access: 'normalRouteFilter',
      },
    ],
  },
  ...template,
  // 这里是所有权限都有的
  {
    name: '个人中心',
    path: '/personal',
    icon: 'UserOutlined',
    routes: [
      {
        path: '/personal',
        redirect: '/personal/center',
      },
      {
        name: '个人设置',
        path: '/personal/center',
        component: './personalCenter',
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
]
