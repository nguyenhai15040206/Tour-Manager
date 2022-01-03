import { unwrapResult } from "@reduxjs/toolkit";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FastField, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
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
import * as yup from "yup";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { tableColumnsTour } from "../../../../utils/Columns";
import ConfirmControl from "../../components/Customs/ConfirmControl";
import TableGridControl from "../../components/Customs/TableGridControl";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import {
  Adm_DeleteTourByIds,
  Adm_GetTourById,
  Adm_GetTourList,
} from "../../Slices/SliceTour";
import { Adm_DeleteTourDetailsByTourIds } from "../../Slices/SliceTourDetails";
import { Adm_GetTravelTypeCbo } from "../../Slices/SliceTravelType";
import { useHistory } from "react-router-dom";
import ExportDataToExcel from "../../components/Customs/ExportDataToExcel";

const initialValuesSearch = {
  TourName: "",
  DateStart: "",
  DateEnd: "",
  Suggest: false,
  TravelTypeID: null,
  DeparturePlace: [],
};

function TourManager(props) {
  document.title = "Quản lý tour du lịch";
  // state in components
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTourByIds, setSelectedTourByIds] = useState([]);
  const [paramsSearch, setParamsSearch] = useState(initialValuesSearch);
  const [dataExport, setDataExport] = useState([]);
  //end
  //state in redux
  const { tourList } = useSelector((state) => state?.tour);
  const stateAddress = useSelector((state) => state.address);
  const stateTravelType = useSelector((state) => state?.travelType);

  //end
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  //
  useEffect(() => {
    const fetchApiDepacturePlace = async () => {
      try {
        await dispatch(Adm_GetProvince());
        await dispatch(Adm_GetTravelTypeCbo());
        await dispatch(Adm_GetTourList(initialValuesSearch));
      } catch (err) {
        console.log(err);
      }
    };
    fetchApiDepacturePlace();
  }, [dispatch]);

  //#region click chọn dòng để xóa
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
    const Ids = selectedDataStringPresentation.split(",").map(String);
    setSelectedTourByIds(Ids);
    setShowConfirm(true);
  };

  //#endregion

  const onGridReady = async () => {
    try {
      await dispatch(
        Adm_GetTourList(Object.assign(paramsSearch, { tourIsExpired: false }))
      )
        .then(unwrapResult)
        .then((payload) => {
          const arrObjExport = [];
          payload.forEach((element) => {
            const Obj = {
              "Mã tour": element.tourId,
              "Tên tour": element.tourName,
              "Đánh giá sao": element.rating,
              "Mô tả tour": element.description,
              "Hình ảnh tour": element.tourImg,
              "Ngày bắt đầu": element.dateStart,
              "Ngày kết thúc": element.dateEnd,
              "Địa điểm đi": element.departurePlaceFrom,
              "Địa điểm đến": element.departurePlaceTo,
              "Số lượng nhóm": element.groupNumber,
              "Số lượng tối đa": element.quanityMax,
              "Số lượng tối thiểu": element.quanityMin,
              "Số lượng hiện tại": element.currentQuanity,
              "Đơn giá người lớn": element.adultUnitPrice,
              "Đơn giá trẻ em": element.childrenUnitPrice,
              "Đơn giá trẻ nhỏ": element.babyUnitPrice,
              "Phụ thu phòng đơn": element.surcharge,
              "Hướng dẫn viên": element.tourGuideName,
              "Loại hình tour": element.travelTypeName,
              "Được my tou đề xuất": element.suggest,

              //
            };
            arrObjExport.push(Obj);
          });
          setDataExport(arrObjExport);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // validation
  const validationShema = yup.object().shape({
    DateStart: yup.date().min(new Date(), "[Ngày bắt đầu] không hợp lệ!"),
    DateEnd: yup
      .date()
      .when(
        "DateStart",
        (eventDateStart, schema) =>
          eventDateStart &&
          schema.min(eventDateStart, "[Ngày kết thúc] không hợp lệ!")
      ),
  });
  // ======================== Xử lý sự kiện
  //search
  const handleClickSearchTour = async (values) => {
    try {
      setParamsSearch(values);
      console.log(values);
      await dispatch(
        Adm_GetTourList(Object.assign(values, { tourIsExpired: false }))
      );
    } catch (err) {
      console.log(err);
    }
  };
  // showModel Add Edit form
  const handleClickAddTour = () => {
    history.push("/admin/TourManager/Create");
  };

  // closed toggle
  const toggle = () => {
    setShowConfirm(false);
  };

  // handleClick Edit tour by Id => get tourDetails
  const handleEditTour = (tourId) => {
    const params = {
      tourId: tourId,
    };
    dispatch(Adm_GetTourById(params))
      .then(unwrapResult)
      .then(() => {
        const editTourUrl = `/admin/TourManager/Edit/tourID=${tourId}`;
        history.push(editTourUrl);
      })
      .catch((err) => {
        return NotificationManager.error(`${err}`, "Error!", 1500);
      });
  };

  // handel click Delete MultiRow
  const confirmDeleteMultiRow = () => {
    let DeleteModels = {
      SelectByIds: selectedTourByIds,
      EmpId: "29da46c9-df68-4eb3-9b6a-f80a77cf2a98",
    };
    dispatch(Adm_DeleteTourByIds(DeleteModels))
      .then(unwrapResult)
      .then(() => {
        dispatch(Adm_DeleteTourDetailsByTourIds(DeleteModels))
          .then(unwrapResult)
          .then(async () => {
            await onGridReady();
            setShowConfirm(false);
            return NotificationManager.success(
              `Xóa thành công!`,
              "Success!",
              1500
            );
          })
          .catch((err) => {
            if (err.status === 401) {
              localStorage.removeItem("accessTokenEmp");
              return history.push("/admin/login");
            }
            return NotificationManager.error(
              `${err.error}`,
              "Xóa thất bại!",
              1500
            );
          });
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(`${err.error}`, "Xóa thất bại!", 1500);
      });
  };

  //===
  const handleClickGetTourIsExpired = async () => {
    try {
      await dispatch(
        Adm_GetTourList(Object.assign(paramsSearch, { tourIsExpired: true }))
      );
    } catch (err) {
      console.log(err);
    }
  };
  //-==========================
  return (
    <>
      <ConfirmControl
        count={selectedTourByIds.length}
        ConfirmDelete={confirmDeleteMultiRow}
        showModal={showConfirm}
        toggle={toggle}
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
                      <a href="/admin">Trang chủ</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/admin">Danh mục travel</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Quản lý tour du lịch</BreadcrumbItem>
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
                      initialValues={initialValuesSearch}
                      onSubmit={handleClickSearchTour}
                      validationSchema={validationShema}
                    >
                      {(formikProps) => {
                        // console.log(formikProps.values);
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
                                      <Field
                                        name="TravelTypeID"
                                        isLoading={
                                          stateTravelType?.loading === "loading"
                                            ? true
                                            : false
                                        }
                                        placeholder="Vui lòng chọn"
                                        options={stateTravelType?.dataCbo}
                                        component={SelectField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Điểm x/phát
                                    </label>
                                    <div className="col-lg-8">
                                      <Field
                                        name="DeparturePlace"
                                        isMulti={true}
                                        isLoading={
                                          stateAddress?.loading === "loading"
                                            ? true
                                            : false
                                        }
                                        placeholder="Vui lòng chọn"
                                        options={stateAddress.data}
                                        component={SelectField}
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
                                  <FormGroup className="row mt-1">
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
                                  <FormGroup className="row mt-1">
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
                                        name="Suggest"
                                        component={InputField}
                                        type="checkbox"
                                      />
                                      <label className="h-label-checkbox">
                                        Mytour đề xuất
                                      </label>
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
                                      onClick={handleClickAddTour}
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
                                        onClick={() => {
                                          handleClickGetTourIsExpired();
                                        }}
                                        className="h-button"
                                      >
                                        <FaSearch
                                          color="rgb(180 173 30)"
                                          size={15}
                                        />{" "}
                                        Lọc tour sắp đến hạn
                                      </button>

                                      {/* <button
                                        type="button"
                                        className="h-button"
                                        style={{ marginLeft: "3px" }}
                                      >
                                        <RiFileExcel2Fill
                                          color="#2b6e44"
                                          size={15}
                                        />{" "}
                                        Xuất Excel
                                      </button> */}
                                      <ExportDataToExcel
                                        apiData={dataExport}
                                        fileName="DanhSachTourDulich"
                                      />
                                      <button
                                        type="button"
                                        onClick={onButtonClick}
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
      </Container>
    </>
  );
}

TourManager.propTypes = {};

export default TourManager;
