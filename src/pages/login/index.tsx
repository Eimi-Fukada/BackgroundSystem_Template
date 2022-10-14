import type { FC } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { LoginProps } from './const';
import { ViewModel } from './viewModel';
import classnames from 'classnames';
import { Input, Form } from 'antd';
import CountDown from '@/components/CountDown';
import SpinLoading from '@/components/SpinLoading';

const Component: FC<LoginProps> = () => {
  const { index, setIndex, handleLogin, value, onValuesChange, loading } = ViewModel();
  const btnGroup = ['Password', 'Phone'];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* tab */}
        <div className={classnames(styles.wrapperContent)}>
          <div
            className={styles.wrapper}
            style={index === 1 ? { left: 'calc(12px + 50%)' } : { left: '16px' }}
          />
          {btnGroup.map((item, idx) => {
            return (
              <div
                className={classnames(styles.btn, idx === index ? styles.active : {})}
                key={item}
                onClick={() => setIndex(idx)}
              >
                {item}
              </div>
            );
          })}
        </div>
        <Form
          name="basic"
          autoComplete="true"
          style={{ width: '100%', paddingLeft: '18px' }}
          onValuesChange={(val) => onValuesChange(val)}
        >
          {index === 0 ? (
            <div className={styles.inputContent}>
              <Form.Item name="username" style={{ marginBottom: 0 }}>
                <Input
                  placeholder={'UserName'}
                  className={styles.input}
                  maxLength={11}
                  onPressEnter={() => handleLogin()}
                  allowClear
                />
              </Form.Item>
              <Form.Item name="password" style={{ marginBottom: 0 }}>
                <Input.Password
                  placeholder={'PassWord'}
                  className={styles.input}
                  maxLength={16}
                  onPressEnter={() => handleLogin()}
                />
              </Form.Item>
            </div>
          ) : (
            <div className={styles.inputContent}>
              <Form.Item name="phonenum" style={{ marginBottom: 0 }}>
                <Input
                  placeholder={'PhoneNum'}
                  className={styles.input}
                  maxLength={11}
                  onPressEnter={() => handleLogin()}
                />
              </Form.Item>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Form.Item name="code" style={{ marginBottom: 0, width: '50%' }}>
                  <Input
                    placeholder={'Code'}
                    className={styles.input}
                    maxLength={6}
                    onPressEnter={() => handleLogin()}
                  />
                </Form.Item>
                {/* 倒计时 */}
                <div style={{ marginTop: '20px', flex: 1, marginLeft: '16px' }}>
                  <CountDown phoneNum={value.phonenum} />
                </div>
              </div>
            </div>
          )}
        </Form>
        <button className={styles.login} onClick={() => handleLogin()}>
          {loading && (
            <div style={{ marginRight: '12px' }}>
              <SpinLoading size={24} />
            </div>
          )}
          Login
        </button>
      </div>
    </div>
  );
};

const Login = memo(Component);
export default Login;
