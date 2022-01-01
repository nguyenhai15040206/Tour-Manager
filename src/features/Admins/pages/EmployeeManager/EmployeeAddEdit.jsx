import { FastField, Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import * as yup from "yup";
import SelectField from "../../../../CustomFields/SelectField/Index";
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
// regex
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// test xong bỏ shema vao
const validationSchema = yup.object().shape({
  empName: yup.string().trim().required("[Tên nhân viên] không được để trống"),
  //gender: yup.bool().required("[Giới tính] không hợp lệ"),
  dateOfBirth: yup
    .date()
    .max(new Date(), "[Ngày sinh] không hợp lệ")
    .required("[Ngày sinh] không để trống"),
  phoneNumber: yup
    .string()
    .trim()
    .required("[Số điện thoại] không để trống")
    .matches(phoneRegExp, "[Số điện thoại] không hợp lệ")
    .min(10, "[Số điện thoại] không hợp lệ")
    .max(10, "[Số điện thoại] không hợp lệ"),
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
  provinceId: yup.string().required("[Tỉnh thành] không được để trống"),
  districtId: yup.string().required("[Quận/ Huyện] không được để trống"),
  wardId: yup.string().required("[Phường/ Xã] không được để trống"),
  address: yup.string().trim().required("[Địa chỉ] không được để trống"),
  gender: yup.string().trim().required("[Giới tính] không được để trống"),
});
function EmployeeAddEdit(props) {
  const {
    initialValues,
    onSubmitForm,
    onSubmitFormAndCreate,
    onSubmitFormAndClose,
    imageDefault,
    onChangeImages,
    onChangeProvince,
    onChangeDistrict,
    onChangeWards,
  } = props;

  //
  const stateEmployee = useSelector((state) => state?.employee);
  const stateProvince = useSelector((state) => state?.address);
  const stateDistrict = useSelector((state) => state?.district);
  const stateWards = useSelector((state) => state?.wards);
  // handle bên tg cha
  const handleClickOnSubmit = async (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
    }
  };
  const handleClickOnSubmitAndCreate = async (e) => {
    if (onSubmitFormAndCreate) {
      onSubmitFormAndCreate(e);
    }
  };
  const handleClickOnSubmitAndClose = async (e) => {
    if (onSubmitFormAndClose) {
      onSubmitFormAndClose(e);
    }
  };

  const handleClickChangeImages = (e) => {
    if (onChangeImages) {
      onChangeImages(e);
    }
  };

  const handleChangeProvince = async (e) => {
    //console.log(e.value);
    if (onChangeProvince) {
      onChangeProvince(e);
    }
  };

  const handleChangeDistrict = async (e) => {
    console.log(e);
    if (onChangeDistrict) {
      onChangeDistrict(e);
    }
  };

  const handleChangeWards = (e) => {
    // kiem tra khac null ms handle  su kien, khong laf ben kia no ms vao nhan func null => errr
    if (onChangeWards) {
      onChangeWards(e);
    }
  };

  const title =
    initialValues.empId !== ""
      ? "Cập nhật thông tin nhân viên"
      : "Thêm mới nhân viên";

  return (
    <>
      {stateEmployee.loading === "loading" && <Loading loading={true} />}
      <ModalControl
        tableName="TableEmployee"
        backdrop={"static"}
        toggle={props.toggle}
        style={{
          justifyContent: "start",
          padding: "2px 20rem 3px 16rem",
          backgroundColor: "#fff",
        }}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues} // init nay la cai props
        validationSchema={validationSchema}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmitAndCreate}
        HandleClickSaveAndClosed={handleClickOnSubmitAndClose}
        titlePopup={title}
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
                    handleChange={handleClickChangeImages}
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
                src={`${imageDefault}`}
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
          <FormGroup style={styles}>
            <div style={{ width: "150px" }}>
              <label className="h-label h-lable-Obligatory">Địa chỉ</label>
            </div>
            <div style={{ width: "calc(100% - 150px)" }}>
              <Field
                component={InputField}
                className="h-textbox"
                name="address"
              />
            </div>
          </FormGroup>
          <Col xl={12}>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}></div>
              <div
                className="row"
                style={{
                  width: "calc(100% - 150px)",
                }}
              >
                <Col xl={4} lg={12}>
                  <label
                    style={{
                      marginLeft: "10px !important",
                      marginTop: "4.5px",
                      color: "#333 !important",
                      fontWeight: "400",
                      fontSize: "13px",
                    }}
                    className=" h-lable-Obligatory"
                  >
                    Tỉnh thành
                  </label>
                  <Field
                    isClearable={false}
                    className="h-textbox"
                    component={SelectField}
                    name="provinceId"
                    handleChange={handleChangeProvince}
                    isLoading={
                      stateProvince?.loading === "loaded" ? false : true
                    }
                    options={stateProvince.data}
                  />
                </Col>
                <Col xl={4} lg={12}>
                  <label
                    style={{
                      marginLeft: "10px !important",
                      marginTop: "4.5px",
                      color: "#333 !important",
                      fontWeight: "400",
                      fontSize: "13px",
                    }}
                    className="h-lable-Obligatory"
                  >
                    Quận huyện
                  </label>
                  <Field
                    isClearable={false}
                    className="h-textbox"
                    component={SelectField}
                    name="districtId"
                    handleChange={handleChangeDistrict}
                    isLoading={
                      stateDistrict?.loading === "loaded" ? false : true
                    }
                    options={stateDistrict?.dataDistrictCbb}
                  />
                </Col>
                <Col xl={4} lg={12}>
                  <label
                    style={{
                      marginLeft: "10px !important",
                      marginTop: "4.5px",
                      color: "#333 !important",
                      fontWeight: "400",
                      fontSize: "13px",
                    }}
                    className=" h-lable-Obligatory"
                  >
                    Phường xã
                  </label>
                  <Field
                    isClearable={false}
                    handleChange={handleChangeWards}
                    className="h-textbox"
                    component={SelectField}
                    name="wardId"
                    isLoading={stateWards?.loading === "loaded" ? false : true}
                    options={stateWards?.dataWardsCbb}
                  />
                </Col>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}></div>
              <div
                style={{
                  width: "calc(100% - 140px)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "stretch",
                }}
              >
                <FastField
                  className="h-checkbox"
                  name="status"
                  component={InputField}
                  type="checkbox"
                />
                <label className="h-label-checkbox">Kích hoạt tài khoản</label>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

// khai bao props
EmployeeAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  onSubmitFormAndCreate: PropTypes.func,
  onSubmitFormAndClose: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  imageDefault: PropTypes.string,
  onChangeImages: PropTypes.func,
  onChangeProvince: PropTypes.func,
  onChangeDistrict: PropTypes.func,
  onChangeWards: PropTypes.func,
};

EmployeeAddEdit.defaultProps = {
  onSubmitForm: null,
  onSubmitFormAndCreate: null,
  onSubmitFormAndClose: null,
  imageDefault: "",
  onChangeImages: null,
  onChangeProvince: null,
  onChangeDistrict: null,
  onChangeWards: null,
};

export default EmployeeAddEdit;
