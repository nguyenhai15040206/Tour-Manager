import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem, Container, FormGroup } from "reactstrap";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { FastField, Form, Formik } from "formik";
import InputField from "./../../../../CustomFields/InputField/Index";
import TableGridControl from "./../../components/Customs/TableGridControl";
import { tableColumnTourGuide } from "../../../../utils/Columns";
import { useDispatch } from "react-redux";
import {
  Adm_CreateTourGuide,
  Adm_GetDataTourGuide,
} from "./../../Slices/SliceTourGuide";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import TourGuideAddEdit from "./TourGuideAddEdit";
import { Adm_GetProvince } from "./../../Slices/SliceAddress";
import { Adm_GetDistrictByProvinceCBB } from "../../Slices/SliceDistrict";
import { NotificationManager } from "react-notifications";
import { Adm_GetWardsByIdDistrictCbb } from "../../Slices/SliceWards";

const initialValuesTourGuide = {
  tourGuideName: "",
  phoneNumber: "",
  email: "",
  gender: "",
  provinceId: "",
  districtId: "",
  wardId: "",
  dateOfBirth: "",
  address: "",
};
function TourGuideManager(props) {
  const stateTourGuide = useSelector((state) => state?.tourGuide);

  ///
  const [initialValues, setInitialValues] = useState(initialValuesTourGuide);
  const [showModal, setShowModal] = useState(false);
  ///
  const gridRef = useRef(null);
  const dispatch = useDispatch();

  ///
  const handleClickShowModal = async () => {
    try {
      await dispatch(Adm_GetProvince());
    } catch (err) {}
    setInitialValues(initialValuesTourGuide);
    setShowModal(true);
  };
  ///
  const toggle = () => {
    setShowModal(false);
  };
  const onGridReady = async () => {
    try {
      await dispatch(Adm_GetDataTourGuide({}));
    } catch (error) {
      console.log(error);
    }
  };
  ///search
  const handelSubmitSearch = async (values) => {
    try {
      await dispatch(Adm_GetDataTourGuide(values));
    } catch (error) {
      console.log(error);
    }
  };

  //thực hiện thêm
  const handleClickSubmitForm = async (values) => {
    const TourGiudObj = {
      //tourGuidID: values.tourGuidID
      tourGuideName: values.tourGuideName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      gender: values.gender,
      address: `${values.address} , ${values.wardId} , ${values.districtId} , ${values.provinceId}`,
      dateOfBirth: values.dateOfBirth,
      empIDInsert: "ed763673-e493-4edd-bfda-dc910d16cba1",
      empIDUpdate: "ed763673-e493-4edd-bfda-dc910d16cba1",
    };
    try {
      await dispatch(Adm_CreateTourGuide(TourGiudObj));
      return NotificationManager.success("Thêm thành công!", "Success!", 1500);
    } catch (err) {
      return NotificationManager.error(`${err}`, "Error!", 1500);
    }
  };

  //
  const handelChangeProvice = async (e) => {
    // onChange thi chan chan kohng null roi em
    try {
      const params = {
        provinceID: e.value,
      };
      await dispatch(Adm_GetDistrictByProvinceCBB(params));
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeDistrict = async (e) => {
    try {
      const params = {
        districtID: e.value,
      };
      await dispatch(Adm_GetWardsByIdDistrictCbb(params));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TourGuideAddEdit
        toggle={toggle}
        showModal={showModal}
        className="modal-lg"
        initialValues={initialValues}
        onSubmitForm={(values) => {
          handleClickSubmitForm(values);
        }}
        onChangeProvince={handelChangeProvice}
        onChangeDistrict={handleChangeDistrict}
      />
      <Container
        fluid
        className="animate__animated animate_slideInUp animate__delay-0.5s "
      >
        <Row>
          <Col>
            <div className="admin-widget">
              <Row>
                <Col lg={12}>
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="admin/tourguide">Home</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="admin/tourguide">Library</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Data</BreadcrumbItem>
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
                        ></input>
                        <label>Thu gọn vùng tìm kiếm</label>
                      </FormGroup>
                    </li>
                  </Breadcrumb>
                </Col>
                <Col lg={12}>
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handelSubmitSearch}
                    >
                      {(formilk) => {
                        return (
                          <>
                            <Form className="mt-2">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Tên nhân viên
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="tourGuideName"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Số điện thoại
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="phoneNumber"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Email
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="email"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="commandToolBarWidge">
                                    <button
                                      type="button"
                                      onClick={handleClickShowModal}
                                      className="h-button"
                                    >
                                      <IoMdAddCircle
                                        color="#2b6e44"
                                        size={15}
                                      />{" "}
                                      Tạo mới
                                    </button>
                                    <button
                                      type="submit"
                                      className="h-button"
                                      style={{ marginLeft: "3px" }}
                                    >
                                      <FaSearch
                                        color="rgb(180 173 30)"
                                        size={15}
                                      />
                                      {""} Tìm kiếm
                                    </button>
                                    <div
                                      style={{
                                        float: "right",
                                        display: "flex",
                                      }}
                                    >
                                      <button
                                        type="button"
                                        className="h-button"
                                        //onClick={() => handleClickExportExcel()}
                                      >
                                        <RiFileExcel2Fill
                                          color="#2b6e44"
                                          size={15}
                                        />{" "}
                                        Xuất Excel
                                      </button>
                                      <button
                                        type="button"
                                        className="h-button"
                                        style={{ marginLeft: "3px" }}
                                      >
                                        <RiDeleteBin6Line size={15} /> Xóa
                                      </button>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </>
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
              rowData={stateTourGuide.dataTourGuide}
              onGridReady={onGridReady}
              gridRef={gridRef}
              //
              tableHeight="450px"
              tableColoumn={tableColumnTourGuide}
            ></TableGridControl>
          </Col>
        </Row>
      </Container>
    </>
  );
}

TourGuideManager.propTypes = {};

export default TourGuideManager;
