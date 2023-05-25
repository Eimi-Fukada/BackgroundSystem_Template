import { useSuperLock } from '@/hooks/useSuperLock'
import apis from '@/request'
import { message } from 'antd'
import { useState } from 'react'
import { useModel, history } from 'umi'

export function useViewModel() {
  /** write your js */
  const { initialState, setInitialState } = useModel('@@initialState')
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState({
    username: '',
    password: '',
    phonenum: '',
    code: '',
  })

  type typeLabel = keyof typeof value
  function handleValue(label: typeLabel, val: string) {
    setValue({ ...value, [label]: val })
  }

  const onValuesChange = (values: any) => {
    if (values.username) {
      handleValue('username', values.username)
    } else if (values.password) {
      handleValue('password', values.password)
    } else if (values.phonenum) {
      handleValue('phonenum', values.phonenum)
    } else if (values.code) {
      handleValue('code', values.code)
    }
  }

  const [handleLogin, loading] = useSuperLock(async () => {
    if (
      (index === 0 &&
        (value.username.trim().length === 0 ||
          value.password.trim().length === 0)) ||
      (index === 1 &&
        (value.phonenum.trim().length === 0 || value.code.trim().length === 0))
    ) {
      message.destroy()
      message.warning('请输入信息')
      return
    }
    const params =
      index === 0
        ? {
            username: value.username,
            password: value.password,
          }
        : {
            phonenum: value.phonenum,
            code: value.code,
          }
    try {
      const msg = await apis.post['/api/login/account']({
        data: {
          ...params,
          type: index === 0 ? 'account' : 'mobile',
        },
      })
      if (msg.response?.status === 200) {
        window.localStorage.setItem('token', 'test')
        message.success('登录成功！')
        // 获取用户信息接口
        const user: any = await initialState!.fetchUserInfo!()
        await setInitialState((pre) => ({ ...pre, ...user }))
        const urlParams = new URL(window.location.href).searchParams
        history.push(urlParams.get('redirect') || '/', { fromLogin: true })
      } else {
        const data: any = msg.response?.data || {}
        message.error(
          Reflect.has(data, 'currentAuthority')
            ? data.currentAuthority
            : 'error'
        )
      }
    } catch (error) {
      message.error('登录失败，请重试！')
    }
  })

  return {
    index,
    setIndex,
    handleLogin,
    value,
    loading,
    onValuesChange,
  }
}
