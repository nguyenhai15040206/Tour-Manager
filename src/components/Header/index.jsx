import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login/Index";
import "./styles.scss";

function Header(props) {
  const { position, background, color, logo, boxShadow } = props;
  const [open, setOpen] = useState("closed");

  const handleClickShowLogin = () => {
    setOpen("open");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "18px";
  };

  const handleClickClosedLogin = () => {
    setOpen("closed");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  };

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
      <div className="container">
        <div className="header__top-bar">
          <ul className="header__list-menu">
            <li className="header__item">
              <Link to="/">
                <img className="header__logo" src={logo} alt="header-logo" />
              </Link>
            </li>
            <li className="header__item">
              <Link to="/my-tour/khach-san">Khách sạn</Link>
            </li>
            <li className="header__item">
              <a href="index.html">Vé máy bay</a>
            </li>
            <li className="header__item">
              <a href="index.html">Tour & Sự kiện</a>
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
  logo: "https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour_white.svg",
  color: "#ffffff",
  position: "absolute",
  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.02) 100%)",
  boxShadow: "none",
};

export default Header;
