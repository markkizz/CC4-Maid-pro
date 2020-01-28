import React from 'react'
import { Badge } from 'antd'

function CustomBadge(props) {
  const {count} = props
  return (
    <>
      {count ? (
        <Badge count={count}>{props.children}</Badge>
      ) : (
        <>{props.children}</>
      )}
    </>
  )
}

export default CustomBadge
