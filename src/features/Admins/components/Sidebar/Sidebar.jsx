import React, { useState, useEffect } from "react";
import { BiBrightness, BiCategory } from "react-icons/bi";
import {
  FaCanadianMapleLeaf,
  FaMapMarkedAlt,
  FaUsersCog,
  FaUserTag,
} from "react-icons/fa";
import { BsUiChecks } from "react-icons/bs";
import { IoNewspaper } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { ImUserCheck } from "react-icons/im";
import {
  MdKeyboardArrowDown,
  MdOutlineAirplaneTicket,
  MdOutlineTravelExplore,
} from "react-icons/md";
import { RiMapPin2Fill, RiUserHeartFill } from "react-icons/ri";
import {
  SiGoogletagmanager,
  SiOpenstreetmap,
  SiYourtraveldottv,
} from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BsNavLink,
} from "reactstrap";
import permisstionApi from "../../../../apis/PermissionApi";
import logo200Image from "../../../../assets/logo/logo_200.png";
import backgroundSidebar from "../../../../assets/sidebar/sidebar-4.jpg";
import "./styles.scss";

//#region  danh  mục màn hình
const sidebarBackground = {
  backgroundImage: `url("${backgroundSidebar}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const navItems = [
  {
    key: "1e829721-3f46-4713-af29-ddeea00aedb6",
    to: "/admin/BookingManager",
    name: "Quản lý booking",
    exact: false,
    Icon: BiCategory,
  },
  {
    key: "4fc03cf1-442e-4524-b484-1fb510498143",
    to: "/admin/Transport",
    name: "Phương tiện di chuyển",
    exact: false,
    Icon: MdOutlineAirplaneTicket,
  },
];

const navDashboard = [
  {
    key: "4fc03cf1-442e-4524-b484-1fb510498143",
    to: "/admin/Dashboard",
    name: "Thống kê - báo cáo",
    exact: false,
    Icon: BsUiChecks,
  },
];

const navItemUserManager = [
  {
    key: "1a0db068-98f5-451b-85fa-1fe1aa2c0891",
    to: "/admin/Employee",
    name: "Quản lý nhân viên",
    exact: false,
    Icon: ImUserCheck,
  },
  {
    key: "d7ddf920-8f3f-4fd9-aa8b-b86a7fc2981d",
    to: "/admin/TourGuide",
    name: "Quản lý thông tin HDV",
    exact: false,
    Icon: BiBrightness,
  },
  {
    key: "084f1a11-b440-4d2c-ba53-492f741cb4a5",
    to: "/admin/Customer",
    name: "Quản lý khách hàng",
    exact: false,
    Icon: RiUserHeartFill,
  },
];

const navItemUserPermision = [
  {
    key: "28c40fbc-b368-4aaa-868d-08aeed1ec469",
    to: "/admin/News",
    name: "Quản lý tin tức",
    exact: false,
    Icon: IoNewspaper,
  },
  {
    key: "273eebbc-6aa0-436d-b426-66ec379080a5",
    to: "/admin/Permission",
    name: "Quản lý phân quyền",
    exact: false,
    Icon: FaUsersCog,
  },
];

const navTourManager = [
  {
    key: "5d4adb20-a61a-45e8-80e5-523b2f92e838",
    to: "/admin/TourManager",
    name: "Quản lý tour du lịch",
    exact: false,
    Icon: SiYourtraveldottv,
  },
  {
    key: "bd9d4dce-2153-45b2-818c-5b9c4ca4c426",
    to: "/admin/TouristAttraction",
    name: "DS địa điểm du lịch",
    exact: false,
    Icon: MdOutlineTravelExplore,
  },
  {
    key: "9ac7e8d1-03b6-4332-b46c-90f207366ebb",
    to: "/admin/Promotion",
    name: "Khuyến mãi",
    exact: false,
    Icon: HiOutlineSpeakerphone,
  },
];
const navGeographySocial = [
  {
    key: "9643d286-8d04-4b67-a175-7e38fa35bc7c",
    to: "/admin/Province",
    name: "DS Tỉnh/thành phố",
    exact: false,
    Icon: FaMapMarkedAlt,
  },
  {
    key: "ec753771-151f-475c-8e0d-0fe26b50d43b",
    to: "/admin/District",
    name: "DS Quận/huyện",
    exact: false,
    Icon: SiOpenstreetmap,
  },
  {
    key: "3d668546-7b15-48c1-af38-38b83d501123",
    to: "/admin/Village",
    name: "DS Phường/xã",
    exact: false,
    Icon: RiMapPin2Fill,
  },
];

//#endregion

function Sidebar(props) {
  const [isOpenComponents, setOpenComponent] = useState(false);
  const [isOpenGeographySocial, setOpenGeographySocial] = useState(false);
  const [isOpenTourManager, setOpenTourManager] = useState(false);
  const [dataPermission, setDataPermission] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const empID = JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId;
      permisstionApi
        .Adm_GetAllPermissionByEmpID({ pID: empID })
        .then((res) => {
          setDataPermission(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  //========== hanlcik show
  const handleClick = () => {
    setOpenComponent(!isOpenComponents);
  };
  const handleClickGeographySocial = () => {
    setOpenGeographySocial(!isOpenGeographySocial);
  };

  const handleClickTourManager = () => {
    setOpenTourManager(!isOpenTourManager);
  };

  const renderItem = (arrNav) => {
    var arrObj = [];
    for (let i = 0; i < arrNav.length; i++) {
      if (dataPermission.includes(String(arrNav[i]?.key))) {
        const { to, name, exact, Icon } = arrNav[i];
        arrObj.push(
          <NavItem key={i} className="cr-sidebar__nav-item">
            <BsNavLink
              id={`navItem-${name}-${i}`}
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
        );
      }
    }
    return arrObj;
  };
  return (
    <aside
      className="cr-sidebar cr-sidebar--open"
      data-image={backgroundSidebar}
    >
      <div className="cr-sidebar__background" style={sidebarBackground}></div>
      <div className="cr-sidebar__content">
        <Navbar>
          <Link className="cr-background__admin" to="/admin/Dashboard">
            <img src={logo200Image} className="pr-2" alt="" />
            <img
              alt=""
              src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour_white.svg"
            />
          </Link>
        </Navbar>
        <Nav vertical>
          {renderItem(navDashboard)}
          <NavItem
            className="cr-sidebar__nav-item"
            onClick={() => {
              handleClickTourManager();
            }}
          >
            <BsNavLink className="cr-sidebar__nav-item-collapse">
              <div>
                <SiGoogletagmanager className="cr-sidebar__nav-item-icon" />
                <span className=" align-self-start">Danh mục Travel</span>
              </div>
              <MdKeyboardArrowDown
                className="cr-sidebar__nav-item-icon"
                style={{
                  padding: 0,
                  transform: isOpenTourManager
                    ? "rotate(0deg)"
                    : "rotate(-90deg)",
                  transition: "transform 0.3s",
                }}
              />
            </BsNavLink>
          </NavItem>
          <Collapse isOpen={isOpenTourManager}>
            {renderItem(navTourManager)}
          </Collapse>
          {renderItem(navItems)}
          <NavItem
            className="cr-sidebar__nav-item"
            onClick={() => {
              handleClick();
            }}
          >
            <BsNavLink className="cr-sidebar__nav-item-collapse">
              <div>
                <FaUserTag className="cr-sidebar__nav-item-icon" />
                <span className=" align-self-start">Quản lý người dùng</span>
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
            {renderItem(navItemUserManager)}
            {/* {navItemUserManager.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className="cr-sidebar__nav-item">
                <BsNavLink
                  id={`navItem-${name}-${index}`}
                  //className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className="cr-sidebar__nav-item-icon" />
                  <span className="">{name}</span>
                </BsNavLink>
              </NavItem>
            ))} */}
          </Collapse>
          <NavItem
            className="cr-sidebar__nav-item"
            onClick={() => {
              handleClickGeographySocial();
            }}
          >
            <BsNavLink className="cr-sidebar__nav-item-collapse">
              <div>
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
            {renderItem(navGeographySocial)}
          </Collapse>

          {/* Quản lý phân quyền */}
          {renderItem(navItemUserPermision)}
        </Nav>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
