import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { FastField, Field, Form, Formik } from "formik";
import SelectField from "../../../../CustomFields/SelectField/Index";
import TableGridControl from "../../components/Customs/TableGridControl";
import { tableColumnBooking } from "../../../../utils/Columns";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Adm_AcceptBooking,
  Adm_BookingTourDetails,
  Adm_ExportDataBookingTour,
  Adm_GetDataBooking,
  Adm_SendEmailAfterBooking,
} from "../../Slices/SliceBookingTour";
import { MdPictureAsPdf } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { GrMail } from "react-icons/gr";
import InputField from "../../../../CustomFields/InputField/Index";
import { useEffect } from "react";
import { Adm_GetTourList } from "../../Slices/SliceTour";
import BookingDetails from "./BookingDetails";
import { NotificationManager } from "react-notifications";
import { unwrapResult } from "@reduxjs/toolkit";
import { BsFillFileEarmarkWordFill } from "react-icons/bs";

const initialValuesSearch = {
  TourID: "",
  BookingDate: "",
  Status: false,
};
function BookingManager(props) {
  document.title = "Quản lý booking";
  //==
  const stateBookingTour = useSelector((state) => state?.bookingTour);
  const stateTour = useSelector((state) => state.tour);
  const [initialValues, setInitialValues] = useState(initialValuesSearch);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  //==
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(
          Adm_GetTourList({
            TourName: "",
            DateStart: "",
            DateEnd: "",
            Suggest: false,
            TravelTypeID: null,
            DeparturePlace: [],
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [dispatch]);
  //
  const onGridReady = async () => {
    try {
      await dispatch(Adm_GetDataBooking(initialValues));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSearch = async (values) => {
    try {
      console.log(values);
      setShowButton(values.Status);
      setInitialValues(values);
      await dispatch(Adm_GetDataBooking(values));
    } catch (err) {
      console.log(err);
    }
  };

  //== send mail
  const handleClickSendEmail = async () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.bookingTourId}`)
      .join(",");
    const Ids = selectedDataStringPresentation.split(",").map(String);
    // nếu là chưa chọn => vui lòng chọn dòng cần xóa
    if (Ids[0] === "") {
      return NotificationManager.warning(
        "Chọn tối thiểu một booking để gửi mail!",
        "Warning!",
        1500
      );
    }
    for (let index = 0; index < Ids.length; index++) {
      const params = {
        pID: Ids[index],
        type: 1,
      };
      dispatch(Adm_SendEmailAfterBooking(params))
        .then(unwrapResult)
        .then((payload) => {
          console.log(payload);
          if (Number(payload) === 204) {
            return NotificationManager.warning(
              `Booking chưa được thanh toán!`,
              "Warning!!!",
              1500
            );
          }
          NotificationManager.success(
            `Gửi mail thành thông!`,
            "Success!!!",
            1500
          );
        })
        .catch((err) => {
          if (err.status === 401) {
            if (err.status === 401) {
              localStorage.removeItem("accessTokenEmp");
              return history.push("/admin/login");
            }
            return NotificationManager.error(`${err.error}`, "Error!", 1500);
          }
        });
    }
  };

  //==
  const handleClickAcceptBooking = async () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.bookingTourId}`)
      .join(",");
    const Ids = selectedDataStringPresentation.split(",").map(String);
    // nếu là chưa chọn => vui lòng chọn dòng cần xóa
    if (Ids[0] === "" || Ids.length > 1) {
      return NotificationManager.warning(
        "Chọn một booking để xác nhận thanh toán!",
        "Warning!",
        1500
      );
    }

    let Accept = {
      SelectByIds: Ids,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_AcceptBooking(Accept))
      .then(unwrapResult)
      .then(async (payload) => {
        if (Number(payload) === 204) {
          return NotificationManager.warning(
            `Booking này đã thanh toán!`,
            "Warning!!!",
            1500
          );
        }
        const ask = window.confirm("Bạn có muốn gửi mail cho booking này?");
        if (ask) {
          try {
            const params = {
              pID: Ids[0],
              type: 1,
            };
            await dispatch(Adm_SendEmailAfterBooking(params));
            onGridReady();
            return NotificationManager.success(
              `Thao tác thành thông!`,
              "Success!!!",
              1500
            );
          } catch (err) {
            if (err.status === 401) {
              if (err.status === 401) {
                localStorage.removeItem("accessTokenEmp");
                return history.push("/admin/login");
              }
              return NotificationManager.error(`${err.error}`, "Error!", 1500);
            }
          }
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          if (err.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            return history.push("/admin/login");
          }
          return NotificationManager.error(`${err.error}`, "Error!", 1500);
        }
      });
  };

  const handleClickSubmitAcceptBooking = async () => {
    let Accept = {
      SelectByIds: [stateBookingTour.dataDetails?.data?.bookingTourId],
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_AcceptBooking(Accept))
      .then(unwrapResult)
      .then(async (payload) => {
        if (Number(payload) === 204) {
          return NotificationManager.warning(
            `Booking này đã thanh toán!`,
            "Warning!!!",
            1500
          );
        }
        const ask = window.confirm("Bạn có muốn gửi mail cho booking này?");
        if (ask) {
          try {
            const params = {
              pID: stateBookingTour.dataDetails?.data?.bookingTourId,
              type: 1,
            };
            await dispatch(Adm_SendEmailAfterBooking(params));
            onGridReady();
            return NotificationManager.success(
              `Thao tác thành thông!`,
              "Success!!!",
              1500
            );
          } catch (err) {
            if (err.status === 401) {
              if (err.status === 401) {
                localStorage.removeItem("accessTokenEmp");
                return history.push("/admin/login");
              }
              return NotificationManager.error(`${err.error}`, "Error!", 1500);
            }
          }
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          if (err.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            return history.push("/admin/login");
          }
          return NotificationManager.error(`${err.error}`, "Error!", 1500);
        }
      });
  };

  //==
  const toggle = () => {
    setShowModal(false);
  };

  const handleEditFromFrid = (pID) => {
    dispatch(Adm_BookingTourDetails({ pID: pID }))
      .then(unwrapResult)
      .then(() => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //============ Export
  const handleClickExportDataBooking = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.bookingTourId}`)
      .join(",");
    const Ids = selectedDataStringPresentation.split(",").map(String);
    // nếu là chưa chọn => vui lòng chọn dòng cần xóa
    if (Ids[0] === "") {
      return NotificationManager.warning(
        "Vui lòng chọn dữ liệu !!!",
        "Warning!",
        1500
      );
    }
    for (let index = 0; index < Ids.length; index++) {
      const params = {
        type: 2,
        pID: Ids[index],
      };
      dispatch(Adm_ExportDataBookingTour(params))
        .then(unwrapResult)
        .then(() => {
          return NotificationManager.success(
            `Thao tác thành thông!`,
            "Success!!!",
            1500
          );
        })
        .catch((err) => {
          return NotificationManager.error(`${err.message}`, "Error!!!", 1500);
        });
    }
  };

  //============
  return (
    <>
      <BookingDetails
        isOpen={showModal}
        toggle={toggle}
        onClickAcceptBooking={handleClickSubmitAcceptBooking}
      />
      <Container
        fluid
        className="animate__animated animate__slideInUp animate__delay-0.5s"
      >
        <Row>
          <Col>
            <div className="admin-widget">
              <Row>
                <Col lg={12}>
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="/admin">Trang chủ</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/admin">Danh mục travel</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Khuyến mãi</BreadcrumbItem>
                    <li className="breadcrumb-item">
                      <FormGroup
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          style={{ cursor: "pointer" }}
                          className="pt-2"
                          data-bs-toggle="collapse"
                          data-bs-target="#showSearch"
                        />
                        <label>Thu gọn vùng tìm kiếm</label>
                      </FormGroup>
                    </li>
                  </Breadcrumb>
                </Col>
                <Col lg={12}>
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValuesSearch}
                      onSubmit={handleClickSearch}
                    >
                      {(formikProps) => {
                        return (
                          <Form className="mt-1">
                            <Row className="pb-2">
                              <Col xl={6} lg={6}>
                                <FormGroup className="mt-1 row">
                                  <label className="col-lg-3 h-label">
                                    Tour du lịch
                                  </label>
                                  <div
                                    className="col-lg-8"
                                    style={{ marginRight: "4px" }}
                                  >
                                    <Field
                                      name="TourID"
                                      isLoading={
                                        stateTour?.loading === "loading"
                                          ? true
                                          : false
                                      }
                                      placeholder="Vui lòng chọn"
                                      options={stateTour?.tourList?.map(
                                        (item) => {
                                          return {
                                            value: item.tourId,
                                            label: item.tourId,
                                          };
                                        }
                                      )}
                                      component={SelectField}
                                    />
                                  </div>
                                </FormGroup>
                                <FormGroup className="row mt-1">
                                  <label className="col-lg-3 h-label">
                                    Ngày booking
                                  </label>
                                  <div className="col-lg-8">
                                    <FastField
                                      className="h-textbox"
                                      name="BookingDate"
                                      component={InputField}
                                      type="date"
                                    />
                                  </div>
                                </FormGroup>
                                <FormGroup className="mt-1 row">
                                  <label className="col-lg-3 h-label"></label>
                                  <div
                                    className="col-lg-8"
                                    style={{
                                      display: "flex",
                                      WebkitJustifyContent: "flex-start",
                                    }}
                                  >
                                    <FastField
                                      className="h-checkbox"
                                      name="Status"
                                      component={InputField}
                                      type="checkbox"
                                    />
                                    <label className="h-label-checkbox">
                                      Đã thanh toán
                                    </label>
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="commandToolBarWidge">
                                  <button type="submit" className="h-button">
                                    <FaSearch
                                      color="rgb(180 173 30)"
                                      size={15}
                                    />{" "}
                                    Tìm kiếm
                                  </button>
                                  <button
                                    type="button"
                                    style={{ marginLeft: "3px" }}
                                    onClick={handleClickAcceptBooking}
                                    className="h-button"
                                  >
                                    <GiConfirmed color="#2b6e44" size={15} />{" "}
                                    Xác nhận thanh toán
                                  </button>

                                  <div style={{ float: "right" }}>
                                    <button
                                      disabled={!showButton}
                                      type="button"
                                      style={{ marginLeft: "3px" }}
                                      onClick={handleClickSendEmail}
                                      className="h-button"
                                    >
                                      <GrMail color="#7a8023" size={17} /> Gửi
                                      mail
                                    </button>
                                    <button
                                      disabled={!showButton}
                                      type="button"
                                      onClick={() => {
                                        handleClickExportDataBooking();
                                      }}
                                      className="h-button"
                                      style={{ marginLeft: "3px" }}
                                    >
                                      <MdPictureAsPdf
                                        size={15}
                                        color="#FF8C00"
                                      />{" "}
                                      Xuất PDF
                                    </button>
                                    <button
                                      type="button"
                                      disabled={!showButton}
                                      //onClick={onButtonClick}
                                      className="h-button"
                                      style={{ marginLeft: "3px" }}
                                    >
                                      <BsFillFileEarmarkWordFill
                                        color="rgb(16 136 238)"
                                        size={15}
                                      />{" "}
                                      Kết xuất
                                    </button>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TableGridControl
              tableHeight="450px"
              rowData={stateBookingTour.dataBooking}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableColumnBooking}
              fieldValues="bookingTourId"
              onEditForm={handleEditFromFrid}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

BookingManager.propTypes = {};

export default BookingManager;
