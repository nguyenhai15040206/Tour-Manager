import { unwrapResult } from "@reduxjs/toolkit";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FastField, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin6Line, RiFileExcel2Fill } from "react-icons/ri";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { tableColumnsTour } from "../../../../utils/Columns";
import ConfirmControl from "../../components/Customs/ConfirmControl";
import TableGridControl from "../../components/Customs/TableGridControl";
import { Adm_GetProvince } from "../../Slices/SliceAddress";

import { Adm_GetTourList } from "../../Slices/SliceTour";
import { Adm_GetTouristAttByRegions } from "../../Slices/SliceTouristAttraction";

import TourAddEdit from "./TourAddEdit";

const initialValues = {
  TourID: "",
  TourName: "",
  DateStart: "",
  DateEnd: "",
  TravelTypeID: null,
};
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
function TourManager(props) {
  // state in components
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    TourImg: "",
    TourID: "",
    TourName: "",
    Description: "",
    DateStart: "",
    DateEnd: "",
    PhuongTienXuatPhat: "",

    Schedule: "",
    QuanityMax: 10,
    QuanityMin: "",
    CurrentQuanity: "",
    Regions: null,
    DeparturePlace: null,
    TouristAttaction: null,
  });
  //end
  //state in redux
  const { tourList } = useSelector((state) => state?.tour);
  const stateTourisAtt = useSelector((state) => state.touristAttraction);
  //end
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  //

  const onButtonClick = (e) => {
    e.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.tourId}`)
      .join(", ");
    if (selectedDataStringPresentation === "") {
      return NotificationManager.warning("Chọn dòng để xóa!", "", 1500);
    }
    setShowConfirm(true);
    const Ids = selectedDataStringPresentation.split(",").map(Number);

    // const ask = window.confirm("Bạn có chắc muốn xóa  dòng dữ liệu?");
    // if (ask) {
    //   alert("OK");
    // }
  };

  const onGridReady = async () => {
    try {
      await dispatch(Adm_GetTourList({}));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSearchTour = async (values) => {
    try {
      await dispatch(Adm_GetTourList(values));
    } catch (err) {
      console.log(err);
    }
  };

  // showModel Add Edit form
  const handleClickShowModal = async () => {
    try {
      await dispatch(Adm_GetProvince({}));
      setShowModal(true);
    } catch (err) {
      return NotificationManager.error(`${err}`, "Error", 1500);
    }
  };

  // closed toggle
  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };

  // handle click change regions => get tourRistAttr
  const handleChangeRegions = async (e) => {
    try {
      const params = {
        regions: e.value === null ? 0 : e.value,
      };
      await dispatch(Adm_GetTouristAttByRegions(params));
    } catch (err) {
      console.log(err);
    }
  };

  // handleClick Edit tour by Id => get tourDetails
  const handleEditTour = async (tourID) => {
    try {
      console.log(tourID);
      // call api => promise
      await dispatch(Adm_GetProvince({}));
      setInitialValues({
        TourID: 1,
        TourName: "Tour ABC",
      });
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };
  //-==========================
  return (
    <>
      <ConfirmControl showModal={showConfirm} toggle={toggle} />;
      <TourAddEdit
        className="modal-xl"
        backdrop={"static"}
        toggle={toggle}
        touristAttrByRegions={stateTourisAtt.touristAttrByRegions}
        onGetTOuristByRegions={handleChangeRegions}
        initialValues={initialValues}
        showModal={showModal}
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
                  {/* Begin sitemap */}
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="/admin">Home</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/admin">Library</a>
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
                        />
                        <label>Thu gọn vùng tìm kiếm</label>
                      </FormGroup>
                    </li>
                  </Breadcrumb>
                  {/* end sitemap */}
                </Col>
                <Col lg="12">
                  {/* Begin search */}
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleClickSearchTour}
                    >
                      {(formikProps) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-1 row">
                                    <label className="col-lg-3 h-label">
                                      Loại hình tour
                                    </label>
                                    <div
                                      className="col-lg-8"
                                      style={{ marginRight: "4px" }}
                                    >
                                      <FastField
                                        name="TravelTypeID"
                                        isLoading={true}
                                        placeholder="Vui lòng chọn"
                                        options={options}
                                        component={SelectField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Mã tour
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox h-search"
                                        name="TourID"
                                        type="number"
                                        component={InputField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Tên tour
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="TourName"
                                        component={InputField}
                                      />
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-1 row">
                                    <label className="col-lg-3 h-label">
                                      Điểm xuất phát
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        name="TravelTypeID"
                                        isLoading={true}
                                        placeholder="Vui lòng chọn"
                                        options={options}
                                        component={SelectField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Ngày bắt đầu
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="DateStart"
                                        component={InputField}
                                        type="date"
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Ngày kết thúc
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="DateEnd"
                                        component={InputField}
                                        type="date"
                                      />
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              {/* Start toolbar widget */}
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
                                      />{" "}
                                      Tìm kiếm
                                    </button>
                                    <div style={{ float: "right" }}>
                                      <button
                                        type="button"
                                        onClick={onButtonClick}
                                        className="h-button"
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
                              {/* End tool bar widget */}
                            </Form>
                          </>
                        );
                      }}
                    </Formik>
                  </div>
                  {/* End search */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TableGridControl
              tableHeight="450px"
              rowData={tourList}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableColumnsTour}
              fieldValues="tourId"
              onEditForm={handleEditTour}
            />
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

TourManager.propTypes = {};

export default TourManager;
