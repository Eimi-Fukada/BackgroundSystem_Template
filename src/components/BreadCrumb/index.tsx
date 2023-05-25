import type { FC } from 'react'
import React, { memo } from 'react'
import styles from './index.module.less'
import type { BreadCrumbProps } from './const'
import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import routeArray from '../../../config/routes/index'
import getRouteName from '@/utils/getRouteName'

const Component: FC<BreadCrumbProps> = (props) => {
  const { renderRight } = props
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        {index === 0 ? (
          `${getRouteName(url, routeArray)}`
        ) : (
          <Link to={url}>{getRouteName(url, routeArray)}</Link>
        )}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.page}>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div className={styles.text}>
          {getRouteName(`/${pathSnippets.join('/')}`, routeArray)}
        </div>
        {renderRight}
      </div>
    </div>
  )
}

const BreadCrumb = memo(Component)
export default BreadCrumb
