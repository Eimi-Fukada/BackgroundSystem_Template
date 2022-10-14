import { get } from '@/request/http';
import { Form } from 'antd';
import { useState } from 'react';

export function ViewModel() {
  /** write your js */
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [value, setValue] = useState('');

  async function getList(current: number) {
    const res = await get('/api/rule', { current, pageSize: 10 });
    return res.data;
  }

  const handleOk = () => {
    if (value.trim().length === 0) {
      form.validateFields(['message']);
      return;
    }
    setVisible(false);
  };

  return {
    visible,
    setVisible,
    getList,
    value,
    setValue,
    handleOk,
    form,
  };
}
