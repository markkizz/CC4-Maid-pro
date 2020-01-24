import { notification, Icon } from 'antd'
import React from 'react'

const openBookingSuccessNotification = (message) => {
  notification.open({
    message: 'ModalBooking Successful',
    description: message,
    icon: <Icon type="check-circle" style={{ color: '#69c0ff' }} />,
  });
};

const openBookingFailedNotification = (message) => {
  notification.open({
    message: 'ModalBooking Failed',
    description: message,
    icon: <Icon type="close-circle" style={{ color: '#cf1322' }} />,
  });
};
export { openBookingSuccessNotification, openBookingFailedNotification }
