import type { FC } from 'react';
import React, { memo } from 'react';
import type { FooterProps } from './const';
import styles from './index.module.less';

const Component: FC<FooterProps> = () => {
  return (
    <div className={styles.page}>
      <div className={styles.title}>NFKings @ 2022NFKings 技术部出品</div>
    </div>
  );
};

const Footer = memo(Component);
export default Footer;
