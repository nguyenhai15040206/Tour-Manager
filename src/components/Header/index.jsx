import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login/Index";
import "./styles.scss";

function Header(props) {
  const [open, setOpen] = useState("closed");

  const handleClickShowLogin = () => {
    setOpen("open");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "16px";
  };

  const handleClickClosedLogin = () => {
    setOpen("closed");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__top-bar">
          <ul className="header__list-menu">
            <li className="header__item">
              <Link to="/">
                <img
                  className="header__logo"
                  src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour_white.svg"
                  alt="header-logo"
                />
              </Link>
            </li>
            <li className="header__item">
              <Link to="/khach-san">Khách sạn</Link>
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

Header.propTypes = {};

export default Header;
