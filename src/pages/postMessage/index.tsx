import type { FC } from 'react'
import { useRef } from 'react'
import React, { memo } from 'react'
import styles from './index.module.less'
import type { PostMessageProps } from './const'
import { useViewModel } from './viewModel'
import BreadCrumb from '@/components/BreadCrumb'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Form, Input } from 'antd'
import EasyModal from '@/components/EasyModal'
import type { RoleItem } from '../role/const'

const Component: FC<PostMessageProps> = () => {
  const { getList, visible, setVisible, handleOk, form, value, setValue } =
    useViewModel()

  const roleRef = useRef<ActionType>()

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '用户名称',
      dataIndex: 'owner',
      ellipsis: true,
    },
    {
      title: '用户手机号',
      dataIndex: 'phone',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setVisible(true)
          }}
        >
          发送消息
        </a>,
      ],
    },
  ]

  return (
    <>
      <BreadCrumb />
      <div className={styles.page}>
        <ProTable
          actionRef={roleRef}
          columns={columns}
          cardBordered
          pagination={{
            pageSize: 10,
          }}
          search={{
            labelWidth: 'auto',
          }}
          request={({ current }) => getList(current || 1)}
          onSubmit={(val) => console.log('value', val)}
        />
        <EasyModal
          visible={visible}
          title="编辑信息"
          onCancel={() => setVisible(false)}
          onOk={() => handleOk()}
        >
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onValuesChange={(values) => setValue(values)}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="消息内容"
              name="message"
              rules={[{ required: true, message: '请输入消息内容!' }]}
            >
              <Input.TextArea rows={5} maxLength={200} />
            </Form.Item>
          </Form>
        </EasyModal>
      </div>
    </>
  )
}

const PostMessage = memo(Component)
export default PostMessage
