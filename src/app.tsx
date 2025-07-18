import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import Footer from './components/Footer';
import { fetchUser } from './app.service';
import Loading from '@/components/Loading';
import RightContent from './components/RightContent';

const loginPath = '/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <Loading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: typeof fetchUser;
  authCodes?: string[];
}> {
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const { currentUser, authCodes } = await fetchUser();

    return {
      fetchUserInfo: fetchUser,
      currentUser,
      authCodes,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo: fetchUser,
    authCodes: [],
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    rightContentRender: () => {
      return <RightContent />;
    },
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      const { location } = history as any;
      const token = window.localStorage.getItem('token');
      if ((!token && location.pathname !== loginPath) || !initialState?.currentUser?.name) {
        history.push(loginPath);
      }
    },

    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[] } }) => {
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
