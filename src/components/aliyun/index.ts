import { message } from 'antd'
import Base64 from 'base-64'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'

interface FileProps extends File {
  url: string
}

// const accessid = 'accessid'
// const accesskey = 'accesskey'
// const host = 'host'

const accessid = 'LTAI5t9ndsvDU6kEZLYBL4YW'
const accesskey = 'GXw4FPI7VAhYAm3CExsAguBZSGOFVu'
const host = 'https://twmw.oss-ap-southeast-1.aliyuncs.com'

const policyText = {
  expiration: '2030-01-01T12:00:00.000Z',
  conditions: [['content-length-range', 0, 10485760000]],
}

const policy = Base64.encode(JSON.stringify(policyText))
// eslint-disable-next-line new-cap
const bytes = CryptoJS.HmacSHA1(policy, accesskey)
const signature = bytes.toString(CryptoJS.enc.Base64)

async function uploadAliyun(fileList: FileProps[]) {
  // key 是文件全名，fileName是源文件名称，extname是图片后缀
  const uploadTasks = fileList.map((file) => {
    const { name } = file
    const suffixIndex = name.lastIndexOf('.')
    const fileName = name.slice(0, suffixIndex)
    const extname = name.slice(suffixIndex + 1)
    let key = ''
    if (fileName) {
      key += fileName
      if (fileName.lastIndexOf('/') !== fileName.length - 1) {
        key += '-'
      }
    }
    const timeStamp = dayjs().format('YYYYMMDDHHmm')
    key += `${timeStamp}.${extname}`

    // 获取文件夹名，按照月份-日期来创建
    const month = dayjs().month() + 1
    const day = dayjs().day()
    const filesFolderName = 'background-aliyun-oss/' + `${month}/${day}/`

    if (file && file.url && typeof file.url === 'string') {
      return file.url
    } else {
      const form = new FormData()
      form.append('name', 'file')
      form.append('signature', signature)
      form.append('OSSAccessKeyId', accessid)
      form.append('policy', policy)
      form.append('key', filesFolderName + key)
      form.append('success_action_status', '200')
      form.append('file', file)

      return fetch(host, { method: 'post', body: form, mode: 'cors' }).then(
        ({ status }) => {
          if (status === 200) {
            return `${host}/${filesFolderName}${key}`
          }
          throw new Error('上传失败')
        }
      )
    }
  })

  return Promise.all(uploadTasks)
}

async function upload(fileList: any[]) {
  try {
    const res = await uploadAliyun(fileList)
    return res
  } catch (e) {
    message.error('阿里云上传失败')
    return Promise.reject(e)
  }
}

/** aliyun 裁剪 */
/** 几倍图 */
const multiple = 2

interface ISize {
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
}

/** 整数 */
function trunc(nu: number) {
  return Math.trunc(nu) * multiple
}

/** 获取剪接图片后缀 */
export function getResizeUrl({
  width,
  height,
  model,
}: {
  width?: number
  height?: number
  model?: string
}) {
  let url = `?x-oss-process=image/resize,`
  url += model ?? 'm_fill'
  if (width) {
    url += `,w_${trunc(width)}`
  }
  if (height) {
    url += `,h_${trunc(height)}`
  }
  return url
}

/**
 * 获取视频第一帧图片
 *
 * @static
 * @param {{ width: number, height: number }} { width, height }
 * @returns
 * @memberof AliYun
 */
export function getVideoSnapshotUrl({ width, height }: ISize) {
  let url = `?x-oss-process=video/snapshot,t_7000,f_jpg`

  if (width) {
    url += `,w_${trunc(width)}`
  }
  if (height) {
    url += `,h_${trunc(height)}`
  }
  return url
}

export { upload }
