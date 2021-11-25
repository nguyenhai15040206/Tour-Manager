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
import { tableColumnEmployee } from "../../../../utils/Columns";
import TableGridControl from "../../components/Customs/TableGridControl";
import {
  Adm_CreateEmployee,
  Adm_DeleteEmployee,
  Adm_EditEmployee,
  Adm_GetEmployeeList,
} from "../../Slices/SliceEmployee";
import InputField from "./../../../../CustomFields/InputField/Index";
import RadioField from "./../../../../CustomFields/InputField/RadioField";
import EmployeeAddEdit from "./EmployeeAddEdit";

//import EditForm from "./../../components/Customs/EditForm";
import { Adm_GetEmployeeById } from "./../../Slices/SliceEmployee";
import { unwrapResult } from "@reduxjs/toolkit";
import ConfirmControl from "../../components/Customs/ConfirmControl";

// Thái Trần Kiều Diễm 20211115 -xử lý employee
const initialValuesEmp = {
  empId: "",
  empName: "",
  gender: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  userName: "",
  passWord: "",
};
function EmployeeManager(props) {
  // state in component
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState(initialValuesEmp);
  const [showConfirm, setShowConfirm] = useState(false);
  const [values, setValues] = useState([]);
  // End
  //
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  //

  // state in store
  const stateEmp = useSelector((state) => state?.employee);
  //console.log(stateEmp.dataEmpList);
  // end

  //const stateEmpDelete=useState((state)=>state?.employee.)

  //
  const onGridReady = async (values) => {
    values = {};
    try {
      await dispatch(Adm_GetEmployeeList(values));
    } catch (err) {
      console.log(err);
    }
  };

  // handle event here

  const handleClickShowModal = () => {
    setInitialValues(initialValuesEmp);
    setShowModal(true);
  };

  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };

  // start handle

  const handleClickDelete = async (e) => {
    try {
      const value = {};
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.empId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(Number);
      console.log("Ids", Ids);
      // nếu là chưa chọn => vui lòng chọn dòng cần xóa
      if (Ids[0] === 0) {
        return NotificationManager.error(
          "Error!",
          "Chọn một dòng để xóa",
          1500
        );
      }
      console.log("click");
      setValues(Ids);
      console.log(values);
      setShowConfirm(true);
    } catch (err) {
      console.log(err);
      return NotificationManager.error(`${err}`, "Xóa thất bại!", 1500);
    }
  };

  const ConfirmDelete = async () => {
    try {
      const value = {};
      await dispatch(Adm_DeleteEmployee(values));
      await dispatch(Adm_GetEmployeeList(value));
      setShowConfirm(false);
      return NotificationManager.success("Success!", "Xóa thành công");
    } catch (err) {
      return NotificationManager.error(`${err}`, "Xóa thất bại");
    }
  };

  const handleClickEdit = async (empID) => {
    try {
      const params = {
        empId: empID,
        // neu conf tiep
      };
      console.log(params);
      const rs = await dispatch(Adm_GetEmployeeById(params));
      const unwrapRS = unwrapResult(rs);
      setInitialValues({
        empId: unwrapRS.empId,
        empName: unwrapRS?.empName === null ? "" : unwrapRS.empName, // Input defaulValues là "" không bằng null check chỗ này
        gender: "true",
        dateOfBirth: unwrapRS.dateOfBirth,
        phoneNumber: unwrapRS.phoneNumber,
        email: unwrapRS.email,
        userName: unwrapRS.userName,
        avatar: unwrapRS?.avatar === null ? "" : unwrapRS.value,
        // //avatar: "abc",
        passWord: unwrapRS.password,
      });
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  /*const handleClickExportExcel = () => {
    //const data = [];
    if (stateEmp.dataEmpList != null) {
      return (
        <div>
          <DataExportExcelControl
            columnsExport={TableColumnsEmployeeExport}
            DataExport={stateEmp.dataEmpList}
            button={
              <button
                type="button"
                className="h-button"
                //onClick={handleClickExportExcel()}
              >
                <RiFileExcel2Fill color="#2b6e44" size={15} /> Xuất Excel
              </button>
            }
          />
        </div>
      );
    }
  };*/

  // try +> catch
  const handelClickSearchTour = async (value) => {
    //console.log(value);
    try {
      await dispatch(Adm_GetEmployeeList(value));
    } catch (err) {
      console.log(err);
    }
    //console.log("");
  };

  // handleClick On submit form
  const handleClickOnSubmitForm = async (values) => {
    console.log(values);
    const employee = {
      empId: values.empId === "" ? 0 : values.empId,
      empName: values.empName === null ? "" : values.empName,
      gender: values?.gender,
      dateOfBirth: values.dateOfBirth,
      phoneNumber: values.phoneNumber,
      email: values.email,
      userName: values.userName,
      passWord: values.passWord,
      avatar: values.avatar,
    };
    const params = {};
    if (values.empId !== "") {
      console.log(values.empId);
      try {
        // edit xong e làm gi nưa khong, khong lam thi khoi lay unwrapRS
        await dispatch(Adm_EditEmployee(values));
        await dispatch(Adm_GetEmployeeList(params));
        return NotificationManager.success(
          "Success!",
          "Edit thành công!",
          1500
        );
      } catch (err) {
        console.log(err);
        return NotificationManager.error("Error!", "Edit thất bại!", 1500);
      }
    } else {
      dispatch(Adm_CreateEmployee(employee))
        .then(unwrapResult)
        .then((payload) => {
          console.log(payload);
          dispatch(Adm_GetEmployeeList(params))
            .unwrap()
            .then(() => {
              return NotificationManager.success(
                "Thêm thành công!",
                "Success!",
                1500
              );
            })
            .catch((err) => {
              console.log(err);
              return NotificationManager.error(`${err.error}`, "Error!", 1500);
            });
        })
        .catch((err) => {
          console.log(err);
          return NotificationManager.error(`${err.error}`, "Error!", 1500);
        });
    }
  };

  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        ConfirmDelete={ConfirmDelete}
      />
      <EmployeeAddEdit
        className="modal-lg"
        toggle={toggle}
        showModal={showModal}
        initialValues={initialValues}
        onSubmitForm={(e, values) => {
          handleClickOnSubmitForm(e, values);
        }}
      />
      <Container
        fluid
        className="animate__animated animate_slideInUp animate__delay-0.5s "
      >
        <Row>
          <Col>
            <div className="admin-widget">
              <Row>
                <Col lg="12">
                  {/*Begin sitemap */}
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="/admin/employee">Home</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/admin/employee">Library</a>
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
                  {/*end Sitemap */}
                </Col>
                <Col lg="12">
                  {/**Begin Search */}
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handelClickSearchTour}
                    >
                      {(formikProps) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-2 row">
                                    <label className="col-lg-3 h-label">
                                      Mã nhân viên
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="empId"
                                        type="number"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Tên nhân viên
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="empName"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Ngày làm việc
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="workingDate"
                                        component={InputField}
                                        type="date"
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-2 row">
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
                              {/**Start toolbar widget */}
                              <Row>
                                <Col>
                                  <div className="commandToolBarWidge">
                                    <button
                                      type="button"
                                      className="h-button"
                                      onClick={handleClickShowModal}
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
                                        onClick={(e) => handleClickDelete(e)}
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
                  {/**end search */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TableGridControl
              rowData={stateEmp.dataEmpList}
              tableHeight="450px"
              tableColoumn={tableColumnEmployee}
              gridRef={gridRef}
              onGridReady={onGridReady}
              /////
              onEditForm={handleClickEdit}
              fieldValues="empId"
            ></TableGridControl>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EmployeeManager;
