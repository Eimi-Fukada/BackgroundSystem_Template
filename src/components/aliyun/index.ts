import { guid } from '@/utils/help';
import { message } from 'antd';

import Base64 from 'base-64';
import CryptoJS from 'crypto-js';

interface FileProps extends File {
  url: string;
}

const accessid = 'your accessid';
const accesskey = 'your accesskey';
const host = 'your host';
const httpsHost = 'your https host';

const policyText = {
  expiration: '2030-01-01T12:00:00.000Z',
  conditions: [['content-length-range', 0, 10485760000]],
};

const policy = Base64.encode(JSON.stringify(policyText));
const bytes = CryptoJS.HmacSHA1(policy, accesskey, { asBytes: true });
const signature = bytes.toString(CryptoJS.enc.Base64);

async function uploadAliyun(fileList: FileProps[]) {
  const uploadTasks = fileList.map((file) => {
    const { name, type = 'image/png' } = file;
    const suffixIndex = name.lastIndexOf('.');
    const fileName = name.slice(0, suffixIndex);
    const extname = name.slice(suffixIndex + 1);
    const nFileName = fileName;
    let key = '';
    if (nFileName) {
      key += nFileName;
      if (nFileName.lastIndexOf('/') !== nFileName.length - 1) {
        key += '-';
      }
    }
    key += `${guid()}.${extname}`;

    if (file && file.url && typeof file.url === 'string') {
      return file.url;
    } else {
      const form = new FormData();
      form.append('name', 'file');
      form.append('signature', signature);
      form.append('OSSAccessKeyId', accessid);
      form.append('policy', policy);
      form.append('key', 'aliyun-oss/' + key);
      form.append('success_action_status', '200');
      form.append('file', file);

      return fetch(host, { method: 'post', body: form, mode: 'cors' }).then(({ status }) => {
        if (status === 200) {
          return `${httpsHost}/aliyun-oss/${key}`;
        }
        throw new Error('上传失败');
      });
    }
  });

  return Promise.all(uploadTasks);
}

async function upload(fileList: any[]) {
  try {
    const res = await uploadAliyun(fileList);
    return res;
  } catch (e) {
    message.error('阿里云上传失败');
    return Promise.reject(e);
  }
}

/** aliyun 裁剪 */
/** 几倍图 */
const multiple = 2;

interface ISize {
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
}

/** 整数 */
function trunc(nu: number) {
  return Math.trunc(nu) * multiple;
}

/** 获取剪接图片后缀 */
export function getResizeUrl({
  width,
  height,
  model,
}: {
  width?: number;
  height?: number;
  model?: string;
}) {
  let url = `?x-oss-process=image/resize,`;
  url += model ?? 'm_fill';
  if (width) {
    url += `,w_${trunc(width)}`;
  }
  if (height) {
    url += `,h_${trunc(height)}`;
  }
  return url;
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
  let url = `?x-oss-process=video/snapshot,t_7000,f_jpg`;

  if (width) {
    url += `,w_${trunc(width)}`;
  }
  if (height) {
    url += `,h_${trunc(height)}`;
  }
  return url;
}

export { upload };
