import React from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Col, FormGroup, Row } from "reactstrap";
import { FastField, Field } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Index";
import validationSchema from "../../../../utils/ValidateShema";
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};

function UnitPriceAddEdit(props) {
  const { onSubmitForm, initialValues, onChangeTravelType, disabled } = props;
  const stateAddress = useSelector((state) => state.address);
  const stateTravelCompany = useSelector(
    (state) => state.travelConpanyTransport
  );
  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateUnitPrice = useSelector((state) => state.unitPriceTransport);

  //===============
  const handleClickOnSubmit = async (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
    }
  };
  const handleClickChangeTravelType = async (e) => {
    if (onSubmitForm) {
      onChangeTravelType(e);
    }
  };

  return (
    <>
      {(stateAddress.loading === "loading" ||
        stateUnitPrice.loading === "loading" ||
        stateTravelCompany.loading === "loading") && <Loading loading={true} />}
      <ModalControl
        toggle={props.toggle}
        showModal={props.showModal}
        className="modal-xm"
        backdrop={"static"}
        initialValues={initialValues}
        validationSchema={validationSchema.UnitPriceValidate}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmit}
        HandleClickSaveAndClosed={handleClickOnSubmit}
        titlePopup="Thêm mới đơn giá"
        style={{
          justifyContent: "start",
          padding: "2px 0rem 3px 10rem",
          backgroundColor: "#fff",
        }}
      >
        <Row>
          <Col>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label">Mã đơn giá</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  disabled={true}
                  className="h-textbox"
                  name="UnitPriceID"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Loại phương tiện
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <Field
                  className="h-textbox"
                  isLoading={
                    stateEnumConstant.loading === "loaded" ? false : true
                  }
                  name="TravelTypeID"
                  disable={disabled}
                  handleChange={handleClickChangeTravelType}
                  options={stateEnumConstant.dataCbo}
                  placeholder="Vui lòng chọn"
                  component={SelectField}
                ></Field>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">Chọn hãng</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <Field
                  className="h-textbox"
                  isLoading={
                    stateTravelCompany?.loading === "loaded" ? false : true
                  }
                  disable={disabled}
                  name="CompanyID"
                  options={stateTravelCompany.companyByTravelType}
                  placeholder="Vui lòng chọn"
                  component={SelectField}
                ></Field>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Giờ đi - giờ đến
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <div style={styles}>
                  <div style={{ width: "50%" }}>
                    <FastField
                      type="time"
                      className="h-textbox"
                      name="TimeStart"
                      component={InputField}
                    ></FastField>
                  </div>
                  <div style={{ width: "50%" }}>
                    <FastField
                      type="time"
                      className="h-textbox"
                      name="TimeEnd"
                      component={InputField}
                    ></FastField>
                  </div>
                </div>
              </div>
            </FormGroup>

            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Nơi bắt đầu
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <Field
                  className="h-textbox"
                  isLoading={stateAddress?.loading === "loaded" ? false : true}
                  name="ProvinceFrom"
                  options={stateAddress.data}
                  placeholder="Vui lòng chọn"
                  component={SelectField}
                ></Field>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">Nơi đến</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <Field
                  className="h-textbox"
                  isLoading={stateAddress?.loading === "loaded" ? false : true}
                  name="ProvinceTo"
                  options={stateAddress.data}
                  placeholder="Vui lòng chọn"
                  component={SelectField}
                ></Field>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Giá người lớn
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="AdultUnitPrice"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">Giá trẻ em</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="ChildrenUnitPrice"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Giá trẻ nhỏ
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="BabyUnitPrice"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

UnitPriceAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  onChangeTravelType: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};
UnitPriceAddEdit.defaulProps = {
  onSubmitForm: null,
  onChangeTravelType: null,
  disabled: false,
};

export default UnitPriceAddEdit;
