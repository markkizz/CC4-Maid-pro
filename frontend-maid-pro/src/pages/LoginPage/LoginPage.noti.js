import { notification, Icon } from 'antd'
import React from 'react'

const openSuccessLoginNotification = (message) => {
  notification.open({
    message: 'Login Successfully',
    description: message ,
    icon: <Icon type="check-circle" style={{ color: '#69c0ff' }} />,
  });
};
const openFailedLoginNotification = (message) => {
  notification.open({
    message: 'Login Failed',
    description: message,
    icon: <Icon type="close-circle" style={{ color: '#cf1322' }} />,
  });
};
export { openSuccessLoginNotification, openFailedLoginNotification }