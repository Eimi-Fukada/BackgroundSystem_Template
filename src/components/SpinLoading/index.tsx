import type { FC } from 'react';
import React, { memo } from 'react';
import type { SpinLoadingProps } from './const';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Component: FC<SpinLoadingProps> = (props) => {
  const { color = '#ae1100', size = 12 } = props;

  return <Spin indicator={<LoadingOutlined style={{ fontSize: size, color: color }} spin />} />;
};

const SpinLoading = memo(Component);
export default SpinLoading;
