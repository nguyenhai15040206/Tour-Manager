import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import ImageDefault from "../../../assets/logo/imageDefault.png";
import Header from "../../../components/Header";
import { formatCash } from "../../../utils/format";
import {
  Cli_GetTourDetailsByTourID,
  GetTourTourIsSuggest,
} from "../../Admins/Slices/SliceTour";
import "./styles.scss";
import TourListSuggest from "./TourListSuggest";

const baseURL =
  process.env.REACT_APP_TOUR_MANAGER_API_KEY + "ImagesTouristAttractions/";
function TourDetails(props) {
  //state
  const [SheduleArray, setSheduleArray] = useState([]);
  const [tourImagesList, setTourImagesList] = useState([]);
  const [tourListSuggestByRegions, setTourListSuggestByRegions] = useState([]);
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
          setTourImagesList([]);
          console.log(payload.tourDetails);
          const arrTempImages = [];
          const arrTempImages2 = [];
          console.log(payload.tourDetails);
          for (let index = 0; index < payload.tourDetails.length; index++) {
            const element = payload.tourDetails[index]?.imagesList;
            if (element !== null) {
              const array = element.split("||").map((item) => baseURL + item);
              arrTempImages.push(array[0]);
              setTourImagesList((prev) => prev.concat(array[0]));
              for (let index = 1; index < array.length; index++) {
                arrTempImages2.push(array[index]);
              }
            }
          }
          console.log(arrTempImages2);
          if (arrTempImages.length < 4) {
            setTourImagesList((prev) => prev.concat(arrTempImages2.reverse()));
          }

          const params = {
            regions: payload.regions,
          };
          dispatch(GetTourTourIsSuggest(params))
            .then(unwrapResult)
            .then((TourList) => {
              setTourListSuggestByRegions(TourList);
            })
            .catch((err) => {
              console.log(err.error);
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
        return `${number} ng??y`;
      }
      if (number > 1) {
        return `${number} ng??y ${number - 1} ????m`;
      }
    }
    return `${number} ng??y`;
  };
  return (
    <>
      {console.log(Cli_TourDetails?.noteByTour)}
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
                    title="M?? tour"
                  >{`${Cli_TourDetails.tourId}`}</label>
                </div>
                <h1 className="tour-name">
                  {/* Phan Thi???t - L??u ????i R?????u Vang - B??u Tr???ng - B???o T??ng L??ng Ch??i
                X??a */}
                  {Cli_TourDetails.tourName}
                </h1>
                <div className="short-rating">
                  <div className="s-rate">
                    <span>9.22</span>
                    <div className="s-comments">
                      <h4>Tuy???t v???i</h4>
                      <p>358 nh???n x??t</p>
                    </div>
                  </div>
                  <div className="sale-price">
                    <p>
                      {Cli_TourDetails.travelTypeId ===
                      "8f64fb01-91fe-4850-a004-35cf26a1c1ef"
                        ? formatCash(
                            `${
                              Cli_TourDetails.adultUnitPrice *
                              Cli_TourDetails.groupNumber
                            }`
                          ) + "??"
                        : formatCash(`${Cli_TourDetails.adultUnitPrice}`) + "??"}
                      {Cli_TourDetails.travelTypeId ===
                      "8f64fb01-91fe-4850-a004-35cf26a1c1ef" ? (
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#003d71",
                          }}
                        >{`/gia ????nh ${Cli_TourDetails.groupNumber} kh??ch`}</span>
                      ) : (
                        <span></span>
                      )}
                    </p>
                    <div className="saving">
                      {Cli_TourDetails?.promotion === null ? (
                        ""
                      ) : (
                        <span>{`Gi???m ngay ${Cli_TourDetails?.promotion}%/kh??ch khi d???t tour`}</span>
                      )}
                    </div>
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
                    <label>?????t ngay</label>
                  </Link>
                </div>
              </div>
            </section>
            <section className="tour-details__banner">
              <div className="banner__image--slider">
                <div className="slider">
                  <img
                    src={
                      tourImagesList[0] === ""
                        ? `${ImageDefault}`
                        : tourImagesList[0]
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="banner__image--right">
                <div className="top">
                  <div className="top__left">
                    <img
                      src={
                        tourImagesList[1] === undefined
                          ? `${ImageDefault}`
                          : tourImagesList[1]
                      }
                      alt=""
                    />
                  </div>
                  <div className="top__right">
                    <img
                      src={
                        tourImagesList[2] === undefined
                          ? `${ImageDefault}`
                          : tourImagesList[2]
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="bottom">
                  <img
                    src={
                      tourImagesList[3] === undefined
                        ? `${ImageDefault}`
                        : tourImagesList[3]
                    }
                    alt=""
                  />
                </div>
              </div>
            </section>

            <section className="tour-details__group-box">
              <div className="box-order">
                <div className="time">
                  <p>
                    Kh???i h??nh:{" "}
                    <b>{`${Cli_TourDetails.dateStart}`.slice(0, 10)}</b>
                  </p>
                  <p>
                    Th???i gian: <b>{Cli_TourDetails.totalDay} ng??y</b>
                  </p>
                  <p>
                    N??i kh???i h??nh: <b>{Cli_TourDetails.provinceName}</b>
                  </p>
                  <p>
                    S??? ch??? c??n nh???n: <b>{Cli_TourDetails.quanity}</b>
                  </p>
                  <p>
                    HDV d???n ??o??n:{" "}
                    {Cli_TourDetails.touGuideName === null ? (
                      <b>??ang c???p nh???t</b>
                    ) : (
                      <b>{`${Cli_TourDetails.touGuideName}`}</b>
                    )}
                  </p>
                </div>
                <div className="calendar">
                  <div className="calendar__box">
                    <i className="far fa-calendar"></i>
                    <label>Ng??y kh??c</label>
                  </div>
                </div>
              </div>
              <div className="group-services">
                <div className="group-services__item">
                  <i className="far fa-calendar"></i>
                  <label>Th???i gian</label>
                  <p>{changeDate(Cli_TourDetails.totalDay)}</p>
                  {/* <p>3 ng??y 2 ????m</p> */}
                </div>
                <div className="group-services__item">
                  <i className="fas fa-users"></i>
                  <label>Quy m?? nh??m</label>
                  <p>{Cli_TourDetails.quanityMax} ng?????i</p>
                </div>
                <div className="group-services__item">
                  <i className="fas fa-hotel"></i>
                  <label>Kh??ch s???n</label>
                  <p>Ch??a c???p nh???t</p>
                </div>

                <div className="group-services__item">
                  <i className="fas fa-map-marked-alt"></i>
                  <label>?????a ??i???m tham quan</label>
                  {Cli_TourDetails.tourDetails &&
                    Cli_TourDetails.tourDetails.map((item, index) => (
                      <p key={index}>{item.touristAttrName}</p>
                    ))}
                </div>
                <div className="group-services__item">
                  <i className="fas fa-truck"></i>
                  <label>Ph????ng ti???n di chuy???n</label>
                  {Cli_TourDetails.transportStart === null &&
                  Cli_TourDetails.transportInTour === null ? (
                    <p>??ang c???p nh???t</p>
                  ) : (
                    <p>{`${Cli_TourDetails.transportStart}, ${Cli_TourDetails.transportInTour}`}</p>
                  )}
                </div>
                <div className="group-services__item">
                  <i className="fab fa-d-and-d"></i>
                  <label>D???ch v??? ??i k??m</label>
                  <p></p>
                </div>
              </div>
            </section>
            {/* <section className="scrolllClass row  mt-5">
              {tourImagesList.map((item, index) => (
                <Col xl={3} lg={4} xm={6} key={index}>
                  <img src={`${item}`} />
                </Col>
              ))}
            </section> */}
            <section className="tour-details__map-route">
              <h2 className="title">B???n ????? v?? l???ch tr??nh</h2>
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
                  {Cli_TourDetails?.conditionByTour && (
                    <li className="timeline__item" key={1}>
                      <div className="timeline__item--tail"></div>
                      <div className="timeline__item--noteByMyTour"></div>
                      <div className="timeline__item--content">
                        {/* <h5 className="title">{item.title.trim()}</h5> */}
                        <div
                          className="details"
                          dangerouslySetInnerHTML={{
                            __html: Cli_TourDetails?.conditionByTour,
                          }}
                        />
                      </div>
                    </li>
                  )}
                  {Cli_TourDetails?.noteByTour && (
                    <li className="timeline__item" key={1}>
                      <div className="timeline__item--tail"></div>
                      <div className="timeline__item--noteByMyTour"></div>
                      <div className="timeline__item--content">
                        {/* <h5 className="title">{item.title.trim()}</h5> */}
                        <div
                          className="details"
                          dangerouslySetInnerHTML={{
                            __html: Cli_TourDetails?.noteByTour,
                          }}
                        />
                      </div>
                    </li>
                  )}
                  {Cli_TourDetails?.noteByMyTour && (
                    <li className="timeline__item" key={1}>
                      <div className="timeline__item--tail"></div>
                      <div className="timeline__item--noteByMyTour"></div>
                      <div className="timeline__item--content">
                        {/* <h5 className="title">{item.title.trim()}</h5> */}
                        <div
                          className="details"
                          dangerouslySetInnerHTML={{
                            __html: Cli_TourDetails?.noteByMyTour,
                          }}
                        />
                      </div>
                    </li>
                  )}

                  <li className="timeline__item timeline__item--last">
                    <div className="timeline__item--tail"></div>
                    <div className="timeline__item--head timeline__item--head-blue"></div>
                    <div className="timeline__item--content"></div>
                  </li>
                </ul>
              </div>
            </section>
            <TourListSuggest TourListSuggets={tourListSuggestByRegions} />
          </div>
        </main>
      )}
    </>
  );
}

TourDetails.propTypes = {};

export default TourDetails;
