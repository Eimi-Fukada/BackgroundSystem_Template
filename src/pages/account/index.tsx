import type { FC } from 'react';
import { useRef } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { AccountProps } from './const';
import { ViewModel } from './viewModel';
import BreadCrumb from '@/components/BreadCrumb';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EasyModal from '@/components/easyModal';
import type { RoleItem } from '../role/const';

const Component: FC<AccountProps> = () => {
  const {} = ViewModel();

  const {
    getList,
    handleConfirm,
    visible,
    setVisible,
    onValuesChange,
    handleOk,
    form,
    handleChange,
  } = ViewModel();
  const roleRef = useRef<ActionType>();
  const roleArray = ['admin', 'user'];

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '账号',
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
      title: '姓名',
      dataIndex: 'owner',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'role',
      ellipsis: true,
      search: false,
      renderText(text) {
        return text.join(',');
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '登录密码',
      dataIndex: 'password',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setVisible(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确定删除这条记录吗?" onConfirm={() => handleConfirm(record)} key="del">
          <a target="_blank" key="del">
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];

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
          title="编辑账号信息"
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
              label="账号名"
              name="owner"
              rules={[{ required: true, message: '请输入账号名称!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="姓名" name="owner">
              <Input />
            </Form.Item>
            <Form.Item
              label="角色"
              name="role"
              rules={[{ required: true, message: '请选择角色名称!' }]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="请选择角色"
                onChange={(val) => handleChange(val)}
              >
                {roleArray.map((item) => {
                  return <Select.Option key={item.toString()}>{item}</Select.Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item label="手机号" name="phone">
              <Input />
            </Form.Item>
            <Form.Item
              label="登录密码"
              name="password"
              rules={[{ required: true, message: '请输入登录密码!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </EasyModal>
      </div>
    </>
  );
};

const Account = memo(Component);
export default Account;
