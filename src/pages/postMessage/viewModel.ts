import apis from '@/request'
import { Form } from 'antd'
import { useState } from 'react'

export function useViewModel() {
  /** write your js */
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [value, setValue] = useState('')

  async function getList(current: number): Promise<any> {
    const res = await apis.get['/api/rule']({ data: { current, pageSize: 10 } })
    return res
  }

  const handleOk = () => {
    if (value.trim().length === 0) {
      form.validateFields(['message'])
      return
    }
    setVisible(false)
  }

  return {
    visible,
    setVisible,
    getList,
    value,
    setValue,
    handleOk,
    form,
  }
}
