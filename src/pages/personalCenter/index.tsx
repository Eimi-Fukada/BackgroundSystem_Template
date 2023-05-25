import type { FC } from 'react'
import React, { memo } from 'react'
import styles from './index.module.less'
import type { PersonalCenterProps } from './const'
import { useViewModel } from './viewModel'
import { useModel, history } from 'umi'
import { Avatar, Button, Form, Input, Modal, Popconfirm } from 'antd'
import SpinLoading from '@/components/SpinLoading'
import EasyModal from '@/components/EasyModal'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const Component: FC<PersonalCenterProps> = () => {
  const { visible, setVisible, handleOk, onValuesChange } = useViewModel()
  const { initialState } = useModel('@@initialState')
  const [form] = Form.useForm()
  const { confirm } = Modal

  if (!initialState) {
    return <SpinLoading color="#590de5" />
  }

  const { currentUser } = initialState

  if (!currentUser || !currentUser.name) {
    return <SpinLoading color="#590de5" />
  }

  function handleCancel() {
    confirm({
      title: '确定注销该账号吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        window.localStorage.removeItem('token')
        history.replace('/login')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Avatar
          size={64}
          className={styles.avatar}
          src={currentUser.avatar}
          alt="avatar"
        />
        <span className={styles.name}>{currentUser.name}</span>
        <div className={styles.btnGroup}>
          <Button
            onClick={() => setVisible(true)}
            style={{ borderRadius: '20px', marginRight: '20px' }}
            size={'large'}
          >
            修改密码
          </Button>
          <Button
            type="primary"
            onClick={() => handleCancel()}
            style={{ borderRadius: '20px' }}
            size={'large'}
          >
            注销账户
          </Button>
        </div>
      </div>
      <EasyModal
        visible={visible}
        title="修改账号密码"
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
            label="旧密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入旧密码!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[{ required: true, message: '请确认密码!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </EasyModal>
    </div>
  )
}

const PersonalCenter = memo(Component)
export default PersonalCenter
