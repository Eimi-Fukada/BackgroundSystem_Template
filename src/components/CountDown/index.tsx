import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import type { CountDownProps } from './const';
import { message } from 'antd';
import { testPhone } from '@/utils/help';
import { get } from '@/request/http';
import { useSuperLock } from '@/hooks/useSuperLock';
import SpinLoading from '../SpinLoading';

const Component: FC<CountDownProps> = (props) => {
  const { phoneNum = '' } = props;
  const [show, setShow] = useState(false);
  const [second, setSecond] = useState(60);

  const [getCode, loading] = useSuperLock(async () => {
    if (phoneNum?.trim().length === 0 || !testPhone(phoneNum)) {
      message.destroy();
      message.warning('请输入正确的手机号');
      return;
    }
    await get('/api/login/captcha', { phone: phoneNum }).then((res) => {
      if (res.status !== 200) {
        return;
      }
      setShow(true);
      message.success('获取验证码成功！验证码为：1234');
    });
  });

  useEffect(() => {
    let timer: any = null;
    if (show) {
      timer = setInterval(() => {
        setSecond((pre) => pre - 1);
      }, 1000);
    }
    if (second < 1) {
      setShow(false);
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [second, show]);

  return (
    <div className={styles.page}>
      {show && second !== 0 ? (
        <div className={styles.input} style={{ cursor: 'not-allowed' }}>
          {second}秒后重新获取
        </div>
      ) : (
        <div className={styles.input} onClick={() => getCode()}>
          {loading && <SpinLoading color={'#ac94cc'} />}
          获取验证码
        </div>
      )}
    </div>
  );
};

const CountDown = memo(Component);
export default CountDown;
