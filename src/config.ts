export const isDev = REACT_APP_ENV === 'dev'; // 开发环境
export const isUat = REACT_APP_ENV === 'test'; // 测试环境
export const isStg = REACT_APP_ENV === 'pre'; // 预发布环境
export const isPrd = !isDev && !isUat && !isStg; // 生产环境

export const baseURL = 'http://localhost:8000';
