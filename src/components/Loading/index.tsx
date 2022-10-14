import type { FC } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { LoadingProps } from './const';
import { ViewModel } from './viewModel';

const Component: FC<LoadingProps> = () => {
  const {} = ViewModel();

  return (
    <div className={styles.page}>
      <div className={styles.loading} />
    </div>
  );
};

const Loading = memo(Component);
export default Loading;
