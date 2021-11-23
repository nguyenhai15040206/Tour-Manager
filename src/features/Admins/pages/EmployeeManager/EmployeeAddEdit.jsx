import React, { useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import ModalControl from "./../../components/Customs/ModalControl";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import { FastField } from "formik";
import InputField from "./../../../../CustomFields/InputField/Index";
import { useDispatch, useSelector } from "react-redux";
import {
  Adm_CreateEmployee,
  Adm_GetEmployeeList,
} from "./../../Slices/SliceEmployee";
import { NotificationManager } from "react-notifications";
import RadioField from "./../../../../CustomFields/InputField/RadioField";
import { unwrapResult } from "@reduxjs/toolkit";

//thai tran kieu diem
function EmployeeAddEdit(props) {
  const dispatch = useDispatch();
  const [checkDuplicate, setCheckDuplicate] = useState(false);

  const stateEmp = useSelector((state) => state?.employee);
  //console.log("select ", stateEmp?.dataEmpList);

  const styles = {
    display: "flex",
    justifyContent: "flex-start",
    alignItem: "center",
  };

  const initialValues = {
    //empId: "",
    empName: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    userName: "",
    passWord: "",
    avatar: "",
    status: "",
  };

  const handleClickOnSubmit = async (values, type, params) => {
    params = {};
    try {
      const actionResult = await dispatch(Adm_CreateEmployee(values));
      await dispatch(Adm_GetEmployeeList(params));
      const currentEmp = unwrapResult(actionResult);
      console.log("currentEmp", currentEmp);
      console.log(values);
      //setCheckDuplicate(false);
      return NotificationManager.success("Success!", "Thêm thành công!", 1500);
    } catch (err) {
      // err là do em nhả bên BE
      //setCheckDuplicate(true);
      // Duplicate được nhả err từ BE
      return NotificationManager.error("Error!", "Thêm thất bại!", 1500);
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    empName: yup
      .string()
      .trim()
      .required("[Tên nhân viên] không được để trống"),
    //gender: yup.bool().required("[Giới tính] không hợp lệ"),
    dateOfBirth: yup
      .date()
      .max(new Date(), "[Ngày sinh] không hợp lệ")
      .required("[Ngày sinh] không để trống"),
    phoneNumber: yup
      .string()
      .trim()
      .required("[Số điện thoại] không để trống")
      .matches(phoneRegExp, "[Số điện thoại không hợp lệ]")
      .min(10, "[Số điện thoại] quá ngắn")
      .max(10, "[Số điện thoại] quá dài"),
    email: yup.string().email().required("[Email] không để trống"),
    userName: yup
      .string()
      .trim()
      .required("[Tên đăng nhập] không để trống")
      .max(15, "[Tên đăng nhập] quá dài")
      .min(8, "[Tên đăng nhập] quá ngắn"),
    passWord: yup
      .string()
      .trim()
      .required("[Mật khẩu] không để trống")
      .max(15, "[Mật khẩu] quá dài")
      .min(8, "[Mật khẩu] quá ngắn"),
  });

  return (
    <>
      {/* // Duplicate dudowcj show ow duoi the inout ID */}
      <ModalControl
        backdrop={"static"}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        //tableEmp={stateEmp}
        initialValues={initialValues} // init nay la cai props
        //validationSchema={validationSchema}
        HandleClickSave={(values) => {
          handleClickOnSubmit(values);
        }}
        HandleClickSaveAndCreated={(values) => {
          handleClickOnSubmit(values, "SaveAndCreated");
        }}
        HandleClickSaveAndClosed={(values) => {
          handleClickOnSubmit(values, "SaveAndClosed");
        }}
        //handleSubmitAddEmp={handleSubmitAddEmp}
        //title="Thêm mới một nhân viên"
      >
        <Row>
          <Col lg={12}>
            {/**employeeID */}
            <Col
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Col xl={8}>
                <Row>
                  <Col xl={8}>
                    <FormGroup style={styles}>
                      <div style={{ width: "150px" }}>
                        <label className="h-label">Mã nhân viên</label>
                      </div>
                      <div style={{ width: "calc(100% - 150px" }}>
                        <FastField
                          disabled={true}
                          className="h-textbox"
                          name="empId"
                          type="number"
                          component={InputField}
                        ></FastField>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                {/**employeeID */}
                {/** employeeName, avatar */}
                <Row>
                  <Col>
                    <FormGroup style={styles}>
                      <div style={{ width: "150px" }}>
                        <label className="h-label h-lable-Obligatory">
                          Tên nhân viên
                        </label>
                      </div>
                      <div style={{ width: "calc(100% - 150px" }}>
                        <FastField
                          className="h-textbox"
                          name="empName"
                          component={InputField}
                        ></FastField>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup style={styles}>
                      <div style={{ width: "150px" }}>
                        <label className="h-label">Avatar</label>
                      </div>
                      <div style={{ width: "calc(100% - 150px" }}>
                        <FastField
                          type="file"
                          accept="image/*"
                          name="avatar"
                          className="h-textbox form-control"
                          component={InputField}
                        ></FastField>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                {/**employeeName */}
                {/**DateOfBirth, Gender */}
                <Row>
                  <Col>
                    <FormGroup style={styles}>
                      <div style={{ width: "150px" }}>
                        <label className="h-label h-lable-Obligatory">
                          Ngày sinh
                        </label>
                      </div>
                      <div style={{ width: "calc(100% - 150px)" }}>
                        <FastField
                          type="date"
                          name="dateOfBirth"
                          className="h-textbox"
                          component={InputField}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup style={styles}>
                      <div style={{ width: "150px" }}>
                        <label className="h-label h-lable-Obligatory">
                          Số điện thoại
                        </label>
                      </div>
                      <div style={{ width: "calc(100% - 150px" }}>
                        <FastField
                          name="phoneNumber"
                          className="h-textbox"
                          component={InputField}
                        ></FastField>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup style={styles}>
                      <div style={{ width: "150px" }}>
                        <label className="h-label h-lable-Obligatory">
                          Email
                        </label>
                      </div>
                      <div style={{ width: "calc(100% - 150px" }}>
                        <FastField
                          type="email"
                          name="email"
                          component={InputField}
                          className="h-textbox"
                        ></FastField>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xl={3} lg={3} style={{ width: "31%" }}>
                <Card style={{ height: "195px" }} inverse>
                  <CardImg
                    style={{ height: "192px", objectFit: "cover" }}
                    alt="avatar"
                    src="https://lh3.googleusercontent.com/proxy/GgXmHyXIMRpQLOwZmn5THfyGX2dQxcnDKY-UnMnR5soXKYOb3T8SMXG3qBceumH5rML2ld2aYxCgNAKYSg2vpM8FwnIERAU"
                  ></CardImg>
                </Card>
              </Col>
            </Col>
            <Row>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label h-lable-Obligatory">
                    Tên đăng nhập
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <FastField
                    className="h-textbox"
                    name="userName"
                    component={InputField}
                  ></FastField>
                </div>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label h-lable-Obligatory">Mật khẩu</label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <FastField
                    type="password"
                    className="h-textbox"
                    component={InputField}
                    name="passWord"
                  ></FastField>
                </div>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label h-lable-Obligatory">
                    Giới tính
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px)" }}>
                  <div style={styles}>
                    <FormGroup
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <FastField
                        styles={{ width: "15px", height: "15px" }}
                        name="gender"
                        id="true"
                        defaultChecked={"true"}
                        className="h-textbox"
                        component={RadioField}
                      />
                      <label htmlFor="true" className="pt-2 h-label-checkbox">
                        Nam
                      </label>
                    </FormGroup>
                    <FormGroup
                      style={{
                        //marginLeft: "2px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <FastField
                        styles={{ width: "15px", height: "15px" }}
                        id="false"
                        name="gender"
                        className="h-textbox"
                        component={RadioField}
                      />
                      <label htmlFor="false" className="pt-2 h-label-checkbox">
                        Nữ
                      </label>
                    </FormGroup>
                  </div>
                </div>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label">Tình trạng</label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <label className="h-label">Hoạt động</label>
                  <input
                    type="checkbox"
                    className="h-textbox"
                    name="status"
                  ></input>
                </div>
              </FormGroup>
            </Row>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

EmployeeAddEdit.propTypes = {};

export default EmployeeAddEdit;
