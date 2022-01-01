import React from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Col, FormGroup, Row } from "reactstrap";
import { FastField, Field } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import RadioField from "../../../../CustomFields/InputField/RadioField";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { useSelector } from "react-redux";
import * as yup from "yup";
import Loading from "../../../../components/Loading/Index";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  CustomerName: yup
    .string()
    .trim()
    .required("[Tên khách hàng] không được để trống"),
  //gender: yup.bool().required("[Giới tính] không hợp lệ"),
  phoneNumber: yup
    .string()
    .trim()
    .required("[Số điện thoại] không để trống")
    .matches(phoneRegExp, "[Số điện thoại không hợp lệ]")
    .min(10, "[Số điện thoại] quá ngắn")
    .max(10, "[Số điện thoại] quá dài"),
  provinceId: yup.string().required("[Tỉnh thành] không được để trống"),
  districtId: yup.string().required("[Quận/ Huyện] không được để trống"),
  wardId: yup.string().required("[Phường/ Xã] không được để trống"),
  address: yup.string().trim().required("[Địa chỉ] không được để trống"),
  email: yup
    .string()
    .trim()
    .email("[Email] không hợp lệ")
    .required("[Email] không để trống"),
  gender: yup.string().trim().required("[Giới tính] không được để trống"),
});
function CustomerAddEdit(props) {
  const {
    initialValues,
    onSubmitForm,
    onSubmitFormAndCreate,
    onSubmitFormAndClose,
    onChangeProvince,
    onChangeDistrict,
    onChangeWards,
  } = props;

  const stateProvince = useSelector((state) => state?.address);
  const stateDistrict = useSelector((state) => state?.district);
  const { loading } = useSelector((state) => state?.customer);
  const stateWards = useSelector((state) => state?.wards);
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
    initialValues?.customerId !== ""
      ? "Cập nhật thông tin khách hàng"
      : "Thêm mới thông tin khách hàng";
  return (
    <>
      {(stateProvince.loading === "loading" || loading === "loading") && (
        <Loading loading={true} />
      )}
      <ModalControl
        tableName="TableCustomer"
        backdrop={"static"}
        style={{
          justifyContent: "start",
          padding: "2px 20rem 3px 16rem",
          backgroundColor: "#fff",
        }}
        className="modal-lg"
        toggle={props.toggle}
        showModal={props.showModal}
        initialValues={initialValues}
        validationSchema={validationSchema}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmitAndCreate}
        HandleClickSaveAndClosed={handleClickOnSubmitAndClose}
        titlePopup={title}
      >
        <Row>
          <Col xl={12} lg={12}>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label">Mã khách hàng</label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <FastField
                  className="h-textbox"
                  name="CustomerID"
                  component={InputField}
                  disabled={true}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Tên khách hàng
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <FastField
                  className="h-textbox"
                  name="CustomerName"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">Giới tính</label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <div style={styles}>
                  <FormGroup
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    <FastField
                      styles={{ width: "15px", height: "15px" }}
                      name="gender"
                      id="true"
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
                <label className="h-label h-lable-Obligatory">
                  Số điện thoại
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <Field
                  component={InputField}
                  className="h-textbox"
                  name="phoneNumber"
                />
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">Email</label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <Field
                  component={InputField}
                  className="h-textbox"
                  name="email"
                />
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
          </Col>
          <Col xl={12}>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}></div>
              <div
                className="row"
                style={{
                  width: "calc(100% - 150px",
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
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

CustomerAddEdit.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func,
  onSubmitFormAndCreate: PropTypes.func,
  onSubmitFormAndClose: PropTypes.func,
  onChangeProvince: PropTypes.func,
  onChangeDistrict: PropTypes.func,
  onChangeWards: PropTypes.func,
};

CustomerAddEdit.defaultProps = {
  onSubmitForm: null,
  onSubmitFormAndCreate: null,
  onSubmitFormAndClose: null,
  onChangeProvince: null,
  onChangeDistrict: null,
  onChangeWards: null,
};

export default CustomerAddEdit;
