import React from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import { FastField, Field } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { useSelector } from "react-redux";
import * as yup from "yup";
import Loading from "../../../../components/Loading/Index";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};
function BannerAddEdit(props) {
  const {
    initialValues,
    onSubmitForm,
    onSubmitFormAndCreate,
    onSubmitFormAndClose,
    onChangeImage,
  } = props;
  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateUploadImg = useSelector((state) => state.imagesUpload);
  const stateBanner = useSelector((state) => state.banner);

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
  const handleChangeImage = (e) => {
    if (onChangeImage) {
      onChangeImage(e);
    }
  };
  const titlePopup =
    initialValues?.bannerID === "" ? "Tạo mới  banner" : "Cập nhât banner";

  const validatetionSchemaAdd = yup.object().shape({
    enumerationID: yup.string().trim().required("[Loại] không được bỏ trống"),
    bannerImg: yup.string().required("[Dịch VN] không được bỏ trống"),
  });
  const validatetionSchemaEdit = yup.object().shape({
    enumerationID: yup.string().trim().required("[Loại] không được bỏ trống"),
  });
  const validatetionSchema =
    initialValues?.bannerID === ""
      ? validatetionSchemaAdd
      : validatetionSchemaEdit;
  return (
    <>
      {(stateUploadImg.loading === "loading" ||
        stateBanner.loading === "loading") && <Loading loading={true} />}
      <ModalControl
        tableName="TablePromotion"
        backdrop={"static"}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues}
        validationSchema={validatetionSchema}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmitAndCreate}
        HandleClickSaveAndClosed={handleClickOnSubmitAndClose}
        titlePopup={titlePopup}
        style={{
          justifyContent: "start",
          padding: "2px 5rem 3px 15rem",
          backgroundColor: "#fff",
        }}
      >
        <Row>
          <Col xl={12}>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label">Mã banner</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  disabled={true}
                  className="h-textbox"
                  name="bannerID"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Loại banner
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px)" }}>
                <Field
                  disable={initialValues?.enumerationID !== "" ? true : false}
                  isClearable={false}
                  name="enumerationID"
                  isLoading={
                    stateEnumConstant?.loading === "loading" ? true : false
                  }
                  placeholder="Vui lòng chọn"
                  options={stateEnumConstant.dataCbo}
                  component={SelectField}
                />
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label">Hình ảnh</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox form-control"
                  name="bannerImg"
                  handleChange={handleChangeImage}
                  type="file"
                  accept="image/*"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
          </Col>
          <Col xl={12}>
            <Card style={{ height: "265.5px", marginTop: "10px" }} inverse>
              <CardImg
                style={{
                  height: "100%",
                  objectFit: "fill",
                }}
                alt="Image Tour"
                src={`${props.imageDefault}`}
              />
            </Card>
          </Col>
          <Col xl={12}>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label"></label>
              </div>
              <div
                style={{
                  display: "flex",
                  WebkitJustifyContent: "flex-start",
                  width: "calc(100% - 160px)",
                }}
              >
                <FastField
                  className="h-checkbox"
                  name="active"
                  component={InputField}
                  type="checkbox"
                />
                <label className="h-label-checkbox">Kích hoạt</label>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

BannerAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  onSubmitFormAndCreate: PropTypes.func,
  onSubmitFormAndClose: PropTypes.func,
  onChangeImage: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};
BannerAddEdit.defaulProps = {
  onSubmitForm: null,
  onSubmitFormAndCreate: null,
  onSubmitFormAndClose: null,
  onChangeImage: null,
};

export default BannerAddEdit;
