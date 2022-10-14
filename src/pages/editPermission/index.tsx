import type { FC } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { EditPermissionProps } from './const';
import { ViewModel } from './viewModel';
import BreadCrumb from '@/components/BreadCrumb';
import { Button, Divider } from 'antd';
import { CheckCard } from '@ant-design/pro-components';
import routes from '../../../config/routes/index';

const Component: FC<EditPermissionProps> = () => {
  const { setState, submit, loading } = ViewModel();

  /** 剔除login,404,welcome,redirect */
  const filterRoutes = ['/', '/welcome', '/login', '/team'];
  const routesArray = routes.filter(
    (i) => !!i.path && filterRoutes.findIndex((_i) => _i === i.path) === -1,
  );

  const RouteItem = <T,>({ data }: { data: any }) => {
    return (
      <div className={styles.content}>
        <div>{data?.name || ''}</div>
        <Divider />
        {!!data.routes && data.routes.length > 0 ? (
          <div>
            {data.routes
              .flat()
              .filter((i: any) => !!i.name && !!i.path)
              .map((item: any) => {
                return (
                  <CheckCard title={item.name} size="small" key={item.name} value={item.path} />
                );
              })}
          </div>
        ) : (
          <CheckCard title={data.name} value={data?.path} size="small" />
        )}
      </div>
    );
  };

  return (
    <>
      <BreadCrumb
        renderRight={
          <Button type="primary" onClick={() => submit()} loading={loading}>
            保存
          </Button>
        }
      />
      <div className={styles.page}>
        <CheckCard.Group
          style={{ width: '100%' }}
          multiple
          onChange={(value) => {
            console.log('value', value);
            setState(value);
          }}
        >
          {routesArray.map((item) => {
            return (
              <div style={{ marginBottom: '20px' }} key={item.path}>
                <RouteItem data={item} />
              </div>
            );
          })}
        </CheckCard.Group>
      </div>
    </>
  );
};

const EditPermission = memo(Component);
export default EditPermission;
