import { isNull } from 'lodash';

//验证手机号
export function testPhone(phone: string) {
  if (isNull(phone)) {
    return false;
  }
  return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone);
}

//登录密码校验
export function checkLoginPassword(pwd: any) {
  if (isNull(pwd)) {
    return false;
  }
  const regStr = /^[0-9a-zA-Z]{8,16}$/; //  8～16位数字+字母组合
  const reg = new RegExp(regStr);
  if (!isNaN(pwd)) {
    //全是数字
    return false;
  }
  if (/^[a-zA-Z]*$/.test(pwd)) {
    //全是字母
    return false;
  }
  return reg.test(pwd);
}

//验证邮箱地址
export function validateEmail(email: string) {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email,
    )
  ) {
    return false;
  } else {
    return true;
  }
}

/**
 * 生成唯一标识符
 *
 * @export
 * @returns
 */
 function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function guid() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}