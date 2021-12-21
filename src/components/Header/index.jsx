import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login/Index";
import icon_logo_mytour_white from "../../assets/logo/icon_logo_mytour_white.svg";
import "./styles.scss";
import { Col, Row } from "reactstrap";

function Header(props) {
  const { position, background, color, logo, boxShadow } = props;
  const [open, setOpen] = useState("closed");
  const [active, setAtive] = useState(false);

  const handleClickShowLogin = () => {
    setOpen("open");
  };

  const handleClickClosedLogin = () => {
    setOpen("closed");
  };

  const toggle = () => {
    setAtive(!active);
  };

  // window.onscroll = () => {
  //   setAtive(false);
  // };

  return (
    <header
      className="header"
      style={{
        color: `${color}`,
        position: `${position}`,
        background: `${background}`,
        boxShadow: `${boxShadow}`,
      }}
    >
      <div className="container header-responsive">
        <div
          id="menu-btn"
          onClick={() => {
            toggle();
          }}
          className="fas fa-bars"
        ></div>
        <div className="header-menu">
          <Link to="/">
            <img className="header__logo" src={logo} alt="header-logo" />
          </Link>
          <div className={`header__top-bar ${active ? "active" : ""}`}>
            <ul className="header__list-menu">
              <li className="header__item"></li>
              <li className="header__item ">
                <a href="index.html">Tour & Sự kiện</a>
              </li>
              <li className="header__item">
                <Link to="/my-tour/khach-san">Khách sạn</Link>
              </li>
              <li className="header__item">
                <a href="index.html">The Memory</a>
              </li>
            </ul>
            <nav className="header__info">
              <ul className="header__info--list">
                <li className="header__info--item">
                  <a href="index.html">
                    <i className="far fa-handshake"></i>
                    Hợp tác với chúng tôi
                  </a>
                </li>
                <li className="header__info--item">
                  <a href="tel:0357866848">
                    <i className="fas fa-phone-alt"></i>
                    0357866848
                  </a>
                </li>
                <li className="header__info--item">
                  <a href="index.html">
                    <i className="far fa-bell"></i>
                  </a>
                </li>
                <li className="header__info--item">
                  <i
                    className="far fa-user-circle"
                    onClick={() => {
                      handleClickShowLogin();
                    }}
                  ></i>
                  <Login open={open} closedLogin={handleClickClosedLogin} />
                </li>
                <li className="header__info--item">
                  <a href="index.html">
                    <i className="fas fa-bars"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  color: PropTypes.string,
  position: PropTypes.string,
  background: PropTypes.string,
  logo: PropTypes.string,
  boxShadow: PropTypes.string,
};

Header.defaultProps = {
  logo: icon_logo_mytour_white,
  color: "#ffffff",
  position: "absolute",
  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.02) 100%)",
  boxShadow: "none",
};

export default Header;
