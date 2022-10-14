import type { FC } from 'react';
import { useCallback } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { AvatarDropdownProps } from './const';
import { Avatar, Dropdown, Menu } from 'antd';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useModel, history } from 'umi';
import type { MenuInfo } from 'rc-menu/lib/interface';
import access from '@/access';
import SpinLoading from '../SpinLoading';
import { post } from '@/request/http';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await post('/api/login/outLogin');
  window.localStorage.removeItem('token');
  const { search, pathname } = history.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: JSON.stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const Component: FC<AvatarDropdownProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const menu = access(initialState);

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      history.push(`/personal/${key}`);
    },
    [setInitialState],
  );

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  if (!initialState) {
    return <SpinLoading color="#590de5" />;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return <SpinLoading color="#590de5" />;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <div className={styles.page}>
      <Dropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="default" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </Dropdown>
    </div>
  );
};

const AvatarDropdown = memo(Component);
export default AvatarDropdown;
