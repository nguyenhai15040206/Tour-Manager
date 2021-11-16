import { NotificationManager } from "react-notifications";

const createNotification = (type, message, title) => {
  return () => {
    switch (type) {
      case "info":
        NotificationManager.info(`${message}`, `${title}`, 1500);
        break;
      case "success":
        NotificationManager.success(`${message}`, `${title}`, 1500);
        break;
      case "warning":
        NotificationManager.warning(`${message}`, `${title}`, 1500);
        break;
      case "error":
        NotificationManager.error(`${message}`, `${title}`, 1500);
        break;
    }
  };
};

export default createNotification;
