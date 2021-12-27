import React, { useState } from "react";
import Header from "../../../../../components/Header";
import Select from "react-select";
import "./styles.scss";
import TourItem from "../TourItem";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { Adm_GetTravelTypeCbo } from "../../../../Admins/Slices/SliceTravelType";
import { Adm_GetProvince } from "../../../../Admins/Slices/SliceAddress";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { FastField, Field, Form, Formik } from "formik";
import SelectField from "../../../../../CustomFields/SelectField/Index";
import InputField from "../../../../../CustomFields/InputField/Index";
import { FaSearch } from "react-icons/fa";
import { NotificationManager } from "react-notifications";
import { Cli_GetDataTourSearch } from "../../../../Admins/Slices/SliceTour";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "../../../../../components/Loading/Index";
import { formatCash } from "../../../../../utils/format";
const filterMoney = [
  { value: "giathapdencao", label: "Giá thấp > cao" },
  { value: "giacaodenthap", label: "Giá cao > thấp" },
  { value: "giamgia", label: "Giảm giá nhiều nhất" },
];

const initialValuesSearch = {
  TravelTypeID: "",
  DeparturePlaceFrom: "",
  DeparturePlaceTo: "",
  DateStart: "",
};

const changeDate = (number) => {
  if (Number.isInteger(number)) {
    if (number === 1) {
      return `${number}N`;
    }
    if (number > 1) {
      return `${number}N${number - 1}Đ`;
    }
  }
  return `${number}N`;
};

function TourSearch(props) {
  const dispatch = useDispatch();

  //==
  const [totalDate1, setTotalDay1] = useState(false);
  const [totalDate2, setTotalDay2] = useState(false);
  const [totalDate3, setTotalDay3] = useState(false);
  const [totalDate4, setTotalDay4] = useState(false);
  //==
  //==
  const [totalPeople1, setTotalPeople1] = useState(false);
  const [totalPeople2, setTotalPeople2] = useState(false);
  const [totalPeople3, setTotalPeople3] = useState(false);
  const [totalPeople4, setTotalPeople4] = useState(false);
  //==
  const [transportTypr1, setTransportType1] = useState(false);
  const [transportTypr2, setTransportType2] = useState(false);
  //==

  //==
  const [valuesSearch, setValuesSearch] = useState({});

  //==
  let { DeFrom, DeTo, DateStart, TotalDays } = useParams();
  const stateTravelType = useSelector((state) => state?.travelType);
  const stateAddress = useSelector((state) => state.address);
  const stateTour = useSelector((state) => state.tour);

  //===========
  useEffect(() => {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  }, [stateTour]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(Adm_GetProvince({}));
        await dispatch(Adm_GetTravelTypeCbo());
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [DeFrom, DeTo, DateStart, TotalDays]);

  useEffect(() => {
    const fetchApiTourSearch = () => {
      const params = {
        quantityDate1: totalDate1,
        quantityDate2: totalDate2,
        quantityDate3: totalDate3,
        quantityDate4: totalDate4,

        // number people
        quantityPeople1: totalPeople1,
        quantityPeople2: totalPeople2,
        quantityPeople3: totalPeople3,
        quantityPeople4: totalPeople4,

        // transport type
        transportType1: transportTypr1,
        transportType2: transportTypr2,
      };
      const ObjAsign = Object.assign(initialValuesSearch, params);
      setValuesSearch(ObjAsign);
      dispatch(
        Cli_GetDataTourSearch(Object.assign(ObjAsign, { page: 1, limit: 9 }))
      )
        .then(unwrapResult)
        .then(() => {})
        .catch((err) => {
          console.log(err.error);
        });
    };
    fetchApiTourSearch();
  }, [DeFrom, DeTo, DateStart, TotalDays]);

  //==
  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };
  const handleClichSearchTour = (values) => {
    //#region kiểm tra dữ liệu
    var checkDateIsNull = document.getElementById("DateStart").value;
    // param sap xem nhu torng hinh
    const params = {
      quantityDate1: totalDate1,
      quantityDate2: totalDate2,
      quantityDate3: totalDate3,
      quantityDate4: totalDate4,

      // number people
      quantityPeople1: totalPeople1,
      quantityPeople2: totalPeople2,
      quantityPeople3: totalPeople3,
      quantityPeople4: totalPeople4,

      // transport type
      transportType1: transportTypr1,
      transportType2: transportTypr2,
    };
    if (values.DeparturePlaceFrom !== "" && values.DeparturePlaceTo !== "") {
      if (values.DeparturePlaceFrom === values.DeparturePlaceTo) {
        return NotificationManager.warning(
          "[Điểm đến] trùng [Điểm x/phát]",
          "Warning!",
          1500
        );
      }
    }
    if (checkDateIsNull !== "") {
      const dateStart = new Date(document.getElementById("DateStart").value);
      const currentDate = new Date();
      if (!isValidDate(dateStart) || dateStart < currentDate) {
        return NotificationManager.warning(
          "Ngày đi không hợp lệ!",
          "warning!!!",
          2500
        );
      }
    }
    //#endregion

    console.log(values);
    const ObjAsign = Object.assign(values, params);
    console.log(ObjAsign);
    dispatch(
      Cli_GetDataTourSearch(Object.assign(ObjAsign, { page: 1, limit: 9 }))
    )
      .then(unwrapResult)
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        return NotificationManager.error(
          `${err.error}`,
          "Vui lòng kiểm tra lại!!!",
          2500
        );
      });
  };

  //===
  const handelClickTotalDay = (total) => {
    if (Number(total) === 1) {
      setTotalDay1(true);
      setTotalDay2(false);
      setTotalDay3(false);
      setTotalDay4(false);
    }
    if (Number(total) === 2) {
      setTotalDay1(false);
      setTotalDay2(true);
      setTotalDay3(false);
      setTotalDay4(false);
    }
    if (Number(total) === 3) {
      setTotalDay1(false);
      setTotalDay2(false);
      setTotalDay3(true);
      setTotalDay4(false);
    }
    if (Number(total) === 4) {
      setTotalDay1(false);
      setTotalDay2(false);
      setTotalDay3(false);
      setTotalDay4(true);
    }
  };
  //===
  const handelClickTotalPeople = (total) => {
    if (Number(total) === 1) {
      setTotalPeople1(true);
      setTotalPeople2(false);
      setTotalPeople3(false);
      setTotalPeople4(false);
    }
    if (Number(total) === 2) {
      setTotalPeople1(false);
      setTotalPeople2(true);
      setTotalPeople3(false);
      setTotalPeople4(false);
    }
    if (Number(total) === 3) {
      setTotalPeople1(false);
      setTotalPeople2(false);
      setTotalPeople3(true);
      setTotalPeople4(false);
    }
    if (Number(total) === 4) {
      setTotalPeople1(false);
      setTotalPeople2(false);
      setTotalPeople3(false);
      setTotalPeople4(true);
    }
  };
  const handelClickTransportType = (total) => {
    if (Number(total) === 1) {
      setTransportType1(true);
      setTransportType2(false);
    }
    if (Number(total) === 2) {
      setTransportType1(false);
      setTransportType2(true);
    }
  };

  //====
  const pangination = (totalRecord) => {
    var indents = [];
    for (let index = 0; index < totalRecord; index++) {
      indents.push(
        <li
          className={`page-item ${
            stateTour.Cli_PaginationSearch.currentPage === index + 1
              ? "active"
              : ""
          }`}
          key={index}
        >
          <button
            onClick={() => {
              handleClickGetDataPagination(index + 1, 9);
            }}
            className="page-link"
          >
            {index + 1}
          </button>
        </li>
      );
    }
    return indents;
  };

  const handleClickGetDataPagination = async (page, limit) => {
    try {
      await dispatch(
        Cli_GetDataTourSearch(
          Object.assign(valuesSearch, { page: page, limit: limit })
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  //===========
  return (
    <>
      {(stateAddress.loading === "loading" ||
        stateTravelType.loading === "loading" ||
        stateTour.loading === "loading") && <Loading loading={true} />}
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      <main className="tour-search">
        <div className="container container-padding">
          <Row>
            <Col xl={3} lg={4}>
              <div className="tour-search__sidebar-inner">
                <div className="tour-search__filter-text px-3 py-2">
                  <h3>Lọc kết quả</h3>
                </div>
                <div className="tour-search__kd-start-to-stop mb-3">
                  <Formik
                    initialValues={initialValuesSearch}
                    onSubmit={handleClichSearchTour}
                  >
                    {(formikProps) => {
                      return (
                        <Form>
                          <div
                            className="tour-search__all-option-filter px-3 py-2 "
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h2 style={{ margin: "auto 0" }}>Tất cả</h2>
                            <button type="submit" className="h-button">
                              <FaSearch color="rgb(180 173 30)" size={15} />
                              Lọc
                            </button>
                          </div>
                          <div className="px-3 py-4">
                            <h5 className="point-start-title s-title">
                              Loại hình tour
                            </h5>
                            <Field
                              className="h-textbox"
                              isLoading={
                                stateTravelType?.loading === "loaded"
                                  ? false
                                  : true
                              }
                              placeholder="Chọn loại hình du lịch"
                              name="TravelTypeID"
                              options={stateTravelType.dataCbo}
                              component={SelectField}
                            />
                            <div className="tour-search__kd-start-option-location mt-4">
                              <h5 className="point-start-title s-title">
                                Điểm đi
                              </h5>
                              <Field
                                className="h-textbox"
                                placeholder="Chọn điểm xuất phát"
                                name="DeparturePlaceFrom"
                                isLoading={
                                  stateAddress?.loading === "loaded"
                                    ? false
                                    : true
                                }
                                options={stateAddress.data}
                                component={SelectField}
                              />
                            </div>
                            <div className="tour-search__kd-stop-option-location mt-4">
                              <h5 className="point-stop-title s-title">
                                Điểm đến
                              </h5>
                              <Field
                                className="h-textbox"
                                placeholder="Chọn địa điểm đến"
                                name="DeparturePlaceTo"
                                isLoading={
                                  stateAddress?.loading === "loaded"
                                    ? false
                                    : true
                                }
                                options={stateAddress.data}
                                component={SelectField}
                              />
                            </div>
                            <div className="tour-search__kd-date-start-calendar mt-4">
                              <h5 className="point-title-date-start s-title">
                                Ngày đi
                              </h5>
                              <FastField
                                className="h-textbox"
                                name="DateStart"
                                type="date"
                                component={InputField}
                              />
                            </div>
                            <div className="tour-search__kd-number-date-tour mt-4">
                              <h5 className="point-number-title s-title">
                                Số ngày
                              </h5>
                              <div className="button-group__number-date">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handelClickTotalDay(1);
                                  }}
                                  id={totalDate1 ? "btn-active" : undefined}
                                  className="btn-option-date mb-3"
                                >
                                  1-3 ngày
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handelClickTotalDay(2);
                                  }}
                                  id={totalDate2 ? "btn-active" : undefined}
                                  className="btn-option-date mb-3"
                                >
                                  4-7 ngày
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handelClickTotalDay(3);
                                  }}
                                  id={totalDate3 ? "btn-active" : undefined}
                                  className="btn-option-date mb-3"
                                >
                                  8-14 ngày
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handelClickTotalDay(4);
                                  }}
                                  id={totalDate4 ? "btn-active" : undefined}
                                  className="btn-option-date mb-3"
                                >
                                  trên 14 ngày
                                </button>
                              </div>
                            </div>

                            <div className="tour-search__kd-number-customers mt-4">
                              <h5 className="point-title-customer-number s-title">
                                Số người
                              </h5>
                              <div className="button-group__number-customer">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handelClickTotalPeople(1);
                                  }}
                                  id={totalPeople1 ? "btn-active" : undefined}
                                  className="btn-option-number-customer mb-3"
                                >
                                  1 người
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handelClickTotalPeople(2);
                                  }}
                                  id={
                                    totalPeople2 === true
                                      ? "btn-active"
                                      : undefined
                                  }
                                  className="btn-option-number-customer mb-3"
                                >
                                  2 người
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handelClickTotalPeople(3);
                                  }}
                                  id={
                                    totalPeople3 === true
                                      ? "btn-active"
                                      : undefined
                                  }
                                  className="btn-option-number-customer mb-3"
                                >
                                  3-5 người
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handelClickTotalPeople(4);
                                  }}
                                  id={totalPeople4 === true ? "btn-active" : ""}
                                  className="btn-option-number-customer mb-3"
                                >
                                  5+ người
                                </button>
                              </div>
                            </div>
                            <div className="tour-search__kd-transport-tour mt-5">
                              <h5 className="point-title-transport-tour s-title">
                                Thông tin vận chuyển
                              </h5>
                              <div className="button-group__number-customer">
                                <button
                                  onClick={() => {
                                    handelClickTransportType(1);
                                  }}
                                  id={
                                    transportTypr1 === true ? "btn-active" : ""
                                  }
                                  className="btn-transport-tour"
                                  type="button"
                                >
                                  Máy bay
                                </button>
                                <button
                                  onClick={() => {
                                    handelClickTransportType(2);
                                  }}
                                  id={
                                    transportTypr2 == true ? "btn-active" : ""
                                  }
                                  className="btn-transport-tour"
                                  type="button"
                                >
                                  Ô tô
                                </button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </Col>
            <Col xl={9} lg={8}>
              <div className="tour-search__kd-title mb-5">
                <h3 className="kd-title">
                  Danh sách kết quả các tour du lịch được tìm kiếm
                </h3>
              </div>
              <hr />
              <div className="tour-search__kd-number-result-filter mb-5">
                <div className="tour-search__number-result">
                  <p className="title-result">
                    Chúng tôi tìm thấy{" "}
                    <span className="number-result">
                      {stateTour.Cli_PaginationSearch.count}
                    </span>{" "}
                    tour cho quý khách
                  </p>
                </div>
                <div className="tour-search__filter">
                  <p>Sắp xếp theo</p>
                  <Select
                    className="select-filter"
                    options={filterMoney}
                  ></Select>
                </div>
              </div>
              <hr />
              <Row className="row mb-5">
                {Array.from(stateTour.Cli_DataSearch).map((item, index) => (
                  <Col xl={4} lg={6} key={index}>
                    <TourItem
                      href={`/my-tour/tour-details/tourID=${item.tourId}`}
                      image={`${item.tourImg}`}
                      rating={item.rating}
                      promotion={item.promotion}
                      groupNumber={item.groupNumber}
                      traveltypeID={`${item.travelTypeId}`}
                      date={`${item.dateStartFormat}`}
                      numberDate={changeDate(Number(item.totalDays))}
                      time="4:30"
                      TravelTypeName={`${item.travelTypeName}`}
                      nameTour={`${item.tourName}`}
                      quanityCurrent={`${item.totalCurrentQuanity}`}
                      locationStart={`${item.departurePlaceFromName}`}
                      moneyTour={formatCash(`${item.adultUnitPrice}`)}
                    ></TourItem>
                  </Col>
                ))}
              </Row>
              <div className="tour-search__kd-pagination mb-5">
                <ul className="pagination">
                  <li className="page-item">
                    <button className="page-link">
                      <AiOutlineDoubleLeft />
                    </button>
                  </li>
                  {pangination(stateTour.Cli_PaginationSearch.totalPage)}
                  <li className="page-item">
                    <button className="page-link">
                      <AiOutlineDoubleRight />
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tour-search__kd-popular-tour-find mb-5">
                <h3 className="title-find-tour-popular">
                  Các tour đang tìm phổ biến
                </h3>
                <div className="group-popular-tour">
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    hạ long
                  </button>
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    phan thiết
                  </button>
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    du lịch đà nẵng
                  </button>
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    vàm sát
                  </button>
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    chuyến bay hồi hương
                  </button>
                </div>
              </div>
              <div className="tour-search__kd-location-Popularity mb-5">
                <h3 className="title-location-Popularity">
                  Các điểm đến ưa chuộng
                </h3>
                <div className="groups-Locations-Popularity">
                  <div className="group-name-img-Location-Popularity">
                    <img
                      className="img-location-popularity"
                      src="https://statics.vinpearl.com/dia-diem-du-lich-ha-long-6.jpg"
                      alt="not found"
                    ></img>
                    <h4 className="name-location-popularity">Hạ Long</h4>
                  </div>
                  <div className="group-name-img-Location-Popularity">
                    <img
                      className="img-location-popularity"
                      src="https://www.dalattrip.com/dulich/media/2017/12/thanh-pho-da-lat.jpg"
                      alt="not found"
                    ></img>
                    <h4 className="name-location-popularity">Đà Lạt</h4>
                  </div>
                  <div className="group-name-img-Location-Popularity">
                    <img
                      className="img-location-popularity"
                      src="https://cdnmedia.baotintuc.vn/Upload/3qVxwVtNEPp6Wp9kkF77g/files/2021/08/25/da-nang-250821.jpg"
                      alt="not found"
                    ></img>
                    <h4 className="name-location-popularity">Đà Nẵng</h4>
                  </div>
                  <div className="group-name-img-Location-Popularity">
                    <img
                      className="img-location-popularity"
                      src="https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng%206/Ng%C3%A0y_14/A09BE1E5-34C2-4286-8857-50921434EAF1.jpg"
                      alt="not found"
                    ></img>
                    <h4 className="name-location-popularity">Quy Nhơn</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}

TourSearch.propTypes = {};

export default TourSearch;
