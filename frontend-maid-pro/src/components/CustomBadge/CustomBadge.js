import React from 'react'
import { Badge } from 'antd'

function CustomBadge(props) {
  const {count, showBadge} = props
  return (
    <>
      {count && !showBadge ? (
        <Badge count={count}>{props.children}</Badge>
      ) : (
        <>{props.children}</>
      )}
    </>
  )
}

export default CustomBadge
