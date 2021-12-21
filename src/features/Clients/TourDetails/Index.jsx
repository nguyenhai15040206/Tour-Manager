import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { formatCash } from "../../../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { Cli_GetTourDetailsByTourID } from "../../Admins/Slices/SliceTour";
import "./styles.scss";
import { Spinner } from "reactstrap";
import { unwrapResult } from "@reduxjs/toolkit";

function TourDetails(props) {
  //state
  const [SheduleArray, setSheduleArray] = useState([]);
  const { Cli_TourDetails, loading } = useSelector((state) => state?.tour);
  // end state
  //
  const dispatch = useDispatch();
  let { tourID } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  }, [tourID]);
  useEffect(() => {
    const fetchDataTourDetails = () => {
      const params = {
        tourID: tourID,
      };
      dispatch(Cli_GetTourDetailsByTourID(params))
        .then(unwrapResult)
        .then((payload) => {
          const re = "^||||^";
          let arrayObj = String(payload.schedule).split(re);
          arrayObj.pop();
          setSheduleArray([]);
          Array.from(arrayObj).map((item) => {
            const arrayObjDay = item.split("^||^");
            return setSheduleArray((prev) => [
              ...prev,
              { title: arrayObjDay[0], shedule: arrayObjDay[1] },
            ]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchDataTourDetails();
  }, [dispatch, tourID]);

  const changeDate = (number) => {
    if (Number.isInteger(number)) {
      if (number === 1) {
        return `${number} ngày`;
      }
      if (number > 1) {
        return `${number} ngày ${number - 1} đêm`;
      }
    }
    return `${number} ngày`;
  };
  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      {/* <Banner backgroundImage="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/01/anh1-17.png" /> */}
      {loading === "loading" && (
        <div className="cr-page-spinner">
          <Spinner color="primary" />
        </div>
      )}
      {loading === "loaded" && (
        <main className="tour-details">
          <div className="container">
            <section className="tour-details__header">
              <div className="tour-details__header--left">
                <div className="tour-id">
                  <i className="fab fa-staylinked"></i>
                  <label
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Mã tour"
                  >{`${Cli_TourDetails.tourId}`}</label>
                </div>
                <h1 className="tour-name">
                  {/* Phan Thiết - Lâu Đài Rượu Vang - Bàu Trắng - Bảo Tàng Làng Chài
                Xưa */}
                  {Cli_TourDetails.tourName}
                </h1>
                <div className="short-rating">
                  <div className="s-rate">
                    <span>9.22</span>
                    <div className="s-comments">
                      <h4>Tuyệt với</h4>
                      <p>358 nhận xét</p>
                    </div>
                  </div>
                  <div className="sale-price">
                    <p>
                      {formatCash(`${Cli_TourDetails.adultUnitPrice}`) + "đ"}
                    </p>
                    <div className="saving"></div>
                  </div>
                </div>
              </div>
              <div className="tour-details__header--right">
                <div className="add-cart">
                  <Link
                    to={`/my-tour/booking-tour/tourID=${tourID}`}
                    className="add-to-cart"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <label>Đặt ngay</label>
                  </Link>
                </div>
              </div>
            </section>
            <section className="tour-details__banner">
              <div className="banner__image--slider">
                <div className="slider">
                  <img
                    src="https://media.travel.com.vn/tour/tfd_210322111746_294581.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="banner__image--right">
                <div className="top">
                  <div className="top__left">
                    <img
                      src="https://media.travel.com.vn/tour/tfd_210322112302_685803.jpg"
                      alt=""
                    />
                  </div>
                  <div className="top__right">
                    <img
                      src="https://media.travel.com.vn/tour/tfd_210927032143_292540.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="bottom">
                  <img
                    src="https://media.travel.com.vn/destination/dc_200914_SAPA%20(10).jpg"
                    alt=""
                  />
                </div>
              </div>
            </section>
            <section className="tour-details__group-box">
              <div className="box-order">
                <div className="time">
                  <p>
                    Khời hành:{" "}
                    <b>{`${Cli_TourDetails.dateStart}`.slice(0, 10)}</b>
                  </p>
                  <p>
                    Thời gian: <b>{Cli_TourDetails.totalDay} ngày</b>
                  </p>
                  <p>
                    Nơi khởi hành: <b>{Cli_TourDetails.provinceName}</b>
                  </p>
                  <p>
                    Số chỗ còn nhận: <b>{Cli_TourDetails.quanity}</b>
                  </p>
                  <p>
                    HDV dẫn đoàn:{" "}
                    {Cli_TourDetails.touGuideName === null ? (
                      <b>Đang cập nhật</b>
                    ) : (
                      <b>{`${Cli_TourDetails.touGuideName}`}</b>
                    )}
                  </p>
                </div>
                <div className="calendar">
                  <div className="calendar__box">
                    <i className="far fa-calendar"></i>
                    <label>Ngày khác</label>
                  </div>
                </div>
              </div>
              <div className="group-services">
                <div className="group-services__item">
                  <i className="far fa-calendar"></i>
                  <label>Thời gian</label>
                  <p>{changeDate(Cli_TourDetails.totalDay)}</p>
                  {/* <p>3 ngày 2 đêm</p> */}
                </div>
                <div className="group-services__item">
                  <i className="fas fa-users"></i>
                  <label>Quy mô nhóm</label>
                  <p>{Cli_TourDetails.quanityMax} người</p>
                </div>
                <div className="group-services__item">
                  <i className="fas fa-hotel"></i>
                  <label>Khách sạn</label>
                  <p>Chưa cập nhật</p>
                </div>

                <div className="group-services__item">
                  <i className="fas fa-map-marked-alt"></i>
                  <label>Địa điểm tham quan</label>
                  {Cli_TourDetails.tourDetails &&
                    Cli_TourDetails.tourDetails.map((item, index) => (
                      <p key={index}>{item.touristAttrName}</p>
                    ))}
                </div>
                <div className="group-services__item">
                  <i className="fas fa-truck"></i>
                  <label>Phương tiện di chuyển</label>
                  <p>{`${Cli_TourDetails.transport}`}</p>
                </div>
                <div className="group-services__item">
                  <i className="fab fa-d-and-d"></i>
                  <label>Dịch vụ đi kèm</label>
                  <p></p>
                </div>
              </div>
            </section>
            <section className="tour-details__map-route">
              <h2 className="title">Bản đồ và lịch trình</h2>
              <div className="content">
                <ul className="timeline">
                  {Array.from(SheduleArray).map((item, index) => (
                    <li className="timeline__item" key={index}>
                      <div className="timeline__item--tail"></div>
                      <div className="timeline__item--head timeline__item--head-blue"></div>
                      <div className="timeline__item--content">
                        <h5 className="title">{item.title.trim()}</h5>
                        <div
                          className="details"
                          dangerouslySetInnerHTML={{
                            __html: item.shedule,
                          }}
                        />
                      </div>
                    </li>
                  ))}

                  <li className="timeline__item timeline__item--last">
                    <div className="timeline__item--tail"></div>
                    <div className="timeline__item--head timeline__item--head-blue"></div>
                    <div className="timeline__item--content"></div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}

TourDetails.propTypes = {};

export default TourDetails;
