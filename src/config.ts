const DEV_ENV = 'http://localhost:8000' //dev 环境
const TEST_ENV = 'https://test.com' //test环境
const PRE_ENV = 'https://pre.com' //pre 环境
const PROD_ENV = 'https://prod.com' //生产环境

export const baseURL = {
  dev: DEV_ENV,
  test: TEST_ENV,
  pre: PRE_ENV,
  prod: PROD_ENV,
}[REACT_APP_ENV || 'dev']
