import type { FC } from 'react'
import { useRef } from 'react'
import React, { memo } from 'react'
import styles from './index.module.less'
import type { RoleProps, RoleItem } from './const'
import { useViewModel } from './viewModel'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, Form, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import EasyModal from '@/components/EasyModal'
import { history } from 'umi'
import BreadCrumb from '@/components/BreadCrumb'

const Component: FC<RoleProps> = () => {
  const {
    getList,
    handleConfirm,
    visible,
    setVisible,
    onValuesChange,
    handleOk,
    form,
  } = useViewModel()
  const roleRef = useRef<ActionType>()

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'owner',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '角色描述',
      dataIndex: 'desc',
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
          编辑
        </a>,
        <Popconfirm
          title="确定删除这条记录吗?"
          onConfirm={() => handleConfirm(record)}
          key="del"
        >
          <a target="_blank" key="del">
            删除
          </a>
        </Popconfirm>,
        <a
          target="_blank"
          key="permissions"
          onClick={() => history.push('/team/role/editPermission')}
        >
          编辑权限
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
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>,
          ]}
          pagination={{
            pageSize: 10,
          }}
          search={{
            labelWidth: 'auto',
          }}
          request={({ current }) => getList(current || 1)}
        />
        <EasyModal
          visible={visible}
          title="编辑角色信息"
          onCancel={() => setVisible(false)}
          onOk={() => handleOk()}
        >
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onValuesChange={(values) => onValuesChange(values)}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="角色名称"
              name="rolename"
              rules={[{ required: true, message: '请输入角色名称!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="角色描述" name="roledesc">
              <Input.TextArea rows={4} maxLength={50} />
            </Form.Item>
          </Form>
        </EasyModal>
      </div>
    </>
  )
}

const Role = memo(Component)
export default Role
