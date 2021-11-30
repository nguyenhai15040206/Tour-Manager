import { FastField } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import * as yup from "yup";
import Loading from "./../../../../components/Loading/Index";
import InputField from "./../../../../CustomFields/InputField/Index";
import RadioField from "./../../../../CustomFields/InputField/RadioField";
import ModalControl from "./../../components/Customs/ModalControl";
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};

//thai tran kieu diem
function EmployeeAddEdit(props) {
  const { initialValues, onSubmitForm } = props;

  //

  const stateEmployee = useSelector((state) => state?.employee);

  // handle bên tg cha
  const handleClickOnSubmit = async (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
    }
  };

  // regex
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // test xong bỏ shema vao
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
    gender: yup.string().trim().required("[Giới tính] không được để trống"),
  });

  return (
    <>
      {stateEmployee.loading === "loading" && <Loading loading={true} />}
      <ModalControl
        backdrop={"static"}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues} // init nay la cai props
        validationSchema={validationSchema}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmit}
        HandleClickSaveAndClosed={handleClickOnSubmit}
        titlePopup="Thêm mới một nhân viên"
      >
        <Row>
          {/**employeeID */}
          <Col xl={8} lg={12}>
            <Row>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label">Mã nhân viên</label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <FastField
                    disabled={true}
                    className="h-textbox"
                    name="empId"
                    component={InputField}
                  ></FastField>
                </div>
              </FormGroup>

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
                        defaultChecked="true"
                        className="h-textbox"
                        component={RadioField}
                      />
                      <label htmlFor="true" className="pt-2 h-label-checkbox">
                        Nam
                      </label>
                    </FormGroup>
                    <FormGroup
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: "3px",
                        marginBottom: "3px",
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
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label">Avatar</label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <FastField
                    type="file"
                    accept="image/*"
                    name="avatar"
                    handleChange={() => {
                      alert("OK");
                    }}
                    className="h-textbox form-control"
                    component={InputField}
                  ></FastField>
                </div>
              </FormGroup>

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
            </Row>
          </Col>
          <Col xl={4} lg={12}>
            <Card style={{ height: "191px" }} inverse>
              <CardImg
                style={{ height: "190px", objectFit: "cover" }}
                alt="avatar"
              ></CardImg>
            </Card>
          </Col>
          <FormGroup style={styles}>
            <div style={{ width: "150px" }}>
              <label className="h-label h-lable-Obligatory">Email</label>
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
      </ModalControl>
    </>
  );
}

// khai bao props
EmployeeAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};

EmployeeAddEdit.defaultProps = {
  onSubmitForm: null,
};

export default EmployeeAddEdit;
