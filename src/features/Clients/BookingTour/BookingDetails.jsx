import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Header from "../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Adm_BookingTourDetails } from "../../Admins/Slices/SliceBookingTour";
import "./styles.scss";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "../../../components/Loading/Index";
import { formatCash } from "../../../utils/format";

function BookingDetails(props) {
  document.title = "Thông tin chi tiết";
  let { bookingID } = useParams();
  const dispatch = useDispatch();
  const stateBookingTour = useSelector((state) => state.bookingTour);

  //====
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [bookingID]);

  useEffect(() => {
    const fetchApi = () => {
      const params = {
        pID: bookingID,
      };
      dispatch(Adm_BookingTourDetails(params))
        .then(unwrapResult)
        .then((payload) => {})
        .catch((err) => {
          return NotificationManager.error(
            `${err.error}`,
            "Vui lòng kiểm ra lại!",
            2500
          );
        });
    };
    fetchApi();
  }, [bookingID]);
  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      {stateBookingTour.loading === "loading" && <Loading loading={true} />}
      <div className="container">
        <Row className="mt-5">
          <Col xl={8} lg={6}>
            <div className="booking-tour__form">
              <h1 style={{ color: "#fd5056" }}>THÔNG TIN LIÊN LẠC</h1>
              <hr />
              <Row className="booking-tour-details">
                <Col xl={3} lg={6}>
                  <span className="title">Họ tên</span>
                  <p className="info">
                    {stateBookingTour.dataDetails?.data?.customerName}
                  </p>
                </Col>
                <Col xl={4} lg={6}>
                  <span className="title">Email</span>
                  <p className="info">
                    {stateBookingTour.dataDetails?.data?.email}
                  </p>
                </Col>
                <Col xl={5} lg={6}>
                  <span className="title">Địa chỉ</span>
                  <p className="info">
                    {stateBookingTour.dataDetails?.address}
                  </p>
                </Col>
              </Row>
              <Row className="booking-tour-details">
                <Col xl={3} lg={6}>
                  <span className="title">Số điện thoại</span>
                  <p className="info">
                    {stateBookingTour.dataDetails?.data?.phoneNumber}
                  </p>
                </Col>
                <Col xl={9} lg={6}>
                  <span className="title">Số lượng khách</span>
                  <p className="info">
                    {`${stateBookingTour.dataDetails?.data?.quanityAdult}`}{" "}
                    Người lớn,
                    {`${stateBookingTour.dataDetails?.data?.quanityChildren}`}{" "}
                    Trẻ em,
                    {`${stateBookingTour.dataDetails?.data?.quanityBaby}`} Trẻ
                    nhỏ,{" "}
                    {`${stateBookingTour.dataDetails?.data?.quanityInfant}`} Em
                    bé
                  </p>
                </Col>
              </Row>
              <Row className="booking-tour-details">
                <Col xl={12}>
                  <span className="title">Các ghi chú</span>
                  <p className="info">
                    {`${stateBookingTour.dataDetails?.optionsNote}`}
                    {stateBookingTour?.dataDetails?.data?.note &&
                      `, ${stateBookingTour?.dataDetails?.data?.note}`}
                  </p>
                </Col>
                <Col xl={12}>
                  <span className="title">Ghi chú</span>
                  <p className="info">
                    Quý khách vui lòng kiểm tra email để nhận phiếu xác nhận
                    thành công từ Mytour
                  </p>
                </Col>
              </Row>
            </div>
            <div className="booking-tour__form mt-4">
              <h1 style={{ color: "#fd5056" }}>CHI TIẾT BOOKING</h1>
              <hr />
              <Row className="booking-tour-details">
                <Col className="info" xl={3}>
                  Mã booking
                </Col>
                <Col xl={9}>
                  <span
                    className="info"
                    style={{ color: "#fd5056" }}
                  >{`${stateBookingTour.dataDetails?.data?.bookingTourId}`}</span>{" "}
                  <span style={{ color: "#2d4271", fontSize: "13px" }}>
                    (Quý khách vui lòng nhớ số booking (Booking No) để thuận
                    tiện cho các giao dịch sau này)
                  </span>
                </Col>
              </Row>
              <Row className="booking-tour-details mt-4">
                <Col className="info" xl={3}>
                  Trị giá booking
                </Col>
                <Col className="info" style={{ fontWeight: "400" }} xl={3}>
                  {formatCash(
                    `${stateBookingTour.dataDetails?.data?.totalMoney}`
                  ) + "đ"}
                </Col>
              </Row>
              <Row className="booking-tour-details mt-4">
                <Col className="info" xl={3}>
                  Ngày đặt tour
                </Col>
                <Col className="info" style={{ fontWeight: "400" }} xl={9}>
                  {`${stateBookingTour.dataDetails?.data?.bookingDate}`}
                </Col>
              </Row>
              <Row className="booking-tour-details mt-4">
                <Col className="info" xl={3}>
                  Hình thức thanh toán
                </Col>
                <Col className="info" style={{ fontWeight: "400" }} xl={9}>
                  {stateBookingTour.dataDetails?.data?.typePayment === 1
                    ? "Thanh toán tiền mặt"
                    : "Chuyển khoản"}
                </Col>
              </Row>
              <Row className="booking-tour-details mt-4">
                <Col className="info" xl={3}>
                  Tình trạng
                </Col>
                <Col className="info" style={{ fontWeight: "400" }} xl={9}>
                  {`${
                    stateBookingTour.dataDetails?.data?.status === false
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"
                  }`}
                </Col>
              </Row>
              {stateBookingTour.dataDetails?.data?.status === false && (
                <Row className="booking-tour-details mt-4">
                  <Col className="info" xl={3}>
                    Thời hạn
                  </Col>
                  <Col className="info" style={{ fontWeight: "400" }} xl={9}>
                    <span
                      className="info"
                      style={{ color: "#fd5056" }}
                    >{`${stateBookingTour.dataDetails?.data?.duration}`}</span>
                    <span style={{ color: "#2d4271", fontSize: "13px" }}>
                      (Theo giờ Việt Nam) (Nếu quá thời hạn trên mà quý khách
                      chưa thanh toán. Vietravel sẽ hủy booking này)
                    </span>
                  </Col>
                </Row>
              )}
              {stateBookingTour.dataDetails?.data?.isDelete === false && (
                <Row className="booking-tour-details mt-4">
                  <Col className="info" style={{ fontWeight: "400" }}>
                    <p className="info" style={{ color: "red" }}>
                      Tour này đã được hủy do không thực hiện đúng quy định!!!
                    </p>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
          <Col xl={4} lg={6}>
            <div className="booking-tour__ticket">
              <h1 style={{ color: "#fd5056" }}>PHIẾU XÁC NHẬN BOOKING</h1>
              <hr />
              <div className="header-ticket">
                <img
                  style={{ borderRadius: "5px" }}
                  src={`${stateBookingTour.dataDetails?.data?.tourImg}`}
                  alt="img"
                ></img>
                <div className="header-title">
                  {`${stateBookingTour.dataDetails?.data?.tourName}`}
                </div>
              </div>

              <hr className="mt-4" />
              <Row className="mt-4 booking-details">
                <Col xl={12}>
                  <span className="title">Mã booking</span>
                  <p className="info">
                    <span
                      className="info"
                      style={{ color: "#fd5056" }}
                    >{`${stateBookingTour.dataDetails?.data?.bookingTourId}`}</span>{" "}
                  </p>
                </Col>
                <Col xl={12} className="mt-2">
                  <span className="title">Mã tour</span>
                  <p className="info">{`${stateBookingTour.dataDetails?.data?.tourId}`}</p>
                </Col>
                <Col xl={12} className="mt-2">
                  <span className="title">Hành trình</span>
                  <p className="info">
                    {stateBookingTour.dataDetails?.data?.journeys}
                  </p>
                </Col>
                <Col xl={12} className="mt-2">
                  <span className="title">Ngày đi</span>
                  <p className="info">
                    {stateBookingTour.dataDetails?.data?.dateStart}
                  </p>
                </Col>
                <Col xl={12} className="mt-2">
                  <span className="title">Ngày về</span>
                  <p className="info">
                    {stateBookingTour.dataDetails?.data?.dateEnd}
                  </p>
                </Col>
                <Col xl={12} className="mt-2">
                  <span className="title">Nơi khởi hành</span>
                  <p className="info">
                    {stateBookingTour.dataDetails?.data?.departurePlaceFrom}
                  </p>
                </Col>
                <Col
                  xl={12}
                  className="mt-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "120px", height: "120px" }}
                    src={`${stateBookingTour.dataDetails?.data?.qrCode}`}
                  />
                </Col>
                <p className="info mt-3">
                  Để xem thông tin chương trình tour mới nhất Quý khách có thể
                  dùng điện thoại để quét mã QR bên cạnh để truy cập vào
                  website.
                </p>
                <p className="info mt-3">
                  Để cài phần mềm quét mã QR Code quý khách có thể tìm trong kho
                  ứng dụng của điện thoại với từ khóa sau: QRCode Scanner,
                  QRCode Reader,..
                </p>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

BookingDetails.propTypes = {};

export default BookingDetails;
