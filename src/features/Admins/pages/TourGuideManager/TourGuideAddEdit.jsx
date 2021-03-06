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
      .required("[T??n h?????ng d???n vi??n] kh??ng ???????c ????? tr???ng"),
    //gender: yup.bool().required("[Gi???i t??nh] kh??ng h???p l???"),
    dateOfBirth: yup
      .date()
      .max(new Date(), "[Ng??y sinh] kh??ng h???p l???")
      .required("[Ng??y sinh] kh??ng ????? tr???ng"),
    phoneNumber: yup
      .string()
      .trim()
      .required("[S??? ??i???n tho???i] kh??ng ????? tr???ng")
      .matches(phoneRegExp, "[S??? ??i???n tho???i kh??ng h???p l???]")
      .min(10, "[S??? ??i???n tho???i] qu?? ng???n")
      .max(10, "[S??? ??i???n tho???i] qu?? d??i"),
    provinceId: yup
      .array()
      .min(1, "[T???nh th??nh] kh??ng ???????c ????? tr???ng")
      .nullable(),
    districtId: yup
      .array()
      .min(1, "[Qu???n/ Huy???n] kh??ng ???????c ????? tr???ng")
      .nullable(),
    wardId: yup.array().min(1, "[Ph?????ng/ X??] kh??ng ???????c ????? tr???ng").nullable(),
    address: yup.string().trim().required("[?????a ch???] kh??ng ???????c ????? tr???ng"),
    email: yup.string().email().required("[Email] kh??ng ????? tr???ng"),
    gender: yup.string().trim().required("[Gi???i t??nh] kh??ng ???????c ????? tr???ng"),
  });

  const title =
    initialValues?.tourGuideId !== ""
      ? "C???p nh???t th??ng tin h?????ng d???n vi??n"
      : "Th??m m???i h?????ng d???n vi??n";
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
                  <label className="h-label">M?? nh??n vi??n</label>
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
                    T??n nh??n vi??n
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
                    Gi???i t??nh
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
                        N???
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
                    Ng??y sinh
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
                  <label className="h-label h-lable-Obligatory">?????a ch???</label>
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
                  T???nh th??nh
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
                  Qu???n huy???n
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
                  Ph?????ng x??
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
                S??? ??i???n tho???i
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
