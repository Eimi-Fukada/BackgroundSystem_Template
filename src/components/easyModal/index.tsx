import type { FC } from 'react';
import React, { memo, useState } from 'react';
import styles from './index.module.less';
import { EasyModalProps } from './const';
import { Modal } from 'antd';

const Component: FC<EasyModalProps> = (props) => {
  const { visible, title, cancelText = '取消', onOk, onCancel, confirmLoading = false } = props;

  return (
    <Modal
      visible={visible}
      onCancel={() => onCancel && onCancel()}
      title={title}
      cancelText={cancelText}
      centered
      confirmLoading={confirmLoading}
      destroyOnClose
      keyboard
      onOk={() => onOk && onOk()}
    >
      {props.children}
    </Modal>
  );
};

const EasyModal = memo(Component);
export default EasyModal;
