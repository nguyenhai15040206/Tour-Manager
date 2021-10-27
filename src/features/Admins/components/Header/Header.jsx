import React from "react";
import { MdClearAll, MdNotificationsActive } from "react-icons/md";
import { Button, Nav, Navbar, NavItem, NavLink } from "reactstrap";
import "./styles.scss";

function Header(props) {
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
            <MdNotificationsActive
              size={30}
              className="text-secondary can-click animated swing infinite"
              // onClick={this.toggleNotificationPopover}
            />
          </NavItem>
          <NavItem>
            <NavLink>
              <img
                className="cr-header__avatar rounded-circle"
                src="https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-1/c0.80.240.240a/p240x240/176880266_1609953652536323_438876987912733542_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=SqGaeFhVJfIAX8jXaiB&_nc_ht=scontent.fdad3-3.fna&oh=5e050d18dc7e891764598eaa2528533c&oe=619BDA22"
                alt=""
              />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}

Header.propTypes = {};

export default Header;
