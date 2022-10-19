import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#6200ee',
  layout: 'mix',
  contentWidth: 'Fluid',
  menu: {
    locale: false,
  },
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Grace',
  pwa: false,
  iconfontUrl: '',
  logo: 'your logo',
};

export default Settings;
