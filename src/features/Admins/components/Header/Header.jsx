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
                src="https://reduction-admin.github.io/react-reduction/static/media/100_4.978e51b5.jpg"
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
