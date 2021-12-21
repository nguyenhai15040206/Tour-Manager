import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import {
  MdAddCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";
import { MultiStepForm, Step } from "react-multi-form";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Col, Input, Row, Spinner } from "reactstrap";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading/Index";
import { formatCash } from "../../../utils/format";
import { Adm_BookingTour } from "../../Admins/Slices/SliceBookingTour";
import { Adm_GetEnumList } from "../../Admins/Slices/SliceEnumConstant";
import { Cli_GetTourDetailsByTourID } from "../../Admins/Slices/SliceTour";
import AcceptBooking from "./AcceptBooking";
import BookingForm from "./BookingForm";
import Paypalment from "./Paypalment";
import "./styles.scss";

//===
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//============
function BookingTour() {
  document.title = "Đặt tour";
  let { tourID } = useParams();
  // state in component
  const [multiStep, setMultiStep] = useState(1); // step over
  const [quanityAdult, setQuanityAdult] = useState(1); // số lượng người lớn
  const [quanityChildren, setQuanityChildren] = useState(0); // số lượng trẻ nhỏ
  const [quanityBaby, setQuanityBaby] = useState(0); // số lượng trẻ con
  const [quanityInfant, setQuanityInfant] = useState(0); // số lượng trẻ sơ sinh
  const [totalMoney, setTotalMoney] = useState(null);
  const [objBooking, setObjBooking] = useState({});
  //end
  // state in store
  const { Cli_TourDetails, loading } = useSelector((state) => state?.tour);
  const { data } = useSelector((state) => state.enumConstant);
  const stateBooking = useSelector((state) => state.bookingTour);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  }, [tourID, multiStep]);

  useEffect(() => {
    const fetchDataTourDetails = async () => {
      try {
        const params = {
          tourID: tourID,
        };
        await dispatch(Cli_GetTourDetailsByTourID(params));
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataTourDetails();
  }, [dispatch, tourID]);

  useEffect(() => {
    const fetchDataEnum = async () => {
      try {
        const params = {
          enumTypeName: "OptionNoteByCustomer",
        };
        await dispatch(Adm_GetEnumList(params));
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataEnum();
  }, [dispatch, tourID]);

  //==================

  //#region  xử lý thay đổi số lượng booking => thay đổi giá tiền tại tông
  const handleChangeAdult = (typeChange) => {
    const stateOld = quanityAdult;
    if (Number(typeChange) === 1) {
      if (stateOld <= 1) {
        return NotificationManager.warning(
          `Số lượng người lớn tối thiểu là 1!`,
          "Warning!!!",
          2500
        );
      } else {
        setQuanityAdult(stateOld - 1);
        setTotalMoney(
          (stateOld - 1) * Cli_TourDetails?.adultUnitPrice +
            quanityChildren * Cli_TourDetails?.childrenUnitPrice +
            quanityBaby * Cli_TourDetails?.babyUnitPrice
        );
      }
    } else {
      if (
        stateOld + quanityBaby + quanityChildren >=
        Cli_TourDetails?.quanity
      ) {
        return NotificationManager.warning(
          `Tổng số lượng tối đa là ${Cli_TourDetails?.quanity}!`,
          "Warning!!!",
          2500
        );
      } else {
        setQuanityAdult(stateOld + 1);
        setTotalMoney(
          (stateOld + 1) * Cli_TourDetails?.adultUnitPrice +
            quanityChildren * Cli_TourDetails?.childrenUnitPrice +
            quanityBaby * Cli_TourDetails?.babyUnitPrice
        );
      }
    }
  };

  const handleChangeChildren = (typeChange) => {
    const stateOld = quanityChildren;
    if (Number(typeChange) === 1) {
      if (stateOld < 1) {
        return NotificationManager.warning(
          `Số lượng trẻ em tối thiểu là 1!`,
          "Warning!!!",
          2500
        );
      } else {
        setQuanityChildren(stateOld - 1);
        setTotalMoney(
          (stateOld - 1) * Cli_TourDetails?.childrenUnitPrice +
            quanityAdult * Cli_TourDetails?.adultUnitPrice +
            quanityBaby * Cli_TourDetails?.babyUnitPrice
        );
      }
    } else {
      if (stateOld + quanityBaby + quanityAdult >= Cli_TourDetails?.quanity) {
        return NotificationManager.warning(
          `Tổng số lượng tối đa là ${Cli_TourDetails?.quanity}!`,
          "Warning!!!",
          2500
        );
      } else {
        setQuanityChildren(stateOld + 1);
        setTotalMoney(
          (stateOld + 1) * Cli_TourDetails?.childrenUnitPrice +
            quanityAdult * Cli_TourDetails?.adultUnitPrice +
            quanityBaby * Cli_TourDetails?.babyUnitPrice
        );
      }
    }
  };
  const handleChangeBaby = (typeChange) => {
    const stateOld = quanityBaby;
    if (Number(typeChange) === 1) {
      if (stateOld < 1) {
        return NotificationManager.warning(
          `Số lượng trẻ nhỏ tối thiểu là 1!`,
          "Warning!!!",
          2500
        );
      } else {
        setQuanityBaby(stateOld - 1);
        setTotalMoney(
          (stateOld - 1) * Cli_TourDetails?.babyUnitPrice +
            quanityAdult * Cli_TourDetails?.adultUnitPrice +
            quanityChildren * Cli_TourDetails?.childrenUnitPrice
        );
      }
    } else {
      if (
        stateOld + quanityAdult + quanityChildren >=
        Cli_TourDetails?.quanity
      ) {
        return NotificationManager.warning(
          `Tổng số lượng tối đa là 2!`,
          "Warning!!!",
          2500
        );
      } else {
        setQuanityBaby(stateOld + 1);
        setTotalMoney(
          (stateOld + 1) * Cli_TourDetails?.babyUnitPrice +
            quanityAdult * Cli_TourDetails?.adultUnitPrice +
            quanityChildren * Cli_TourDetails?.childrenUnitPrice
        );
      }
    }
  };
  const handleChangeInflant = (typeChange) => {
    const stateOld = quanityInfant;
    if (Number(typeChange) === 1) {
      if (stateOld < 1) {
        return NotificationManager.warning(
          `Số lượng em bé tối thiểu là 1!`,
          "Warning!!!",
          2500
        );
      } else {
        setQuanityInfant(stateOld - 1);
      }
    } else {
      if (stateOld >= 2) {
        return NotificationManager.warning(
          `Số lượng em bé tối đa là 2!`,
          "Warning!!!",
          2500
        );
      } else {
        setQuanityInfant(stateOld + 1);
      }
    }
  };
  //#endregion
  //============

  const onSubmitStepOne = () => {
    const fullName = document.getElementById("FullNameCustomer");
    const email = document.getElementById("EmailCustomer");
    const phoneNumber = document.getElementById("PhoneNumberCustomer");
    const address = document.getElementById("AddressCustomer");
    const noteByCustomer = document.getElementById("NoteByCustomer-Booking");

    //#region  kiểm tra dữ liệu đầu vào validatetionShema
    if (fullName.value.trim() === "") {
      // input[""]
      fullName.focus();
      return NotificationManager.warning(
        `Vui lòng điền họ và tên!`,
        "Warning!!!",
        2500
      );
    }
    if (email.value.trim() === "") {
      email.focus();
      return NotificationManager.warning(
        `Vui lòng điền email!`,
        "Warning!!!",
        2500
      );
    }
    if (phoneNumber.value.trim() === "") {
      phoneNumber.focus();
      return NotificationManager.warning(
        `Vui lòng điền số điện thoại hợp lệ!`,
        "Warning!!!",
        2500
      );
    }
    //#endregion
    if (
      phoneNumber.value.trim() !== "" &&
      email.value.trim() !== "" &&
      fullName.value.trim() !== ""
    ) {
      //#region  // check phone number email
      if (
        !phoneRegExp.test(phoneNumber.value.trim()) ||
        phoneNumber.value.trim().length !== 10
      ) {
        phoneNumber.focus();
        return NotificationManager.warning(
          `Vui lòng điền số điện thoại hợp lệ!`,
          "Warning!!!",
          2500
        );
      }
      if (!email.value.trim().match(emailRegExp)) {
        email.focus();
        return NotificationManager.warning(
          `Vui lòng điền email hợp lệ!`,
          "Warning!!!",
          2500
        );
      }
      //#endregion

      // Xử lý step
      let arrOptions = [];
      Array.from(data).map((item) => {
        var options = document.getElementById(`${item?.enumerationId}`);
        if (options.checked) {
          arrOptions.push(item.enumerationName);
        }
      });
      const obj = {
        customerName: fullName.value.trim(),
        customerEmail: email.value.trim(),
        customerPhone: phoneNumber.value.trim(),
        address: address.value.trim(),
        note: noteByCustomer.value.trim(),
        optionsNote: arrOptions.join(","),
        quanityAdult: quanityAdult,
        quanityChildren: quanityChildren,
        quanityBaby: quanityBaby,
        quanityInfant: quanityInfant,
        adultUnitPrice: Cli_TourDetails.adultUnitPrice,
        childrenUnitPrice: Cli_TourDetails.childrenUnitPrice,
        babyUnitPrice: Cli_TourDetails.babyUnitPrice,
        surcharge: Cli_TourDetails.surcharge,
        totalmoneyBooking: totalMoney,
      };
      setObjBooking(obj);
      setMultiStep(2);
    }
  };

  const onSubmitStepTwo = () => {
    const checkCondition = document.getElementById("input-accept-condition");
    if (checkCondition.checked) {
      setMultiStep(3);
    } else {
      return NotificationManager.warning(
        "Bạn cần đồng ý với các điều khoản trên!",
        "Warning!!!",
        2500
      );
    }
  };

  const onSubmitStepThree = () => {
    console.log(objBooking);
    dispatch(Adm_BookingTour({ ...objBooking, tourId: tourID }))
      .then(unwrapResult)
      .then((payload) => {
        console.log(payload);
        history.push(
          `/my-tour/show-customer-for-booking-tour-details/bookingID=${payload.bookingTourId}`
        );
      })
      .catch((err) => {
        return NotificationManager.error(
          `${err.error}`,
          "Vui lòng kiểm ra lại!",
          2500
        );
      });
  };
  const handleClickBookingTour = () => {
    if (multiStep === 1) {
      // check
      onSubmitStepOne();
      return;
    }
    if (multiStep === 2) {
      onSubmitStepTwo();
      return;
    }
    if (multiStep === 3) {
      onSubmitStepThree();
      return;
    } else {
      return;
    }
  };
  //=================
  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      {stateBooking.loading === "loading" && <Loading loading={true} />}
      {loading === "loading" && (
        <div className="cr-page-spinner">
          <Spinner color="primary" />
        </div>
      )}
      {loading === "loaded" && (
        <section className="booking-tour">
          <div className="container">
            <Row className="mt-5">
              <Col>
                <MultiStepForm activeStep={multiStep}>
                  <Step label="Nhập thông tin"></Step>
                  <Step label="Xem điều khoản"></Step>
                  <Step label="Thanh toán"></Step>
                </MultiStepForm>
              </Col>
            </Row>
            <Row className="booking-tour__header">
              <Col xl={4}>
                <img src={`${Cli_TourDetails?.tourImg}`} alt="img" />
              </Col>
              <Col xl={8} className="ml-5 booking-tour__info">
                <ul className="tour--assess" style={{ marginTop: "15px" }}>
                  <span className="tour--radius">
                    4.61
                    <span></span>
                  </span>

                  <li>
                    <span>Rất tốt</span>
                  </li>
                  <li>370 Nhận xét </li>
                  <li>|</li>
                  <li>
                    Lượt đi <span>1,3k</span>
                  </li>
                </ul>
                <div className="tour-id">
                  <i className="fab fa-staylinked"></i>
                  <label
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Mã tour"
                  >{`${Cli_TourDetails?.tourId}`}</label>
                </div>
                <span className="tour--title">{Cli_TourDetails?.tourName}</span>
                <ul className="tour--info">
                  <li>
                    Khởi hành: <span>{`${Cli_TourDetails?.dateStart}`}</span>
                  </li>
                  <li>
                    Thời gian:{" "}
                    <span>{`${Cli_TourDetails?.totalDay}`} ngày</span>
                  </li>
                  <li>
                    Nơi khởi hành:{" "}
                    <span>{`${Cli_TourDetails?.provinceName}`}</span>
                  </li>
                  <li>
                    Số chỗ còn nhận:{" "}
                    <span>{`${Cli_TourDetails?.quanity}`}</span>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="mt-5">
              {multiStep === 1 && (
                <Col xl={8} lg={6}>
                  <div className="booking-tour__form">
                    <h1>Thông tin liên lạc</h1>
                    <div>
                      <BookingForm />
                    </div>
                  </div>
                  <div className="booking-tour__quanity-customer mt-3">
                    <h1>Số lượng hành khách</h1>
                    <div>
                      <Row>
                        <Col xl={6} lg={12}>
                          <div className="customer-type">
                            <div className="customer-item">
                              <ul className="age-group">
                                <li>
                                  <span>Người lớn</span>
                                </li>
                                <li> 12 tuổi trở lên</li>
                              </ul>
                              <div className="button-group-add-remove">
                                <MdOutlineRemoveCircleOutline
                                  onClick={() => {
                                    handleChangeAdult(1);
                                  }}
                                />
                                <label>{`${quanityAdult}`}</label>
                                <MdAddCircleOutline
                                  onClick={() => {
                                    handleChangeAdult(2);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl={6} lg={12}>
                          <div className="customer-type">
                            <div className="customer-item">
                              <ul className="age-group">
                                <li>
                                  <span>Trẻ em</span>
                                </li>
                                <li> Từ 5 - 11 tuổi</li>
                              </ul>
                              <div className="button-group-add-remove">
                                <MdOutlineRemoveCircleOutline
                                  onClick={() => {
                                    handleChangeChildren(1);
                                  }}
                                />
                                <label>{`${quanityChildren}`}</label>
                                <MdAddCircleOutline
                                  onClick={() => {
                                    handleChangeChildren(2);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={6} lg={12}>
                          <div className="customer-type">
                            <div className="customer-item">
                              <ul className="age-group">
                                <li>
                                  <span>Trẻ nhỏ</span>
                                </li>
                                <li> Từ 2 - 4 tuổi</li>
                              </ul>
                              <div className="button-group-add-remove">
                                <MdOutlineRemoveCircleOutline
                                  onClick={() => {
                                    handleChangeBaby(1);
                                  }}
                                />
                                <label>{`${quanityBaby}`}</label>
                                <MdAddCircleOutline
                                  onClick={() => {
                                    handleChangeBaby(2);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl={6} lg={12}>
                          <div className="customer-type">
                            <div className="customer-item">
                              <ul className="age-group">
                                <li>
                                  <span>Em bé</span>
                                </li>
                                <li>Từ 0 - 2 tuổi</li>
                              </ul>
                              <div className="button-group-add-remove">
                                <MdOutlineRemoveCircleOutline
                                  onClick={() => {
                                    handleChangeInflant(1);
                                  }}
                                />
                                <label>{`${quanityInfant}`}</label>
                                <MdAddCircleOutline
                                  onClick={() => {
                                    handleChangeInflant(2);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="booking-tour__OptionNoteByCustomer mt-3 mb-3">
                    <h1>
                      Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi !
                    </h1>
                    <div>
                      <Row>
                        {Array.from(data).map((item, index) => {
                          return (
                            <Col xl={4} lg={6} sm={6} key={index}>
                              <div className="option">
                                <Input
                                  className="check-options"
                                  id={`${item?.enumerationId}`}
                                  value={`${item?.enumerationName}`}
                                  type="checkbox"
                                />
                                <span className="enumtype">
                                  {`${item.enumerationTranslate}`}
                                </span>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <h3
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#2d4271",
                            }}
                          >
                            Ghi chú thêm
                          </h3>
                          <Input
                            style={{ height: "150px" }}
                            id="NoteByCustomer-Booking"
                            className="h-textbox mt-2"
                            type="textarea"
                            placeholder="Nhập ghi chú nếu có"
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              )}
              {multiStep === 3 && (
                <Col xl={8} lg={6}>
                  <div className="booking-tour__form">
                    <h1>Các hình thức thanh toán</h1>
                    <div>
                      <Paypalment />
                    </div>
                  </div>
                </Col>
              )}
              {multiStep === 2 && (
                <Col xl={8} lg={6}>
                  <div className="booking-tour__form">
                    <h1>Điều khoản bắt buộc khi đăng kí online</h1>
                    <div className="accept-booking">
                      <AcceptBooking />
                    </div>
                    <div className="check-accept-condition">
                      <Input
                        className="check-options"
                        id="input-accept-condition"
                        type="checkbox"
                      />
                      <span>Tôi đồng ý với các điều kiện trên</span>
                    </div>
                  </div>
                </Col>
              )}

              <Col xl={4} lg={6}>
                <div className="booking-tour__ticket">
                  <h1>Tóm tắt chuyến đi</h1>
                  <h4>
                    Tour đặt trước
                    <span>({`${Cli_TourDetails?.quanity}`} khách)</span>
                  </h4>
                  <div className="header-ticket">
                    <img src={`${Cli_TourDetails?.tourImg}`} alt="img"></img>
                    <div className="header-title">
                      {`${Cli_TourDetails?.tourName}`}
                    </div>
                  </div>
                  <div className="detail-trip-ticket">
                    <div className="detail-trip">
                      <div className="calendar-ticket">
                        <div className="calendar-ticket--tail"></div>
                        <i className="far fa-calendar-minus"></i>
                        <div className="info-trip">
                          <span>Bắt đầu chuyến đi</span>
                          <h4>{`${Cli_TourDetails?.dateStart}`}</h4>
                        </div>
                      </div>
                      <div className="calendar-ticket">
                        <div className="calendar-ticket--tail-last"></div>
                        <i className="far fa-calendar-minus"></i>
                        <div className="info-trip">
                          <span>Kết thúc chuyến đi</span>
                          <h4>{`${Cli_TourDetails?.dateEnd}`}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="detail-ticket">
                      <div className="detail-ticket__row">
                        <h4>Hành khách</h4>
                        <div className="user">
                          <FaUsers />
                          <span>{`${quanityAdult}`}</span>
                        </div>
                      </div>
                      <div className="detail-ticket__row">
                        <p>Người lớn</p>
                        <h4>
                          {`${quanityAdult}`} x{" "}
                          {formatCash(`${Cli_TourDetails?.adultUnitPrice}`) +
                            "đ"}
                        </h4>
                      </div>
                      <div className="detail-ticket__row">
                        <p>Trẻ em</p>
                        <h4>
                          {`${quanityChildren}`} x{" "}
                          {formatCash(`${Cli_TourDetails?.childrenUnitPrice}`) +
                            "đ"}
                        </h4>
                      </div>
                      <div className="detail-ticket__row">
                        <p>Trẻ nhỏ</p>
                        <h4>
                          {`${quanityBaby}`}{" "}
                          {formatCash(`${Cli_TourDetails?.babyUnitPrice}`) +
                            "đ"}
                        </h4>
                      </div>
                      <div className="detail-ticket__row">
                        <p>Em bé</p>
                        <h4>{`${quanityInfant}`} x0đ</h4>
                      </div>
                      <div className="detail-ticket__row">
                        <h2 style={{ fontWeight: "700", color: "#2d4271" }}>
                          Phụ thu phòng riêng
                        </h2>
                        <h4>
                          {formatCash(`${Cli_TourDetails?.surcharge}`) + "đ"}
                        </h4>
                      </div>
                    </div>
                    <div className="sum-money">
                      <div className="sum-money__row">
                        <h1>Tổng cộng</h1>
                        <h1 className="money">
                          {totalMoney === null
                            ? formatCash(`${Cli_TourDetails.adultUnitPrice}`) +
                              "đ"
                            : formatCash(`${totalMoney}`) + "đ"}
                        </h1>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleClickBookingTour();
                        }}
                        className="button-custom-money"
                      >
                        {multiStep === 1 && "ĐẶT NGAY"}
                        {multiStep === 2 && "TIẾP TỤC"}
                        {multiStep === 3 && "THANH TOÁN"}
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      )}
    </>
  );
}

export default BookingTour;
