import React from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import InputField from "../../../../CustomFields/InputField/Index";
import { FastField, Field } from "formik";
import SelectField from "../../../../CustomFields/SelectField/Index";
import EditorField from "../../../../CustomFields/EditorField/Index";
import TextAreaField from "../../../../CustomFields/TextareaField/Index";
import { useSelector } from "react-redux";
import * as yup from "yup";
import Loading from "../../../../components/Loading/Index";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};

const validationShemaInsert = yup.object().shape({
  NewsName: yup.string().trim().required("[Tên tin tức] không được để trống!"),
  NewsImg: yup.string().trim().required("[Ảnh] không được để trống!"),
  KindOfNewID: yup.string().trim().required("[Loại tin] không được để trống!"),
  Content: yup
    .string()
    .min(250, "[Nội dung] phải vượt hơn 250 kí tự!")
    .required("[Nội dung] phải vượt hơn 250 kí tự!"),
});
const validationShemaUpdate = yup.object().shape({
  NewsName: yup.string().trim().required("[Tên tin tức] không được để trống!"),
  KindOfNewID: yup.string().trim().required("[Loại tin] không được để trống!"),
  Content: yup
    .string()
    .min(250, "[Nội dung] phải vượt hơn 250 kí tự!")
    .required("[Nội dung] phải vượt hơn 250 kí tự!"),
});
function NewsAddEdit(props) {
  const {
    initialValues,
    onSubmitForm,
    onSubmitFormAndCreate,
    onSubmitFormAndClose,
    imageDefault,
    onChangeImages,
  } = props;

  const validattionShema =
    initialValues?.NewsID !== ""
      ? validationShemaUpdate
      : validationShemaInsert;
  const { dataCbo, loading } = useSelector((state) => state.enumConstant);
  const stateNews = useSelector((state) => state.news);

  const title =
    initialValues?.NewsID !== "" ? "Cập nhật tin tức" : "Thêm mới tin tức";

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

  return (
    <>
      {stateNews.loading === "loading" && <Loading loading={true} />}
      <ModalControl
        tableName="TableNews"
        initialValues={initialValues}
        validationSchema={validattionShema}
        backdrop={"static"}
        style={{
          justifyContent: "start",
          padding: "2px 5rem 3px 16rem",
          backgroundColor: "#fff",
        }}
        toggle={props.toggle}
        className="modal-xl"
        showModal={props.showModal}
        /////
        titlePopup={title}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmitAndCreate}
        HandleClickSaveAndClosed={handleClickOnSubmitAndClose}
      >
        <Row>
          <Col xl={8} lg={12}>
            <Row>
              <FormGroup style={styles}>
                <div style={{ width: "130px" }}>
                  <label className="h-label">Mã tin</label>
                </div>
                <div style={{ width: "calc(100% - 130px" }}>
                  <FastField
                    disabled={true}
                    className="h-textbox"
                    name="NewsID"
                    component={InputField}
                  ></FastField>
                </div>
              </FormGroup>
              <FormGroup style={styles}>
                <div style={{ width: "130px" }}>
                  <label className="h-label h-lable-Obligatory">
                    Loại tin tức
                  </label>
                </div>
                <div style={{ width: "calc(100% - 130px" }}>
                  <Field
                    className="h-textbox"
                    isLoading={loading === "loaded" ? false : true}
                    name="KindOfNewID"
                    placeholder="Chọn loại tin tức"
                    component={SelectField}
                    options={dataCbo}
                  ></Field>
                </div>
              </FormGroup>
              <FormGroup style={styles}>
                <div style={{ width: "130px" }}>
                  <label className="h-label h-lable-Obligatory">
                    Tên tin tức
                  </label>
                </div>
                <div style={{ width: "calc(100% - 130px" }}>
                  <FastField
                    className="h-textbox h-textarea"
                    name="NewsName"
                    component={TextAreaField}
                  ></FastField>
                </div>
              </FormGroup>
              <FormGroup style={styles}>
                <div style={{ width: "130px" }}>
                  <label className="h-label h-lable-Obligatory">Ảnh</label>
                </div>
                <div style={{ width: "calc(100% - 130px" }}>
                  <FastField
                    type="file"
                    accept="image/*"
                    name="NewsImg"
                    handleChange={handleClickChangeImages}
                    className="h-textbox form-control"
                    component={InputField}
                  ></FastField>
                </div>
              </FormGroup>
              <FormGroup style={styles} className="mt-1">
                <div style={{ width: "130px" }}></div>
                <div
                  style={{
                    width: "calc(100% - 130px)",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "stretch",
                  }}
                >
                  <FastField
                    className="h-checkbox"
                    name="Active"
                    component={InputField}
                    type="checkbox"
                  />
                  <label className="h-label-checkbox">
                    Kích hoạt tin tức này
                  </label>
                </div>
              </FormGroup>
            </Row>
          </Col>
          <Col xl={4} lg={12}>
            <Card style={{ height: "191px" }} inverse>
              <CardImg
                src={`${imageDefault}`}
                style={{ height: "190px", objectFit: "cover" }}
                alt="Images"
              ></CardImg>
            </Card>
          </Col>
        </Row>
        <Row>
          <FormGroup style={{ marginTop: "2px", ...styles }}>
            <div style={{ width: "133px" }}>
              <label className="h-label h-lable-Obligatory">Nội dung</label>
            </div>
            <div style={{ width: "calc(100% - 133px)" }}>
              <FastField
                className="h-news form-control"
                name="Content"
                component={EditorField}
                placeholder="Vui lòng nhập nội dung hơn 250 kí tự và format theo đúng quy định!"
              />
            </div>
          </FormGroup>
        </Row>
      </ModalControl>
    </>
  );
}

NewsAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  onSubmitFormAndCreate: PropTypes.func,
  onSubmitFormAndClose: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  imageDefault: PropTypes.string,
  onChangeImages: PropTypes.func,
};
NewsAddEdit.defaultProps = {
  onSubmitForm: null,
  onSubmitFormAndCreate: null,
  onSubmitFormAndClose: null,
  onChangeImages: null,

  imageDefault: "",
};

export default NewsAddEdit;
