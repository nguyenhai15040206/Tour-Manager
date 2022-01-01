import React, { useEffect, useState } from "react";
import {
  MdClearAll,
  MdExitToApp,
  MdNotificationsActive,
  MdPersonPin,
} from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from "reactstrap";
import tourApi from "../../../../apis/TourApi";
import "./styles.scss";

function Header(props) {
  const [isNotificationConfirmed, setNotificationConfirmed] = useState(false);
  const [countNotifiCation, setCountNotification] = useState([]);

  const history = useHistory();
  useEffect(() => {
    const fetchApi = () => {
      tourApi
        .SendMessageTourExpired()
        .then((payload) => {
          if (payload.length > 0) {
            setNotificationConfirmed(true);
          }
          setCountNotification(payload);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchApi();
  }, []);

  //
  useEffect(() => {
    const interval = setInterval(() => {
      tourApi
        .SendMessageTourExpired()
        .then((payload) => {
          if (payload.length > 0) {
            setNotificationConfirmed(true);
          }
          setCountNotification(payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  const handleSidebarControlButton = (event) => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector(".cr-sidebar").classList.toggle("cr-sidebar--open");
  };
  return (
    <>
      <Navbar light expand className="cr-header bg-white">
        <Nav navbar className="mr-2">
          <Button outline onClick={handleSidebarControlButton}>
            <MdClearAll size={30} />
          </Button>
        </Nav>
        <Nav navbar className="cr-header__nav-right">
          <NavItem className="d-inline-flex">
            <NavLink
              id="Popover1"
              onClick={() => {
                setNotificationConfirmed(false);
              }}
              className="position-relative"
            >
              <MdNotificationsActive
                size={30}
                className="text-secondary can-click animated swing infinite"
                // onClick={this.toggleNotificationPopover}
              />

              {isNotificationConfirmed && (
                <span
                  className="position-absolute badge badge-primary"
                  style={{
                    top: -6,
                    right: 0,
                    bottom: -3,
                    width: "20px",
                    backgroundColor: "#6a82fb",
                    color: "#fff",
                    borderRadius: "50%",
                    border: "1px solid rgb(255, 255, 255)",
                    height: "20px",
                    display: "inline-block",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <small style={{ fontSize: "11px", fontWeight: "400" }}>
                    {`${countNotifiCation.length}`}
                  </small>
                </span>
              )}
            </NavLink>
            <UncontrolledPopover placement="bottom" target="Popover1">
              <PopoverHeader style={{ fontSize: "13px", fontWeight: 400 }}>
                Thông báo
              </PopoverHeader>
              <PopoverBody style={{ fontSize: "12px", fontWeight: 400 }}>
                {countNotifiCation.length === 0 &&
                  "Không có thông báo nào đến từ mytour"}
                {countNotifiCation.length >= 0 && (
                  <div>
                    {countNotifiCation.map((item, key) => (
                      <p className="text-danger" key={key}>
                        <Link
                          to={`/admin/TourManager/Edit/tourID=${item.messageTour}`}
                        >
                          {`Cập nhật ngày b/đầu TourID ${item.messageTour.slice(
                            0,
                            13
                          )}...`}
                        </Link>
                      </p>
                    ))}
                  </div>
                )}
              </PopoverBody>
            </UncontrolledPopover>
          </NavItem>
          <NavItem>
            <NavLink id="Popover2">
              <img
                className="cr-header__avatar rounded-circle"
                src="https://reduction-admin.github.io/react-reduction/static/media/100_4.978e51b5.jpg"
                alt=""
              />
            </NavLink>
            <UncontrolledPopover
              className="p-0 border-0"
              style={{ minWidth: 250 }}
              placement="bottom"
              target="Popover2"
            >
              <PopoverBody
                className="p-0 border-light"
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                }}
              >
                <Card
                  inverse
                  style={{
                    background: "linear-gradient(180deg,#6a82fb,#fc5c7d)",
                  }}
                  className="border-light"
                >
                  <CardBody className="d-flex justify-content-center align-items-center flex-column">
                    <img
                      className="rounded-circle mb-2"
                      src={
                        JSON.parse(localStorage.getItem("accessTokenEmp")).data
                          .avatar ||
                        "https://reduction-admin.github.io/react-reduction/static/media/100_4.978e51b5.jpg"
                      }
                      alt="logo"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%!important",
                      }}
                    />
                    <CardTitle>
                      {
                        JSON.parse(localStorage.getItem("accessTokenEmp")).data
                          .empName
                      }
                    </CardTitle>
                    <CardText>
                      {
                        JSON.parse(localStorage.getItem("accessTokenEmp")).data
                          .email
                      }
                    </CardText>
                  </CardBody>
                  <ListGroup flush style={{ fontSize: "14px", color: "red" }}>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin size={21} /> Thông tin cá nhân
                    </ListGroupItem>
                    <ListGroupItem
                      tag="button"
                      onClick={() => {
                        localStorage.removeItem("accessTokenEmp");
                        history.push("/admin/login");
                      }}
                      action
                      className="border-light"
                    >
                      <MdExitToApp size={20} /> Đăng xuất
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </PopoverBody>
            </UncontrolledPopover>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}

Header.propTypes = {};

export default Header;
