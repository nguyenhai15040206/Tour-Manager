import React, { useState } from "react";
import {
  MdArrowDropDownCircle,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdRadioButtonChecked,
  MdStar,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
} from "react-icons/md";
import { FaMapMarkedAlt, FaCanadianMapleLeaf } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { RiMapPin2Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BsNavLink,
} from "reactstrap";
import logo200Image from "../../../../assets/logo/logo_200.png";
import backgroundSidebar from "../../../../assets/sidebar/sidebar-4.jpg";
import "./styles.scss";

const sidebarBackground = {
  backgroundImage: `url("${backgroundSidebar}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const navItems = [
  { to: "/admin", name: "dashboard", exact: true, Icon: MdDashboard },
  { to: "/admin/TouristAttraction", name: "cards", exact: false, Icon: MdWeb },
  { to: "/admin/Employee", name: "charts", exact: false, Icon: MdInsertChart },
  { to: "/admin/anh", name: "widgets", exact: false, Icon: MdWidgets },
];
const navGeographySocial = [
  {
    to: "/admin/Province",
    name: "DS Tỉnh/thành phố",
    exact: false,
    Icon: FaMapMarkedAlt,
  },
  {
    to: "/admin/District",
    name: "DS Quận/huyện",
    exact: false,
    Icon: SiOpenstreetmap,
  },
  {
    to: "/admin/Village",
    name: "DS Phường/xã",
    exact: false,
    Icon: RiMapPin2Fill,
  },
];
const navComponents = [
  {
    to: "/admin/buttons",
    name: "buttons",
    exact: false,
    Icon: MdRadioButtonChecked,
  },
  {
    to: "/admin/button-groups",
    name: "button groups",
    exact: false,
    Icon: MdGroupWork,
  },
  { to: "/admin/forms", name: "forms", exact: false, Icon: MdChromeReaderMode },
  {
    to: "/admin/input-groups",
    name: "input groups",
    exact: false,
    Icon: MdViewList,
  },
  {
    to: "/admin/dropdowns",
    name: "dropdowns",
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  { to: "/admin/badges", name: "badges", exact: false, Icon: MdStar },
  {
    to: "/admin/alerts",
    name: "alerts",
    exact: false,
    Icon: MdNotificationsActive,
  },
  { to: "/admin/progress", name: "progress", exact: false, Icon: MdBrush },
  { to: "/admin/modals", name: "modals", exact: false, Icon: MdViewDay },
];

function Sidebar(props) {
  // state = {
  //   isOpenComponents: true,
  //   isOpenContents: true,
  //   isOpenPages: true,
  // };
  const [isOpenComponents, setOpenComponent] = useState(false);
  const [isOpenGeographySocial, setOpenGeographySocial] = useState(false);
  const handleClick = () => {
    setOpenComponent(!isOpenComponents);
  };
  const handleClickGeographySocial = () => {
    setOpenGeographySocial(!isOpenGeographySocial);
  };
  return (
    <aside
      className="cr-sidebar cr-sidebar--open"
      data-image={backgroundSidebar}
    >
      <div className="cr-sidebar__background" style={sidebarBackground}></div>
      <div className="cr-sidebar__content">
        <Navbar>
          <Link className="cr-background__admin" to="/admin/nht">
            <img src={logo200Image} className="pr-2" alt="" />
            <img
              alt=""
              src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour_white.svg"
            />
            {/* <SiPhpmyadmin /> */}
            {/* <span className="text-white">Admin</span> */}
          </Link>
        </Navbar>
        <Nav vertical>
          {navItems.map(({ to, name, exact, Icon }, index) => (
            <NavItem key={index} className="cr-sidebar__nav-item">
              <BsNavLink
                id={`navItem-${name}-${index}`}
                className="text-uppercase"
                tag={NavLink}
                to={to}
                activeClassName="active"
                exact={exact}
              >
                <Icon className="cr-sidebar__nav-item-icon" />
                <span className="">{name}</span>
              </BsNavLink>
            </NavItem>
          ))}
          <NavItem
            className="cr-sidebar__nav-item"
            onClick={() => {
              handleClick();
            }}
          >
            <BsNavLink className="cr-sidebar__nav-item-collapse">
              <div className="d-flex">
                <MdExtension className="cr-sidebar__nav-item-icon" />
                <span className=" align-self-start">Components</span>
              </div>
              <MdKeyboardArrowDown
                className="cr-sidebar__nav-item-icon"
                style={{
                  padding: 0,
                  transform: isOpenComponents
                    ? "rotate(0deg)"
                    : "rotate(-90deg)",
                  transition: "transform 0.3s",
                }}
              />
            </BsNavLink>
          </NavItem>
          <Collapse isOpen={isOpenComponents}>
            {navComponents.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className="cr-sidebar__nav-item">
                <BsNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className="cr-sidebar__nav-item-icon" />
                  <span className="">{name}</span>
                </BsNavLink>
              </NavItem>
            ))}
          </Collapse>
          <NavItem
            className="cr-sidebar__nav-item"
            onClick={() => {
              handleClickGeographySocial();
            }}
          >
            <BsNavLink className="cr-sidebar__nav-item-collapse">
              <div className="d-flex">
                <FaCanadianMapleLeaf className="cr-sidebar__nav-item-icon" />
                <span className=" align-self-start">Địa lý - xã hội</span>
              </div>
              <MdKeyboardArrowDown
                className="cr-sidebar__nav-item-icon"
                style={{
                  padding: 0,
                  transform: isOpenGeographySocial
                    ? "rotate(0deg)"
                    : "rotate(-90deg)",
                  transition: "transform 0.3s",
                }}
              />
            </BsNavLink>
          </NavItem>
          <Collapse isOpen={isOpenGeographySocial}>
            {navGeographySocial.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className="cr-sidebar__nav-item">
                <BsNavLink
                  id={`navItem-${name}-${index}`}
                  className=""
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className="cr-sidebar__nav-item-icon" />
                  <span className="">{name}</span>
                </BsNavLink>
              </NavItem>
            ))}
          </Collapse>
        </Nav>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
