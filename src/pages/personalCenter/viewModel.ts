import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';

export function ViewModel() {
  /** write your js */
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleOk = () => {
    setVisible(false);
  };

  const onValuesChange = (values: any) => {
    if (values.oldPassword) {
      setValue({ ...value, oldPassword: values.oldPassword });
    } else if (values.newPassword) {
      setValue({ ...value, newPassword: values.newPassword });
    } else {
      setValue({ ...value, confirmPassword: values.confirmPassword });
    }
  };

  return {
    visible,
    setVisible,
    handleOk,
    onValuesChange,
  };
}
