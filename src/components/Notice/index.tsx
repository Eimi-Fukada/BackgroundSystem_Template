import type { FC } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { NoticeProps } from './const';
import { BellOutlined } from '@ant-design/icons';

const Component: FC<NoticeProps> = () => {
  return (
    <div className={styles.page}>
      <div className={styles.bell}>
        <BellOutlined style={{ fontSize: '20px' }} />
      </div>
    </div>
  );
};

const Notice = memo(Component);
export default Notice;
