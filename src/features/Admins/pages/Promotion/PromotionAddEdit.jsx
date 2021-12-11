import React from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Col, FormGroup, Row } from "reactstrap";
import { FastField } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Index";
import validationSchema from "../../../../utils/ValidateShema";
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};
function PromotionAddEdit(props) {
  // state in store
  const statePromotion = useSelector((state) => state.promotion);
  const { initialValues, onSubmitForm } = props;

  const handleClickOnSubmit = async (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
    }
  };
  const titlePopup =
    initialValues?.PromotionID === ""
      ? "Tạo mới  khuyến mãi"
      : "Cập nhât khuyến mãi";
  return (
    <>
      {statePromotion.loading === "loading" && <Loading loading={true} />}
      <ModalControl
        backdrop={"static"}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues}
        validationSchema={validationSchema.PromotionManager}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmit}
        HandleClickSaveAndClosed={handleClickOnSubmit}
        titlePopup={titlePopup}
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
                <label className="h-label">Mã khuyến mãi</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  disabled={true}
                  className="h-textbox"
                  name="PromotionID"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Tên khuyến mãi
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="PromotionName"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Ngày bắt đầu
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="DateStart"
                  type="date"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Ngày kết thúc
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="DateEnd"
                  type="date"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">Giảm giá %</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  placeholder="%"
                  name="Discount"
                  type="number"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}></div>
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
                  name="IsAppyAll"
                  component={InputField}
                  type="checkbox"
                />
                <label className="h-label-checkbox">
                  Sử dụng cho tất cả tour
                </label>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

PromotionAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};
PromotionAddEdit.defaulProps = {
  onSubmitForm: null,
};

export default PromotionAddEdit;
