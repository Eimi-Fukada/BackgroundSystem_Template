import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import urlArgs from './interceptors'
import { baseURL } from '../config'
import { HttpStatus } from './enum'

const instance = axios.create({
  timeout: 6000,
  baseURL: baseURL,
})

instance.interceptors.request.use(
  urlArgs.request.onFulfilled as any,
  (error) => {
    Promise.reject(error)
  }
)

// 定义一个返回对象中code不为200时的错误
export class CodeNotZeroError extends Error {
  code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

export interface BackendResultFormat<T = any> {
  code: number
  data: T | null
  msg: string
}
export interface ResultFormat<T = any> {
  data: BackendResultFormat<T> | null
  err: AxiosError | null | CodeNotZeroError
  response: AxiosResponse<T> | null
}

export interface RequestConfig extends AxiosRequestConfig {
  // url为必填项
  url: NonNullable<AxiosRequestConfig['url']>
  args?: Record<string, any>
}

/**
 * 允许定义四个可选的泛型参数：
 *    Payload: 用于定义响应结果的数据类型
 *    Data：用于定义data的数据类型
 *    Params：用于定义parmas的数据类型
 *    Args：用于定义存放路径参数的属性args的数据类型
 */
interface MakeRequest {
  <Payload = any>(config: RequestConfig): (
    requestConfig?: Partial<RequestConfig>
  ) => Promise<ResultFormat<Payload>>

  <Payload, Data>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data'>> & { data: Data }
  ) => Promise<ResultFormat<Payload>>

  <Payload, Data, Params>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) & {
        params: Params
      }
  ) => Promise<ResultFormat<Payload>>

  <Payload, Data, Params, Args>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params' | 'args'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) &
      (Params extends undefined
        ? { params?: undefined }
        : { params: Params }) & {
        args: Args
      }
  ) => Promise<ResultFormat<Payload>>
}

// makeRequest用于生成支持智能推导，路径替换，捕获错误的请求函数
// 其形参的类型为RequestConfig，该类型在继承AxiosConfig上加了些自定义属性,例如存放路径参数的属性args
// makeRequest带有四个可选泛型，分别为：
//  - Payload: 用于定义响应结果的数据类型，若没有则可定义为undefined，下面的变量也一样
//  - Data：用于定义data的数据类型
//  - Params：用于定义parmas的数据类型
//  - Args：用于定义存放路径参数的属性args的数据类型
const makeRequest: MakeRequest = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    // 合并在service中定义的option和调用时从外部传入的option
    const mergedConfig: RequestConfig = {
      ...config,
      ...requestConfig,
      headers: {
        ...config.headers,
        ...requestConfig?.headers,
        Authorization: window.localStorage.getItem('Authorization'),
      },
    }
    // 统一处理返回类型
    try {
      const response: AxiosResponse<
        BackendResultFormat<T>,
        RequestConfig
      > = await instance.request<BackendResultFormat<T>>(mergedConfig)
      const res = response.data
      if (res.code !== HttpStatus.success) {
        const error = new CodeNotZeroError(res.code, res.msg)
        return { err: error, data: res.data, response }
      }
      return { err: null, data: res.data, response }
    } catch (err: any) {
      return { err, data: null, response: null }
    }
  }
}

export default makeRequest
