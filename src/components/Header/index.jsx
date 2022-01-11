import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login/Index";
import icon_logo_mytour_white from "../../assets/logo/icon_logo_mytour_white.svg";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { GetToken } from "../../features/Admins/Slices/SliceCustomer";
import { unwrapResult } from "@reduxjs/toolkit";

import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authentication } from "../../App/FirebaseConfig";
import imageDefault from "../../assets/logo/images.jpg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { FastField, Form, Formik } from "formik";
import InputField from "../../CustomFields/InputField/Index";
import { GrLinkNext } from "react-icons/gr";
import { Adm_BookingTourDetails } from "../../features/Admins/Slices/SliceBookingTour";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";

function Header(props) {
  const { position, background, color, logo, boxShadow } = props;
  const [open, setOpen] = useState(false);
  const [showModalBooking, setShowModalBooking] = useState(false);
  const [active, setAtive] = useState(false);
  const [checkLogin, setCheckLogin] = useState(true);
  const [timeoutLoading, setTimeoutLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  //#region
  const handleClickShowLogin = () => {
    setOpen(!open);
  };

  const toggle = () => {
    setAtive(!active);
  };
  const toggle1 = () => {
    setOpen(false);
  };

  window.onscroll = () => {
    setAtive(false);
  };

  //#endregion

  //
  const handleOnSubmitLogin = (values) => {
    setTimeoutLoading(true);
    setTimeout(() => {
      setTimeoutLoading(false);
      dispatch(GetToken(values))
        .then(unwrapResult)
        .then((payload) => {
          localStorage.setItem("accessTokenCustomer", JSON.stringify(payload));
          setCheckLogin(true);
          setIsLogin(true);
          setOpen(false);
        })
        .catch((err) => {
          console.log(isLogin);
          setIsLogin(false);
          setCheckLogin(false);
          console.log(err.error);
        });
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessTokenCustomer");
    setIsLogin(false);
  };

  //#region  login with facebook
  //==
  const handleClickLoginFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //
  // onAuthStateChanged((user) => {
  //   console.log(user);
  // });

  // logout = () => {
  //   auth().signOut().then(() => {
  //     this.setState({user: null})
  //   })
  // }
  //#endregion

  //
  const handleClickOnSubmitSearchBooking = (values) => {
    console.log(values);
    const params = {
      pID: values.InputSearch,
    };
    dispatch(Adm_BookingTourDetails(params))
      .then(unwrapResult)
      .then((payload) => {
        console.log(payload);
        history.push(
          `/my-tour/show-customer-for-booking-tour-details/bookingID=${payload?.data?.bookingTourId}`
        );
      })
      .catch((err) => {
        if (err.status === 404) {
          return NotificationManager.warning(
            `Không tồn tại booking này`,
            "Vui lòng kiểm ra lại!",
            2500
          );
        }
        return NotificationManager.warning(
          `Mã sai định dạng!!!`,
          "Vui lòng kiểm ra lại!",
          2500
        );
      });
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
                <Link to="/my-tour/danh-sach-tim-kiem-tour/params=0/0/0/0/0">
                  Tour & Sự kiện
                </Link>
              </li>
              <li className="header__item">
                <Link
                  to={"/my-tour/News"}
                  style={{ fontFamily: "Poppins ,sans-serif" }}
                >
                  Tin tức
                </Link>
              </li>
              <li className="header__item">
                <a
                  onClick={() => {
                    setShowModalBooking(true);
                  }}
                >
                  Tra cứu booking
                </a>
                <Modal
                  className="modal-lg modal-search-booking"
                  style={{ marginTop: "70px", borderRadius: "15px" }}
                  isOpen={showModalBooking}
                  toggle={() => {
                    setShowModalBooking(false);
                  }}
                >
                  <ModalHeader
                    toggle={() => {
                      setShowModalBooking(false);
                    }}
                  ></ModalHeader>
                  <ModalBody>
                    <Formik
                      onSubmit={handleClickOnSubmitSearchBooking}
                      initialValues={{ InputSearch: "" }}
                    >
                      {(formolProps) => {
                        return (
                          <Form>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ width: "80%" }}>
                                <FastField
                                  placeholder="Nhập mã booking"
                                  className="h-textbox-searchBooking"
                                  name="InputSearch"
                                  component={InputField}
                                ></FastField>
                              </div>
                              <div>
                                <button
                                  type="submit"
                                  className="h-button-search-booking"
                                >
                                  <i
                                    className="fa fa-search h-btn-search"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                            </div>
                            <button></button>
                          </Form>
                        );
                      }}
                    </Formik>
                  </ModalBody>
                </Modal>
              </li>
              <li className="header__item">
                <Link to="/my-tour/Contact">Liên hệ</Link>
              </li>
            </ul>
            <nav className="header__info">
              <ul className="header__info--list">
                {/* <li className="header__info--item">
                  <a href="index.html">
                    <i className="far fa-handshake"></i>
                    Hợp tác với chúng tôi
                  </a>
                </li> */}
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
                {localStorage.getItem("accessTokenCustomer") === null ? (
                  <li className="header__info--item">
                    <i
                      className="far fa-user-circle"
                      onClick={() => {
                        handleClickShowLogin();
                      }}
                    ></i>
                    <Login
                      timeoutLoading={timeoutLoading}
                      showModal={open}
                      toggle={toggle1}
                      isLogin={checkLogin}
                      OnClickLoginFacebook={handleClickLoginFacebook}
                      onSubmitlogin={handleOnSubmitLogin}
                    />
                  </li>
                ) : (
                  <li className="header__info--item">
                    <div
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        width: "auto",
                        height: "auto",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        style={{
                          height: "20px",
                          width: "20px",
                          borderRadius: "50%",
                        }}
                        src={
                          JSON.stringify(
                            localStorage.getItem("accessTokenCustomer")
                          )?.data?.Img
                            ? ""
                            : `${imageDefault}`
                        }
                      />
                      <span style={{ marginLeft: "3px" }}>
                        {JSON.parse(
                          localStorage.getItem("accessTokenCustomer")
                        )?.data?.customerName.slice(0, 6)}
                        <RiArrowDropDownLine size={25} />
                      </span>
                    </div>
                    <ul
                      className="dropdown-menu dropdown-menu-custom"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/my-tour/customer/Profile/pID=${
                            JSON.parse(
                              localStorage.getItem("accessTokenCustomer")
                            )?.data?.customerId
                          }}`}
                        >
                          Tài khoản
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/my-tour/customer/booking-by-customer/pID=${
                            JSON.parse(
                              localStorage.getItem("accessTokenCustomer")
                            )?.data?.customerId
                          }`}
                        >
                          Yêu thích
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Đơn đặt chỗ
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            handleLogout();
                          }}
                        >
                          Đăng xuất <MdLogout size={15} />
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
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
