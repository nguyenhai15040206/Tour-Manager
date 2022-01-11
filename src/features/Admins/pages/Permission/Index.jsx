import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import TableGridControl from "../../components/Customs/TableGridControl";
import {
  tableUserGroup,
  tableCatScreen,
  tableColumnEmployee,
  tableColumnEmployeeUserGroup,
} from "../../../../utils/Columns";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import UserGroupAddEdit from "./UserGroupAddEdit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Adm_DeleteEmpInGroup,
  Adm_DeleteUserGroup,
  Adm_GetDataEmpByGroupID,
  Adm_GetDataEmpNoGroup,
  Adm_GetDatatUserGroup,
  Adm_GetPermistion,
  Adm_InsertEmpInGroup,
  Adm_InsertUserGroup,
} from "../../Slices/SlicePermission";
import { unwrapResult } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { RiDeleteBin6Line, RiListCheck2 } from "react-icons/ri";
import ConfirmControl from "../../components/Customs/ConfirmControl";
import Permisstion from "./Permisstion";
import { FcNext, FcPrevious } from "react-icons/fc";

const initialValuesInsert = {
  UserGroupName: "",
  UserGroupID: "",
};

const initialValuesSearch = {
  UserGroupName: "",
};
function PermissionManager(props) {
  document.title = "Quản lý phân quyền";
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPermission, setShowPermission] = useState(false);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [valuesSearch, setValuesSearch] = useState(initialValuesSearch);
  const [selectedIds, setSelectedIds] = useState([]);
  const [userGroupID, setUserGroupID] = useState(null);
  //==
  const { dataUserGroup, dataPermission, dataEmpNoGroup, dataEmpByGroupID } =
    useSelector((state) => state.permission);

  const gridRef = useRef(null);
  const gridRefPermission = useRef(null);
  const gridRefEmpNoGroup = useRef(null);
  const gridRefEmpByGroupID = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  //=============

  const onGridReady = async () => {
    try {
      dispatch(Adm_GetDatatUserGroup(valuesSearch));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitSearch = async (values) => {
    setValuesSearch(values);
    try {
      await dispatch(Adm_GetDatatUserGroup(values));
    } catch (err) {
      console.log(err.error);
    }
  };

  const handleClickRowFromGrid = async (userGroupId) => {
    console.log(userGroupId);
    try {
      await dispatch(Adm_GetPermistion({ pID: userGroupId }));
    } catch (err) {
      console.log(err);
    }
  };

  //==
  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
    setShowPermission(false);
  };

  const handleClickShowModal = async () => {
    setInitialValues(initialValues);
    setShowModal(true);
  };

  const handleClickSubmitForm = (values, type) => {
    console.log(values);
    if (values.UserGroupID !== "") {
    } else {
      dispatch(
        Adm_InsertUserGroup({
          UserGroupName: values.UserGroupName,
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
          return NotificationManager.error(`${err.error}`, "Error!", 1500);
        });
    }
  };
  //=====
  const handleClickDeletePermisstion = (event) => {
    event.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.userGroupId}`)
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
  };

  //==
  const handleClickDeleteMultiRow = () => {
    let DeleteModels = {
      SelectByIds: selectedIds,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_DeleteUserGroup(DeleteModels))
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

  ///// Phân quyền người dùng vào nhóm
  const handleClickShowPermission = async (event) => {
    //#region  kiểm tra điều kiện
    event.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.userGroupId}`)
      .join(",");
    const Ids = selectedDataStringPresentation.split(",").map(String);
    // nếu là chưa chọn => vui lòng chọn dòng cần xóa
    if (Ids[0] === "" || Ids.length > 1) {
      return NotificationManager.warning(
        "Chỉ chọn một nhóm quyền để phân quyền!!!",
        "Warning!",
        1500
      );
    }
    //#endregion
    dispatch(Adm_GetDataEmpNoGroup({ pID: Ids[0] }))
      .then(unwrapResult)
      .then(() => {
        dispatch(Adm_GetDataEmpByGroupID({ pID: Ids[0] }))
          .then(unwrapResult)
          .then(() => {
            setUserGroupID(Ids[0]);
            setShowPermission(true);
          })
          .catch((err) => {
            return NotificationManager.error(
              `${err.error}`,
              "Kiểm tra lại đường truyền",
              2500
            );
          });
      })
      .catch((err) => {
        return NotificationManager.error(
          `${err.error}`,
          "Kiểm tra lại đường truyền",
          2500
        );
      });
  };

  // thêm người dùng vào nhóm
  const handleClickAddUserInGroup = (event) => {
    //#region  kiểm tra điều kiện
    event.preventDefault();
    const selectedNodes = gridRefEmpNoGroup.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.empId}`)
      .join(",");
    const Ids = selectedDataStringPresentation.split(",").map(String);
    // nếu là chưa chọn => vui lòng chọn dòng cần xóa
    if (Ids[0] === "") {
      return NotificationManager.warning(
        "Chọn nhân viên thêm vào nhóm!!!",
        "Warning!",
        1500
      );
    }
    //#endregion
    const arrObj = {
      EmpIds: Ids,
      UserGroupId: userGroupID,
    };
    dispatch(Adm_InsertEmpInGroup(arrObj))
      .then(unwrapResult)
      .then(async () => {
        try {
          await dispatch(Adm_GetDataEmpNoGroup({ pID: userGroupID }));
          await dispatch(Adm_GetDataEmpByGroupID({ pID: userGroupID }));
          return NotificationManager.success(
            `Thêm thành công!`,
            "Success!",
            1500
          );
        } catch (err) {
          console.log(err);
        }
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

  // xóa người dùng ra khỏi nhóm
  const handleClickRemoveUserInGroup = (event) => {
    //#region  kiểm tra điều kiện
    event.preventDefault();
    const selectedNodes = gridRefEmpByGroupID.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.empId}`)
      .join(",");
    const Ids = selectedDataStringPresentation.split(",").map(String);
    // nếu là chưa chọn => vui lòng chọn dòng cần xóa
    if (Ids[0] === "") {
      return NotificationManager.warning(
        "Chọn nhân xóa khỏi nhóm!!!",
        "Warning!",
        1500
      );
    }
    //#endregion
    const arrObj = {
      EmpIds: Ids,
      UserGroupId: userGroupID,
    };
    dispatch(Adm_DeleteEmpInGroup(arrObj))
      .then(unwrapResult)
      .then(async () => {
        try {
          await dispatch(Adm_GetDataEmpNoGroup({ pID: userGroupID }));
          await dispatch(Adm_GetDataEmpByGroupID({ pID: userGroupID }));
          return NotificationManager.success(
            `Xóa thành công!`,
            "Success!",
            1500
          );
        } catch (err) {
          console.log(err);
        }
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

  //===========
  return (
    <>
      <Permisstion
        showModal={showPermission}
        toggle={toggle}
        titlePopup={`Phân quyền người dùng mã nhóm: ${userGroupID}`}
      >
        <Row>
          <Col>
            <p className="h-label mb-1">Danh sách người dùng chưa có nhóm</p>
            <TableGridControl
              tableHeight="400px"
              rowData={dataEmpNoGroup}
              gridRef={gridRefEmpNoGroup}
              //onGridReady={onGridReady}
              //
              tableColoumn={tableColumnEmployeeUserGroup}
            />
          </Col>
          <Col xl={1}>
            <div style={{ marginTop: "100px" }}>
              <button
                onClick={(event) => {
                  handleClickAddUserInGroup(event);
                }}
                className="h-button"
                style={{ width: "100%" }}
              >
                <FcNext color="rgb(180 173 30)" size={15} />
              </button>
              <button
                onClick={(event) => {
                  handleClickRemoveUserInGroup(event);
                }}
                className="h-button"
                style={{ width: "100%" }}
              >
                <FcPrevious color="rgb(180 173 30)" size={15} />
              </button>
            </div>
          </Col>
          <Col>
            <p className="h-label mb-1">Danh sách người dùng đã có nhóm</p>
            <TableGridControl
              tableHeight="400px"
              rowData={dataEmpByGroupID}
              gridRef={gridRefEmpByGroupID}
              //
              tableColoumn={tableColumnEmployeeUserGroup}
            />
          </Col>
        </Row>
      </Permisstion>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        count={selectedIds.length}
        ConfirmDelete={handleClickDeleteMultiRow}
      />
      <UserGroupAddEdit
        initialValues={initialValues}
        showModal={showModal}
        toggle={toggle}
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
                    <BreadcrumbItem active>Quản lý phân quyền</BreadcrumbItem>
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
                      initialValues={valuesSearch}
                      onSubmit={handleSubmitSearch}
                    >
                      {(formikProps) => {
                        return (
                          <Form className="mt-1">
                            <Row className="pb-2">
                              <Col xl={4} lg={6}>
                                <FormGroup className="row">
                                  <label className="col-lg-3 h-label">
                                    Nhóm quyền
                                  </label>
                                  <div className="col-lg-8">
                                    <FastField
                                      className="h-textbox"
                                      name="UserGroupName"
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
                                      onClick={(event) =>
                                        handleClickShowPermission(event)
                                      }
                                      className="h-button"
                                      style={{ marginRight: "3px" }}
                                    >
                                      <RiListCheck2
                                        color="rgb(43 16 2)"
                                        size={15}
                                      />{" "}
                                      Phân quyền người dùng
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleClickDeletePermisstion}
                                      className="h-button"
                                      style={{ marginLeft: "3px" }}
                                    >
                                      <RiDeleteBin6Line size={15} /> Xóa nhóm
                                      quyền
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
          <Col xl={5} lg={6}>
            <TableGridControl
              tableHeight="400px"
              rowData={dataUserGroup}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableUserGroup}
              fieldValues="userGroupId"
              onEditForm={handleClickRowFromGrid}
            />
          </Col>
          <Col xl={7} lg={6}>
            <TableGridControl
              tableHeight="400px"
              rowData={dataPermission}
              gridRef={gridRefPermission}
              //
              tableColoumn={tableCatScreen}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

PermissionManager.propTypes = {};

export default PermissionManager;
