/**
 * 忽略对象中的特定key
 *
 * @export
 * @template T
 * @param {T} obj 对象
 * @param {(key: string, value: any, index: number) => boolean} callback 回调函数.哟
 */
export default function omitObjKeys<T extends Record<string, any> = {}>(
  obj: T,
  callback: (key: string, value: any, index: number) => boolean,
) {
  return Object.keys(obj).reduce((result, key, index) => {
    const isTrue = callback(key, obj[key], index);
    if (!isTrue) {
      result[key] = obj[key];
    }
    return result;
  }, {} as any);
}
