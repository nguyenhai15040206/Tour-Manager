import React from "react";
import PropTypes from "prop-types";
import ModalControl from "./../../components/Customs/ModalControl";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import { FastField, Field } from "formik";
import InputField from "./../../../../CustomFields/InputField/Index";
import RadioField from "./../../../../CustomFields/InputField/RadioField";
import SelectField from "./../../../../CustomFields/SelectField/Index";
import * as yup from "yup";
import { useSelector } from "react-redux";
import Loading from "./../../../../components/Loading/Index";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};

function TourGuideAddEdit(props) {
  /////
  const {
    initialValues,
    onSubmitForm,
    onChangeProvince,
    onChangeDistrict,
    onChangeWards,
    onChangeImage,
    imageDefault,
  } = props;
  ///
  const stateProvince = useSelector((state) => state?.address);
  const stateDistrict = useSelector((state) => state?.district);
  const stateTourGuide = useSelector((state) => state?.tourGuide);
  const stateWards = useSelector((state) => state?.wards);
  ///console.log(stateWards?.dataWardsCbb);
  ///

  const handleClickOnSubmit = async (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
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
  const handleChangeImage = (e) => {
    if (onChangeImage) {
      onChangeImage(e);
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    tourGuideName: yup
      .string()
      .trim()
      .required("[Tên hướng dẫn viên] không được để trống"),
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
    provinceId: yup
      .array()
      .min(1, "[Tỉnh thành] không được để trống")
      .nullable(),
    districtId: yup
      .array()
      .min(1, "[Quận/ Huyện] không được để trống")
      .nullable(),
    wardId: yup.array().min(1, "[Phường/ Xã] không được để trống").nullable(),
    address: yup.string().trim().required("[Địa chỉ] không được để trống"),
    email: yup.string().email().required("[Email] không để trống"),
    gender: yup.string().trim().required("[Giới tính] không được để trống"),
  });

  const title =
    initialValues?.tourGuideId !== ""
      ? "Cập nhật thông tin hướng dẫn viên"
      : "Thêm mới hướng dẫn viên";
  return (
    <>
      {stateTourGuide.loading === "loading" && <Loading loading={true} />}
      <ModalControl
      tableName="TabdleTourGuide"
        backdrop={"static"}
        style={{
          justifyContent: "start",
          padding: "2px 20rem 3px 16rem",
          backgroundColor: "#fff",
        }}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues}
        validationSchema={validationSchema}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmit}
        HandleClickSaveAndClosed={handleClickOnSubmit}
        titlePopup={title}
      >
        <Row>
          <Col xl={8} lg={12}>
            <Row>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label">Mã nhân viên</label>
                </div>
                <div style={{ width: "calc(100% - 150px)" }}>
                  <FastField
                    className="h-textbox"
                    name="tourGuideId"
                    component={InputField}
                    disabled={true}
                  ></FastField>
                </div>
              </FormGroup>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label h-lable-Obligatory">
                    Tên nhân viên
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px)" }}>
                  <FastField
                    className="h-textbox"
                    name="tourGuideName"
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
                  <label className="h-label">Avatar</label>
                </div>
                <div style={{ width: "calc(100% - 150px)" }}>
                  <FastField
                    component={InputField}
                    handleChange={handleChangeImage}
                    name="avatar"
                    className="h-textbox form-control"
                    type="file"
                    accept="image/*"
                  />
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
            </Row>
          </Col>
          <Col xl={4} lg={12}>
            <Card style={{ height: "197px" }} inverse>
              <CardImg
                src={imageDefault}
                style={{ objectfic: "cover" }}
                alt="avatar"
              ></CardImg>
            </Card>
          </Col>
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
                  isLoading={stateProvince?.loading === "loaded" ? false : true}
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
                  isLoading={stateDistrict?.loading === "loaded" ? false : true}
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
        </Row>
      </ModalControl>
    </>
  );
}

TourGuideAddEdit.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func,
  onChangeProvince: PropTypes.func,
  onChangeDistrict: PropTypes.func,
  onChangeWards: PropTypes.func,
  onChangeImage: PropTypes.func,
  imageDefault: PropTypes.string,
};
TourGuideAddEdit.defaultProps = {
  onSubmitForm: null,
  onChangeProvince: null,
  onChangeDistrict: null,
  onChangeWards: null,
  onChangeImage: null,
  imageDefault: "",
};

export default TourGuideAddEdit;
