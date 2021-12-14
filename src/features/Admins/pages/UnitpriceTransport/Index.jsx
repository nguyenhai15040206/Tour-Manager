import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { Field, Form, Formik } from "formik";
import { RiDeleteBin6Line, RiFileExcel2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import TableGridControl from "../../components/Customs/TableGridControl";
import { tableColumnUnitPriceTransport } from "../../../../utils/Columns";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UnitPriceAddEdit from "./UnitPriceAddEdit";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import { unwrapResult } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import {
  Adm_GetDataUnitPrice,
  Adm_InsertUnitPrice,
  Adm_UnitPriceTransportDetails,
  Adm_UpdateUnitPrice,
  Adm__DeleteUnitPriceByTourIds,
} from "../../Slices/SliceUnitPriceTransport";
import { Adm_GetCompanyByTravelTypeCbo } from "../../Slices/SliceTravelConpanyTransport";
import { Adm_GetEnumConstantCbo } from "../../Slices/SliceEnumConstant";
import ConfirmControl from "../../components/Customs/ConfirmControl";

const initialValuesSearh = {
  CompanyID: "",
  TravelTypeID: "",
  ProvinceFrom: "",
  ProvinceTo: "",
};

const initialValuesInsert = {
  UnitPriceID: "",
  TimeStart: "",
  TimeEnd: "",
  CompanyID: "",
  TravelTypeID: "",
  ProvinceFrom: "",
  ProvinceTo: "",
  BabyUnitPrice: "", // đơn giá trẻ em
  AdultUnitPrice: "", // đơn giá người lớn
  ChildrenUnitPrice: "", // đơn giá trẻ nhỏ
};

function UnitpriceTransport(props) {
  document.title = "Thông tin giá cả";
  //===============
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  // state in componnet
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const stateTravelCompany = useSelector(
    (state) => state.travelConpanyTransport
  );
  const stateUnitPrice = useSelector((state) => state.unitPriceTransport);
  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateAddress = useSelector((state) => state.address);
  //======================
  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(Adm_GetProvince({}));
        const params = {
          enumTypeName: "TransportType",
        };
        await dispatch(Adm_GetEnumConstantCbo(params));
      } catch (err) {}
    };
    fetchApi();
  }, [dispatch]);

  //=============
  // load grid
  const onGridReady = async () => {
    try {
      const pSearch = {
        CompanyID: document.querySelector('[name="CompanyID"]').value,
        TravelTypeID: document.querySelector('[name="TravelTypeID"]').value,
        ProvinceFrom: document.querySelector('[name="ProvinceFrom"]').value,
        ProvinceTo: document.querySelector('[name="ProvinceTo"]').value,
      };
      await dispatch(Adm_GetDataUnitPrice(pSearch));
    } catch (err) {
      if (err.status === 500) {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      }
      console.log(err.message);
    }
  };

  //===================
  const handleClickShowModal = async () => {
    dispatch(Adm_GetProvince({}))
      .then(unwrapResult)
      .then(async () => {
        const params = {
          enumTypeName: "TransportType",
        };
        dispatch(Adm_GetEnumConstantCbo(params))
          .then(unwrapResult)
          .then(() => {
            setInitialValues(initialValuesInsert);
            setDisabled(false);
            setShowModal(true);
          })
          .catch((err) => {
            return NotificationManager.error(
              `${err.error}`,
              "Vui lòng kiểm tra lại!!!",
              1500
            );
          });
      })
      .catch((err) => {
        return NotificationManager.error(
          `${err.error}`,
          "Vui lòng kiểm tra lại!!!",
          1500
        );
      });
  };
  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };

  //================
  // search
  const handleClickSearch = async (values) => {
    try {
      if (values.TravelTypeID === "") {
        return NotificationManager.warning(
          "Vui lòng chọn loại vận chuyển",
          "warning"
        );
      }
      if (values.CompanyID === "") {
        return NotificationManager.warning(
          "Vui lòng chọn hãng vận chuyển",
          "warning"
        );
      }
      if (values.ProvinceFrom === "" && values.ProvinceTo === "") {
        return await dispatch(Adm_GetDataUnitPrice(values));
      } else {
        if (values.ProvinceFrom === "" || values.ProvinceTo === "") {
          return NotificationManager.warning(
            `Chọn đủ Điểm đi - Điểm đến!!!`,
            "warning!",
            1500
          );
        }
        if (values.ProvinceFrom === values.ProvinceTo) {
          return NotificationManager.warning(
            `Điểm đi trùng với Điểm đến!!!`,
            "warning!",
            1500
          );
        }
        return await dispatch(Adm_GetDataUnitPrice(values));
      }
    } catch (err) {
      return NotificationManager.error(`${err.message}`, "Error!", 1500);
    }
  };

  // handle change travel type => load company travel by traveltype
  const handleClickChangeTravelType = async (e) => {
    try {
      if (e === null) {
        const params = {
          enumType: ":(",
        };
        await dispatch(Adm_GetCompanyByTravelTypeCbo(params));
      }
      const params = {
        enumType: e.value,
      };
      await dispatch(Adm_GetCompanyByTravelTypeCbo(params));
    } catch (err) {
      // return NotificationManager.error(
      //   `${err.error}`,
      //   "Vui lòng kiểm tra lại!!!",
      //   1500
      // );
    }
  };

  //==================
  const onInsertUnitPrice = (unitPrice) => {
    dispatch(Adm_InsertUnitPrice(unitPrice))
      .then(unwrapResult)
      .then(async () => {
        await onGridReady();
        return NotificationManager.success(
          "Tạo đơn giá thành công!",
          "Success!",
          1500
        );
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        if (err.status === 409) {
          return NotificationManager.warning(
            `${err.message}`,
            "Vui lòng kiểm Giờ và Địa điểm!",
            1500
          );
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };

  const onUpdateUnitPrice = (unitPrice, values) => {
    console.log(values);
    dispatch(
      Adm_UpdateUnitPrice({ ...unitPrice, upTransportId: values.UnitPriceID })
    )
      .then(unwrapResult)
      .then(async () => {
        await onGridReady();
        return NotificationManager.success(
          "Cập nhật thông tin thành công!",
          "Success!",
          1500
        );
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        if (err.status === 409) {
          return NotificationManager.warning(
            `${err.message}`,
            "Vui lòng kiểm Giờ và Địa điểm!",
            1500
          );
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };
  const handleClickOnSubmitForm = (values) => {
    const UnitPrice = {
      timeStart: values.TimeStart,
      timeEnd: values.TimeEnd,
      provinceFrom: values.ProvinceFrom,
      provinceTo: values.ProvinceTo,
      adultUnitPrice: values.AdultUnitPrice,
      childrenUnitPrice: values.ChildrenUnitPrice,
      babyUnitPrice: values.BabyUnitPrice,
      companyId: values.CompanyID,
      //
      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };

    if (stateTravelCompany.companyByTravelType[0] === "") {
      return NotificationManager.error(
        `[Hãng] không hợp lệ!!!`,
        "Vui lòng kiểm tra lại!",
        1500
      );
    } else {
      if (values.UnitPriceID !== "") {
        onUpdateUnitPrice(UnitPrice, values);
      } else {
        onInsertUnitPrice(UnitPrice);
      }
    }
  };

  //==================
  const handleClickEditFromGrid = async (Id) => {
    try {
      await dispatch(Adm_GetProvince({}));
      const params = {
        pID: Id,
      };
      dispatch(Adm_UnitPriceTransportDetails(params))
        .then(unwrapResult)
        .then((payload) => {
          const params = {
            enumTypeName: "TransportType",
          };
          dispatch(Adm_GetEnumConstantCbo(params))
            .then(unwrapResult)
            .then(() => {
              setInitialValues({
                UnitPriceID: payload.upTransportId,
                TimeStart: payload.timeStart,
                TimeEnd: payload.timeEnd,
                CompanyID: payload.companyId,
                TravelTypeID: payload.enumerationId,
                ProvinceFrom: payload.provinceFrom,
                ProvinceTo: payload.provinceTo,
                BabyUnitPrice: payload.babyUnitPrice, // đơn giá trẻ em
                AdultUnitPrice: payload.adultUnitPrice, // đơn giá người lớn
                ChildrenUnitPrice: payload.childrenUnitPrice, // đơn giá trẻ nhỏ
              });
              setDisabled(true);
              setShowModal(true);
            })
            .catch((err) => {
              return NotificationManager.error(
                `${err.error}`,
                "Vui lòng kiểm tra lại"
              );
            });
        })
        .catch((err) => {
          return NotificationManager.error(
            `${err.error}`,
            "Vui lòng kiểm tra lại"
          );
        });
    } catch (err) {
      return NotificationManager.error(
        `${err.message}`,
        "Vui lòng kiểm tra lại"
      );
    }
  };

  //==========================
  // Chọn khuyến mãi để xóa
  const handelClickDelete = (event) => {
    try {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.upTransportId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(String);
      console.log("Ids", Ids);
      // nếu là chưa chọn => vui lòng chọn dòng cần xóa
      if (Ids[0] === "") {
        return NotificationManager.warning(
          "Chọn một dòng để xóa",
          "Warning!",
          1500
        );
      }
      setSelectedIds(Ids);
      setShowConfirm(true);
    } catch (err) {}
  };

  const handleClickDeleteMultiRow = () => {
    let DeleteModels = {
      SelectByIds: selectedIds,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    console.log(DeleteModels);
    dispatch(Adm__DeleteUnitPriceByTourIds(DeleteModels))
      .then(unwrapResult)
      .then(async () => {
        await onGridReady();
        setShowConfirm(false);
        return NotificationManager.success(`Xóa thành công!`, "Success!", 1500);
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(
          `${err.error}!`,
          "Xóa thất bại!",
          1500
        );
      });
  };
  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        count={selectedIds.length}
        ConfirmDelete={handleClickDeleteMultiRow}
      />
      <UnitPriceAddEdit
        disabled={disabled}
        showModal={showModal}
        toggle={toggle}
        initialValues={initialValues}
        onSubmitForm={(values) => {
          handleClickOnSubmitForm(values);
        }}
        onChangeTravelType={handleClickChangeTravelType}
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
                      <a href="/admin">Danh mục phương tiện</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Đơn giá</BreadcrumbItem>
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
              </Row>
              <Col lg="12">
                {/* Begin search */}
                <div id="showSearch" className="collapse show">
                  <Formik
                    enableReinitialize={true}
                    initialValues={initialValuesSearh}
                    onSubmit={handleClickSearch}
                  >
                    {(formikProps) => {
                      return (
                        <>
                          <Form className="mt-1">
                            <Row className="pb-2">
                              <Col xl={4} lg={6}>
                                <FormGroup
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <label
                                    className="h-label h-lable-Obligatory"
                                    style={{ width: "130px" }}
                                  >
                                    Loại phương tiện
                                  </label>
                                  <div style={{ width: "calc(100% - 130px)" }}>
                                    <Field
                                      className="h-textbox"
                                      isLoading={
                                        stateEnumConstant.loading === "loaded"
                                          ? false
                                          : true
                                      }
                                      name="TravelTypeID"
                                      handleChange={handleClickChangeTravelType}
                                      options={stateEnumConstant.dataCbo}
                                      placeholder="Vui lòng chọn"
                                      component={SelectField}
                                    ></Field>
                                  </div>
                                </FormGroup>
                                <FormGroup
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <label
                                    className="h-label h-lable-Obligatory"
                                    style={{ width: "130px" }}
                                  >
                                    Hãng vận hành
                                  </label>
                                  <div style={{ width: "calc(100% - 130px)" }}>
                                    <Field
                                      className="h-textbox"
                                      isLoading={
                                        stateTravelCompany?.loading === "loaded"
                                          ? false
                                          : true
                                      }
                                      name="CompanyID"
                                      options={
                                        stateTravelCompany.companyByTravelType
                                      }
                                      placeholder="Vui lòng chọn"
                                      component={SelectField}
                                    ></Field>
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col xl={4} lg={6}>
                                <FormGroup
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <label
                                    className="h-label"
                                    style={{ width: "130px" }}
                                  >
                                    Nơi khởi hành
                                  </label>
                                  <div style={{ width: "calc(100% - 130px)" }}>
                                    <Field
                                      className="h-textbox"
                                      isLoading={
                                        stateAddress?.loading === "loaded"
                                          ? false
                                          : true
                                      }
                                      name="ProvinceFrom"
                                      options={stateAddress.data}
                                      placeholder="Vui lòng chọn"
                                      component={SelectField}
                                    ></Field>
                                  </div>
                                </FormGroup>
                                <FormGroup
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <label
                                    className="h-label"
                                    style={{ width: "130px" }}
                                  >
                                    Nơi đến
                                  </label>
                                  <div style={{ width: "calc(100% - 130px)" }}>
                                    <Field
                                      className="h-textbox"
                                      isLoading={
                                        stateAddress?.loading === "loaded"
                                          ? false
                                          : true
                                      }
                                      name="ProvinceTo"
                                      options={stateAddress.data}
                                      placeholder="Vui lòng chọn"
                                      component={SelectField}
                                    ></Field>
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
                                    <IoMdAddCircle color="#2b6e44" size={15} />{" "}
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
                                    <button type="button" className="h-button">
                                      <RiFileExcel2Fill
                                        color="#2b6e44"
                                        size={15}
                                      />{" "}
                                      Xuất Excel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handelClickDelete}
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
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TableGridControl
              tableHeight="400px"
              rowData={stateUnitPrice.dataUnitPrice}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableColumnUnitPriceTransport}
              onEditForm={handleClickEditFromGrid}
              fieldValues="upTransportId"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

UnitpriceTransport.propTypes = {};

export default UnitpriceTransport;
