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
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import TableGridControl from "../../components/Customs/TableGridControl";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { tableColumnCustomer } from "../../../../utils/Columns";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Adm_DeleteCustomer,
  Adm_GetDataCustomerList,
  Adm_RegisterCustomer,
  Cli_GetCustomerInfo,
  Cli_UpdateCustomer,
} from "../../Slices/SliceCustomer";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import CustomerAddEdit from "./CustomerAddEdit";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import { Adm_GetDistrictByProvinceCBB } from "../../Slices/SliceDistrict";
import { Adm_GetWardsByIdDistrictCbb } from "../../Slices/SliceWards";
import { NotificationManager } from "react-notifications";
import ConfirmControl from "../../components/Customs/ConfirmControl";

const initialValuesSearch = {
  Email: "",
  CustomerName: "",
  PhoneNumber: "",
};

const initialValuesInsert = {
  CustomerID: "",
  CustomerName: "",
  phoneNumber: "",
  email: "",
  gender: "",
  provinceId: "",
  districtId: "",
  wardId: "",
  address: "",
};
function CustomerManager(props) {
  const [valuesSearch, setValuesSearch] = useState(initialValuesSearch);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  //
  const { dataCustomer } = useSelector((state) => state.customer);
  //
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  //
  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };
  const onGridReady = async () => {
    try {
      dispatch(Adm_GetDataCustomerList(valuesSearch))
        .then(unwrapResult)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSearch = async (values) => {
    setValuesSearch(values);
    try {
      await dispatch(Adm_GetDataCustomerList(values));
    } catch (err) {
      console.log(err);
    }
  };
  //
  ///
  const handleClickShowModal = async () => {
    dispatch(Adm_GetProvince())
      .then(unwrapResult)
      .then(() => {
        setInitialValues(initialValuesInsert);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //
  //
  const handelChangeProvice = async (e) => {
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

  //===
  //thực hiện thêm
  const onInsertData = async (customer, type) => {
    try {
      await dispatch(Adm_RegisterCustomer(customer))
        .then(unwrapResult)
        .then(() => {
          if (Number(type) === 2) {
            setInitialValues(initialValuesInsert);
          }
          if (Number(type) === 3) {
            setShowModal(false);
          }
          onGridReady();
          return NotificationManager.success(
            "Thêm mới thành công!",
            "Success!",
            1500
          );
        })
        .catch((err) => {
          if (err.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            return history.push("/admin/login");
          }
          if (err.status === 400) {
            return NotificationManager.warning(
              `${err.message}`,
              "Trùng dữ liệu!",
              2500
            );
          }
          return NotificationManager.error(`${err.error}`, "Error!", 1500);
        });
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem("accessTokenEmp");
        return history.push("/admin/login");
      }
      return NotificationManager.error(`${err.error}`, "Error!", 1500);
    }
  };

  const onUpdateData = async (customer, values, type) => {
    dispatch(
      Cli_UpdateCustomer({
        ...customer,
        customerId: values.CustomerID,
      })
    )
      .then(unwrapResult)
      .then(() => {
        if (Number(type) === 2) {
          setInitialValues(initialValuesInsert);
        }
        if (Number(type) === 3) {
          setShowModal(false);
        }
        onGridReady();
        return NotificationManager.success(
          "Cập nhật thành công!",
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
            "Trùng dữ liệu!",
            2500
          );
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };
  const handleClickSubmitForm = (values, type) => {
    const customerObj = {
      customerName: values.CustomerName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      gender: values.gender,
      address: `${values.address} || ${values.wardId} || ${values.districtId} || ${values.provinceId}`,
      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };
    if (values.CustomerID !== "") {
      onUpdateData(customerObj, values, type);
    } else {
      onInsertData(customerObj, type);
    }
  };

  //
  const handleClickEditCompanyFromGrid = async (customerID) => {
    dispatch(Cli_GetCustomerInfo({ CustomerId: customerID }))
      .then(unwrapResult)
      .then(async (payload) => {
        try {
          const arrAddress = payload.address.split("||");
          await dispatch(Adm_GetProvince());
          if (arrAddress[3] !== undefined) {
            await dispatch(
              Adm_GetDistrictByProvinceCBB({
                provinceID: Number(arrAddress[3].trim()),
              })
            );
          }
          if (arrAddress[2] !== undefined) {
            await dispatch(
              Adm_GetWardsByIdDistrictCbb({
                districtID: Number(arrAddress[2].trim()),
              })
            );
          }

          setInitialValues({
            CustomerID: payload.customerId,
            CustomerName: payload.customerName,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            avatar: "",
            gender: `${payload.gender}`,
            provinceId:
              arrAddress[3] === undefined ? "" : Number(arrAddress[3].trim()),
            districtId:
              arrAddress[2] === undefined ? "" : Number(arrAddress[2].trim()),
            wardId:
              arrAddress[1] === undefined ? "" : Number(arrAddress[1].trim()),
            address: arrAddress[0],
          });
          setShowModal(true);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///
  //
  const handelClickDelete = (event) => {
    try {
      event.preventDefault();
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.customerId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(String);
      // nếu là chưa chọn => vui lòng chọn dòng cần xóa
      if (Ids[0] === "") {
        return NotificationManager.warning(
          "Chọn một dòng để xóa!!!",
          "Warning!",
          1500
        );
      }
      setSelectedIds(Ids);
      setShowConfirm(true);
    } catch (err) {
      console.log(err);
    }
  };
  //
  const handleClickDeleteMultiRow = () => {
    let DeleteModels = {
      SelectByIds: selectedIds,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_DeleteCustomer(DeleteModels))
      .then(unwrapResult)
      .then(() => {
        onGridReady();
        setShowConfirm(false);
        return NotificationManager.success(`Xóa thành công!`, "Success!", 1500);
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(
          `${err.message}!`,
          "Xóa thất bại!",
          1500
        );
      });
  };

  //=============
  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        count={selectedIds.length}
        ConfirmDelete={handleClickDeleteMultiRow}
      />
      <CustomerAddEdit
        initialValues={initialValues}
        showModal={showModal}
        toggle={toggle}
        onChangeProvince={handelChangeProvice}
        onChangeDistrict={handleChangeDistrict}
        onSubmitForm={(values) => {
          handleClickSubmitForm(values, 1);
        }}
        onSubmitFormAndCreate={(values) => {
          handleClickSubmitForm(values, 2);
        }}
        onSubmitFormAndClose={(values) => {
          handleClickSubmitForm(values, 3);
        }}
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
                    <BreadcrumbItem active>Quản lý người dùng</BreadcrumbItem>
                    <BreadcrumbItem active>Quản lý khách hàng</BreadcrumbItem>
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
                      onSubmit={handleClickSearch}
                      initialValues={valuesSearch}
                    >
                      {(formikProps) => {
                        return (
                          <Form className="mt-1">
                            <Row className="pb-2">
                              <Col xl={4} lg={6}>
                                <FormGroup className="row">
                                  <label className="col-lg-3 h-label">
                                    Tên nhân viên
                                  </label>
                                  <div className="col-lg-8">
                                    <FastField
                                      className="h-textbox"
                                      name="CustomerName"
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
                                      name="PhoneNumber"
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
                                      name="Email"
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
              tableHeight="400px"
              rowData={dataCustomer}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableColumnCustomer}
              fieldValues="customerId"
              onEditForm={handleClickEditCompanyFromGrid}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

CustomerManager.propTypes = {};

export default CustomerManager;
