import { useState } from "react";
import { useSelector } from "react-redux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useEffect } from "react";

const Notification = () => {
    const [displayNotification, setDisplayNotification] = useState(true);
    const notification = useSelector((state) => state.ui.notification);
  
   useEffect(() => {
      if (notification !== null && displayNotification) {
        showNotification();
      }
    }, [notification, displayNotification]);
  
    const showNotification = () => {
      if (notification.status === "error") {
        NotificationManager.error(notification.title, notification.message, 1000, () => {
          setDisplayNotification(false);
        });
      } else if (notification.status === "success") {
        NotificationManager.success(notification.title, notification.message, 1000, () => {
          setDisplayNotification(false);
        });
      }
    }
  
    return <NotificationContainer />;
  };
  
  export default Notification;