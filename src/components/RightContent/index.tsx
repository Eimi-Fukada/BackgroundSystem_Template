import type { FC } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { RightContentProps } from './const';
import AvatarDropdown from '../AvatarDropdown';

const Component: FC<RightContentProps> = () => {
  return (
    <div className={styles.page}>
      <AvatarDropdown />
    </div>
  );
};

const RightContent = memo(Component);
export default RightContent;
