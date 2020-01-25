import { notification, Icon } from 'antd'
import React from 'react'

const successLoginNotification = (message) => {
  notification.open({
    message: 'Login Successful',
    description: message ,
    icon: <Icon type="check-circle" style={{ color: '#69c0ff' }} />,
  });
};
const failLoginNotification = (message) => {
  notification.open({
    message: 'Login Failed',
    description: message,
    icon: <Icon type="close-circle" style={{ color: '#cf1322' }} />,
  });
};
export { successLoginNotification, failLoginNotification }