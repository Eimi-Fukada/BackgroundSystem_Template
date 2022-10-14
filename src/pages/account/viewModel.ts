import { get } from '@/request/http';
import { Form, message } from 'antd';
import { useState } from 'react';
import type { RoleItem } from '../role/const';

export function ViewModel() {
  /** write your js */
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [value, setValue] = useState({
    account: '',
    name: '',
    phone: '',
    role: [],
  });

  async function getList(current: number) {
    const res = await get('/api/rule', { current, pageSize: 10 });
    return res.data;
  }

  const handleConfirm = (record: RoleItem) => {
    // 如果是自己
    if (true) {
      message.destroy();
      message.warning('不能删除当前角色');
    }
    console.log('confirm', record);
  };

  const handleChange = (val: any) => {
    console.log('val', val);
  };

  const onValuesChange = (values: any) => {
    if (values.account) {
      setValue({ ...value, account: values.account });
    } else if (values.name) {
      setValue({ ...value, name: values.name });
    } else if (values.phone) {
      setValue({ ...value, phone: values.phone });
    } else {
      setValue({ ...value, role: values.role });
    }
  };

  const handleOk = () => {
    if (value.account.trim().length === 0) {
      form.validateFields(['owner']);
      return;
    }
    if (value.role.length === 0) {
      form.validateFields(['role']);
      return;
    }
    setVisible(false);
  };

  return {
    visible,
    setVisible,
    getList,
    handleConfirm,
    onValuesChange,
    value,
    setValue,
    handleOk,
    form,
    handleChange,
  };
}
