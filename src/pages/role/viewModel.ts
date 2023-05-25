import { Form } from 'antd'
import { useState } from 'react'
import type { RoleItem } from './const'
import apis from '@/request'

export function useViewModel() {
  /** write your js */
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [value, setValue] = useState({
    roleName: '',
    roleDesc: '',
  })

  async function getList(current: number): Promise<any> {
    const res = await apis.get['/api/rule']({ data: { current, pageSize: 10 } })
    return res
  }

  const handleConfirm = (record: RoleItem) => {
    console.log('confirm', record)
  }

  const onValuesChange = (values: any) => {
    if (values.rolename) {
      setValue({ ...value, roleName: values.rolename })
    } else {
      setValue({ ...value, roleDesc: values.roledesc })
    }
  }

  const handleOk = () => {
    if (value.roleName.trim().length === 0) {
      form.validateFields(['rolename'])
      return
    }
    setVisible(false)
  }

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
  }
}
