import type { FC } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { WelcomeProps } from './const';
import { ViewModel } from './viewModel';

const Component: FC<WelcomeProps> = () => {
  const {} = ViewModel();

  return (
    <div className={styles.page}>
      <div className={styles.text}>Welcome</div>
    </div>
  );
};

const Welcome = memo(Component);
export default Welcome;
