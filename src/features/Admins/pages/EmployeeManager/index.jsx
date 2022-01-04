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
import EmployeeAddEdit from "./EmployeeAddEdit";
import { Adm_GetEmployeeById } from "./../../Slices/SliceEmployee";
import { unwrapResult } from "@reduxjs/toolkit";
import ConfirmControl from "../../components/Customs/ConfirmControl";
import imageDefaultPNG from "../../../../assets/logo/imageDefault.png";
import { Adm_UploadImageEmployee } from "../../Slices/SliceImagesUpload";
import { useHistory } from "react-router-dom";
import { Adm_GetWardsByIdDistrictCbb } from "../../Slices/SliceWards";
import { Adm_GetDistrictByProvinceCBB } from "../../Slices/SliceDistrict";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import ExportDataToExcel from "../../components/Customs/ExportDataToExcel";
// Thái Trần Kiều Diễm 20211115 -xử lý employee
const initialValuesInsert = {
  empId: "",
  empName: "",
  gender: "",
  dateOfBirth: "",
  workingDate: "",
  phoneNumber: "",
  email: "",
  userName: "",
  passWord: "",
  avatar: "",
  provinceId: "",
  districtId: "",
  wardId: "",
  address: "",
  status: false,
};

const initialValuesSearch = {
  empName: "",
  phoneNumber: "",
  email: "",
};
function EmployeeManager(props) {
  // state in component
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [showConfirm, setShowConfirm] = useState(false);
  const [valuesSearch, setValuesSearch] = useState(initialValuesSearch);
  const [values, setValues] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);
  // End

  // export data excel
  const [dataExport, setDataExport] = useState([]);
  const [showConfirmExport, setShowConfirmExport] = useState(false);

  // state in store
  const stateEmp = useSelector((state) => state?.employee);
  //
  const dispatch = useDispatch();
  const gridRef = useRef(null);
  const history = useHistory();

  //

  const handleClickShowModal = () => {
    dispatch(Adm_GetProvince())
      .then(unwrapResult)
      .then(() => {
        setImageDefault(`${imageDefaultPNG}`);
        setInitialValues(initialValuesInsert);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
    setShowConfirmExport(false);
  };
  //
  // end
  //
  //
  const onGridReady = async () => {
    try {
      await dispatch(Adm_GetEmployeeList(valuesSearch));
    } catch {
      console.error();
    }
  };

  //

  // handle event here

  // start handle
  ///thuc hien chon 1 dong du lieu de xoa
  const handleClickDelete = async (e) => {
    try {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.empId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(String);
      console.log("Ids", Ids);
      // nếu là chưa chọn => vui lòng chọn dòng cần xóa
      if (Ids[0] === 0) {
        return NotificationManager.error(
          "Chọn một dòng để xóa",
          "Error!",
          1500
        );
      }
      setValues(Ids);
      setShowConfirm(true);
    } catch (err) {
      console.log(err);
      return NotificationManager.error(`${err}`, "Xóa thất bại!", 1500);
    }
  };

  //thuc hien xoa di 1 dong du lieu
  const ConfirmDelete = async () => {
    let DeleteModels = {
      SelectByIds: values,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_DeleteEmployee(DeleteModels))
      .then(unwrapResult)
      .then(() => {
        onGridReady();
        setShowConfirm(false);
        return NotificationManager.success("Xóa thành công", "Success!");
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(`${err.error}`, "Xóa thất bại");
      });
  };

  // tim kiem
  const handelClickSearchEmployee = async (value) => {
    setValuesSearch(value);
    try {
      await dispatch(Adm_GetEmployeeList(value));
    } catch (err) {
      console.log(err);
    }
  };
  //thuc hien get dữ liệu
  const handleClickEdit = async (empID) => {
    try {
      const params = {
        empId: empID,
        // neu conf tiep
      };
      const rs = await dispatch(Adm_GetEmployeeById(params));
      const unwrapRS = unwrapResult(rs);
      unwrapRS.avatar === null
        ? setImageDefault(`${imageDefaultPNG}`)
        : setImageDefault(`${unwrapRS.avatar}`);
      const arrAddress =
        unwrapRS.address == null ? [] : unwrapRS.address.split("||");
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
        empId: unwrapRS.empId,
        empName: unwrapRS?.empName === null ? "" : unwrapRS.empName, // Input defaulValues là "" không bằng null check chỗ này
        gender: "true",
        dateOfBirth:
          unwrapRS.dateOfBirth === null
            ? ""
            : unwrapRS.dateOfBirth.slice(0, 10),
        phoneNumber: unwrapRS.phoneNumber,
        email: unwrapRS.email,
        userName: unwrapRS.userName,
        avatar: "",
        passWord: unwrapRS.password,
        status: unwrapRS.status,
        provinceId:
          arrAddress[3] === undefined ? "" : Number(arrAddress[3].trim()),
        districtId:
          arrAddress[2] === undefined ? "" : Number(arrAddress[2].trim()),
        wardId: arrAddress[1] === undefined ? "" : Number(arrAddress[1].trim()),
        address: arrAddress[0] === undefined ? "" : arrAddress[0],
      });
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  // handleClick On submit form edit/add

  const onInsertEmp = async (employee, values, type) => {
    let imageEmp = "";
    try {
      if (values.avatar !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        imageEmp = unwrapResult(
          await dispatch(Adm_UploadImageEmployee(formData))
        ).fileName;
      }
      dispatch(
        Adm_CreateEmployee(
          Object.assign(employee, {
            avatar: imageEmp,
          })
        )
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
            "Thêm thành công!",
            "Success!",
            1500
          );
        })
        .catch((err) => {
          if (err.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            return history.push("/admin/login");
          }
          return NotificationManager.error(`${err}`, "Error!", 1500);
        });
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem("accessTokenEmp");
        return history.push("/admin/login");
      }
      return NotificationManager.error(
        `${err.message}`,
        "Thêm thất bại!",
        1500
      );
    }
  };

  const onUpdateEmp = async (employee, values, type) => {
    let imageEmp = "";
    try {
      if (values.avatar !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        imageEmp = unwrapResult(
          await dispatch(Adm_UploadImageEmployee(formData))
        ).fileName;
      }
      dispatch(
        Adm_EditEmployee(
          Object.assign(employee, { empId: values.empId, avatar: imageEmp })
        )
      )
        .then(unwrapResult)
        .then(() => {
          if (Number(type) === 2) {
            setInitialValues(initialValuesInsert);
            setImageDefault(`${imageDefaultPNG}`);
          }
          if (Number(type) === 3) {
            setShowModal(false);
          }
          onGridReady();
          return NotificationManager.success(
            "Cập nhật thành công!!",
            "Success",
            1500
          );
        })
        .catch((err) => {
          if (err.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            return history.push("/admin/login");
          }
          return NotificationManager.error(`${err}`, "Error!", 1500);
        });
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem("accessTokenEmp");
        return history.push("/admin/login");
      }
      return NotificationManager.error(`${err}`, "Error!", 1500);
    }
  };
  const handleClickOnSubmitForm = async (values, type) => {
    const employee = {
      empName: values.empName === null ? "" : values.empName,
      gender: values?.gender,
      dateOfBirth: values.dateOfBirth,
      phoneNumber: values.phoneNumber,
      email: values.email,
      address: `${values.address} || ${values.wardId} || ${values.districtId} || ${values.provinceId}`,
      userName: values.userName,
      passWord: values.passWord,
    };
    if (values.empId !== "") {
      onUpdateEmp(employee, values, type);
    } else {
      onInsertEmp(employee, values, type);
    }
  };

  //===========
  // click change image
  const handleChoseImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };

  //=======
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

  //==== export
  const onBtnExportData = (event) => {
    event.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);

    if (selectedData.length === 0) {
      const arrObjExport = [];
      stateEmp.dataEmpList.forEach((element) => {
        const Obj = {
          "Mã nhân viên": element.empId,
          "Tên nhân viên": element.empName,
          "Giới tính": element.gender,
          "Ngày sinh": element.dateOfBirth,
          "Ngày vào làm": element.workingDate,
          "Số điện thoại": element.phoneNumber,
          "Email ": element.email,
          //
          "Địa chỉ": element.address,
          "Ngày cập nhật": element.dateUpdate,
          "Kích hoạt": element.status,
        };
        arrObjExport.push(Obj);
      });
      setDataExport(arrObjExport);
    } else {
      const arrObjExport = [];
      selectedData.forEach((element) => {
        const Obj = {
          "Mã nhân viên": element.empId,
          "Tên nhân viên": element.empName,
          "Giới tính": element.gender,
          "Ngày sinh": element.dateOfBirth,
          "Ngày vào làm": element.workingDate,
          "Số điện thoại": element.phoneNumber,
          "Email ": element.email,
          //
          "Địa chỉ": element.address,
          "Ngày cập nhật": element.dateUpdate,
          "Kích hoạt": element.status,
        };
        arrObjExport.push(Obj);
      });
      setDataExport(arrObjExport);
    }
    setShowConfirmExport(true);
  };

  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        ConfirmDelete={ConfirmDelete}
        count={values.length}
      />
      <EmployeeAddEdit
        className="modal-lg"
        toggle={toggle}
        showModal={showModal}
        initialValues={initialValues}
        onSubmitForm={(values) => {
          handleClickOnSubmitForm(values, 1);
        }}
        onSubmitFormAndCreate={(values) => {
          handleClickOnSubmitForm(values, 2);
        }}
        onSubmitFormAndClose={(values) => {
          handleClickOnSubmitForm(values, 3);
        }}
        onChangeProvince={handelChangeProvice}
        onChangeDistrict={handleChangeDistrict}
        onChangeImages={handleChoseImage}
        imageDefault={imageDefault}
      />
      <Container
        fluid
        className="animate__animated animate__slideInUp animate__delay-0.5s "
      >
        <Row>
          <Col>
            <div className="admin-widget">
              <Row>
                <Col lg={12}>
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
                      initialValues={valuesSearch}
                      onSubmit={handelClickSearchEmployee}
                    >
                      {(formikProps) => {
                        return (
                          <>
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
                                        name="empName"
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
                                <Col xl={4} lg={6}></Col>
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
                                      <ExportDataToExcel
                                        toggle={toggle}
                                        showModal={showConfirmExport}
                                        onExportData={onBtnExportData}
                                        apiData={dataExport}
                                        fileName="DSNhanVien"
                                      />
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
              onGridReady={onGridReady}
              gridRef={gridRef}
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
