import { notification, Icon } from 'antd'
import React from 'react'

const successRegisterNotification = (message) => {
  notification.open({
    message: 'Registration Successful',
    description: message ,
    icon: <Icon type="check-circle" style={{ color: '#69c0ff' }} />,
  });
};
const failRegisterNotification = (message) => {
  notification.open({
    message: 'Registration Failed',
    description: message,
    icon: <Icon type="close-circle" style={{ color: '#cf1322' }} />,
  });
};
export { failRegisterNotification, successRegisterNotification }