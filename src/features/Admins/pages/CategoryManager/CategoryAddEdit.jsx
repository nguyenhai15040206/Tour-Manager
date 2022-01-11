import React from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Col, FormGroup, Row } from "reactstrap";
import { FastField, Field } from "formik";
import SelectField from "../../../../CustomFields/SelectField/Index";
import Options from "../../../../utils/Options";
import InputField from "../../../../CustomFields/InputField/Index";
import * as yup from "yup";
import Loading from "../../../../components/Loading/Index";
import { useSelector } from "react-redux";
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};
function CategoryAddEdit(props) {
  const { loading } = useSelector((state) => state.enumConstant);
  const {
    initialValues,
    onSubmitForm,
    onSubmitFormAndCreate,
    onSubmitFormAndClose,
  } = props;

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

  const titlePopup =
    initialValues?.enumerationID === ""
      ? "Tạo mới  danh mục theo loại"
      : "Cập nhât danh mục theo loại";

  const validatetionSchema = yup.object().shape({
    enumerationType: yup.string().trim().required("[Loại] không được bỏ trống"),
    enumerationTranslate: yup
      .string()
      .max(250, "[Dịch VN] không quá 250 kí tự")
      .required("[Dịch VN] không được bỏ trống"),
  });
  return (
    <>
      {loading === "loading" && <Loading loading={true} />}
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
          padding: "2px 5rem 3px 5rem",
          backgroundColor: "#fff",
        }}
      >
        <Row>
          <Col>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label">Mã danh mục</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  disabled={true}
                  className="h-textbox"
                  name="enumerationID"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>

            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Loại doanh mục
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <Field
                  disable={initialValues?.enumerationID !== "" ? true : false}
                  isClearable={false}
                  name="enumerationType"
                  placeholder="Vui lòng chọn"
                  options={Options.OptionsCategory}
                  component={SelectField}
                />
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label">Key Enum</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  disabled={true}
                  className="h-textbox"
                  name="enumerationName"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label">Dịch Enum</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox h-lable-Obligatory"
                  name="enumerationTranslate"
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

CategoryAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  onSubmitFormAndCreate: PropTypes.func,
  onSubmitFormAndClose: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};
CategoryAddEdit.defaulProps = {
  onSubmitForm: null,
  onSubmitFormAndCreate: null,
  onSubmitFormAndClose: null,
};

export default CategoryAddEdit;
