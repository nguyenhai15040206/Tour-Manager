import React from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import { FastField, Field } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import Loading from "../../../../components/Loading/Index";
import { useSelector } from "react-redux";
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};
function TravelCompanyAddEdit(props) {
  const {
    initialValues,
    onSubmitForm,
    onSubmitFormAndCreate,
    onSubmitFormAndClose,
    onChangeImage,
    onChangeProvince,
    onChangeDistrict,
  } = props;
  /// state in store
  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateConpany = useSelector((state) => state.travelConpanyTransport);
  const stateAddress = useSelector((state) => state.address);
  const stateDistrict = useSelector((state) => state.district);
  const stateWards = useSelector((state) => state.wards);
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

  const handleChangeProvice = (e) => {
    if (onChangeProvince) {
      onChangeProvince(e);
    }
  };

  const handleChangeDistrict = (e) => {
    if (onChangeDistrict) {
      onChangeDistrict(e);
    }
  };
  return (
    <>
      {(stateEnumConstant.loading === "loading" ||
        stateConpany.loading === "loading" ||
        stateAddress.loading === "loading") && <Loading loading={true} />}
      <ModalControl
        tableName="TableCompanyTransport"
        backdrop={"static"}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues}
        validationSchema={props.validationShema}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmitAndCreate}
        HandleClickSaveAndClosed={handleClickOnSubmitAndClose}
        titlePopup={"T???o m???i h??ng d???ch v??? v???n chuy???n"}
        style={{
          justifyContent: "start",
          padding: "2px 0rem 3px 15rem",
          backgroundColor: "#fff",
        }}
      >
        <Row>
          <Col xl={8} lg={12}>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label">M?? c??ng ty</label>
              </div>
              <div style={{ width: "calc(100% - 150px" }}>
                <FastField
                  disabled={true}
                  className="h-textbox"
                  name="CompanyID"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  T??n c??ng ty
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px" }}>
                <FastField
                  className="h-textbox"
                  name="CompanyName"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  S??? ??i???n tho???i
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px" }}>
                <FastField
                  className="h-textbox"
                  name="PhoneNumber"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Lo???i v/chuy???n
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px" }}>
                <Field
                  className="h-textbox"
                  isLoading={
                    stateEnumConstant.loading === "loaded" ? false : true
                  }
                  name="TravelTypeID"
                  placeholder="Ch???n lo???i h??nh"
                  component={SelectField}
                  options={stateEnumConstant.dataCbo}
                ></Field>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  ???nh ?????i di???n
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px" }}>
                <FastField
                  className="h-textbox form-control"
                  name="CompanyImage"
                  handleChange={handleChangeImage}
                  type="file"
                  accept="image/*"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Ch???n t???nh th??nh
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px" }}>
                <Field
                  className="h-textbox"
                  name="ProvinceID"
                  handleChange={handleChangeProvice}
                  isLoading={stateAddress.loading === "loaded" ? false : true}
                  placeholder="Ch???n t???nh th??nh"
                  component={SelectField}
                  options={stateAddress.data}
                ></Field>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Ch???n qu???n/huy???n
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px" }}>
                <Field
                  className="h-textbox"
                  name="DistrictID"
                  handleChange={handleChangeDistrict}
                  isLoading={stateDistrict.loading === "loaded" ? false : true}
                  placeholder="Ch???n qu???n/huy???n"
                  component={SelectField}
                  options={stateDistrict.dataDistrictCbb}
                ></Field>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Ch???n ph?????ng/x??
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px" }}>
                <Field
                  className="h-textbox"
                  name="WardsID"
                  isLoading={stateWards.loading === "loaded" ? false : true}
                  placeholder="Ch???n ph?????ng/x??"
                  component={SelectField}
                  options={stateWards.dataWardsCbb}
                ></Field>
              </div>
            </FormGroup>
          </Col>
          <Col xl={4} lg={12}>
            <Card style={{ height: "265.5px", marginTop: "2px" }} inverse>
              <CardImg
                style={{
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="Image Tour"
                src={`${props.imageDefault}`}
              />
            </Card>
          </Col>
        </Row>
        <FormGroup style={styles}>
          <div style={{ width: "150px" }}>
            <label className="h-label h-lable-Obligatory">??i???n ?????a ch???</label>
          </div>
          <div style={{ width: "calc(100% - 150px" }}>
            <Field
              className="h-textbox"
              name="Address"
              placeholder="VD: 35 Nguy???n H???u Ti???n"
              component={InputField}
            ></Field>
          </div>
        </FormGroup>
      </ModalControl>
    </>
  );
}

TravelCompanyAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  onSubmitFormAndCreate: PropTypes.func,
  onSubmitFormAndClose: PropTypes.func,
  onChangeImage: PropTypes.func,
  onChangeProvince: PropTypes.func,
  onChangeDistrict: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};
TravelCompanyAddEdit.defaulProps = {
  onChangeImage: null,
  onSubmitForm: null,
  onSubmitFormAndCreate: null,
  onSubmitFormAndClose: null,
  onChangeProvince: null,
  onChangeDistrict: null,
};

export default TravelCompanyAddEdit;
