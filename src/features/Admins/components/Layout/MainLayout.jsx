import React, { useEffect } from "react";
import { MdImportantDevices } from "react-icons/md";
import { Container } from "reactstrap";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "../../../../utils/constant";
import "./styles.scss";
import FooterAdmin from "../Footer/Index";

// Nguyễn Tấn Hải [24/10/2021] code dựng trang main
function MainLayout(props) {
  const notificationSystem = React.createRef();
  const { children } = props;
  useEffect(() => {
    const addNotification = () => {
      setTimeout(() => {
        const notification = notificationSystem.current;
        notification?.addNotification({
          title: <MdImportantDevices />,
          message: "Welome to page Admin!",
          level: "info",
        });
      }, 1500);
    };
    addNotification();
  }, []);

  return (
    <>
      {/* <NotificationSystem
        dismissible={false}
        ref={(notificationSystem) => (notificationSystem = notificationSystem)}
        style={NOTIFICATION_SYSTEM_STYLE}
      /> */}
      <main className="cr-app bg-light">
        <Sidebar />
        <Container fluid className="cr-content">
          <Header />
          {children}
          <FooterAdmin />
          <div>
            <NotificationSystem
              ref={notificationSystem}
              dismissible={false}
              style={NOTIFICATION_SYSTEM_STYLE}
            />
          </div>
        </Container>
      </main>
    </>
  );
}

export default MainLayout;
