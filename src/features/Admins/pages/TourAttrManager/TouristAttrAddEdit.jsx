import React from "react";
import PropTypes from "prop-types";
import ModalControl from "./../../components/Customs/ModalControl";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import { FastField, Field } from "formik";
import InputField from "./../../../../CustomFields/InputField/Index";
import SelectField from "./../../../../CustomFields/SelectField/Index";
import { useSelector } from "react-redux";
import TextAreaField from "./../../../../CustomFields/TextareaField/Index";
import Loading from "./../../../../components/Loading/Index";

function TouristAttrAddEdit(props) {
  const {
    initialValues,
    onSubmitForm,
    onSubmitFormAndCreate,
    onSubmitFormAndClose,
    onChangeImages,
    imagesList,
  } = props;

  const stateProvince = useSelector((state) => state.address);
  const stateTouristAttr = useSelector((state) => state.touristAttraction);
  const stateimagesUpload = useSelector((state) => state.imagesUpload);

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };

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

  const renderImages = (source) => {
    return source.map((item, index) => {
      return (
        <Col xl={4} lg={6} className="mt-1" key={index}>
          <Card style={{ height: "130px" }} inverse>
            <CardImg
              src={item}
              style={{ height: "128px", objectFit: "cover" }}
              alt="image"
            ></CardImg>
          </Card>
        </Col>
      );
    });
  };

  return (
    <>
      {(stateTouristAttr.loading === "loading" ||
        stateimagesUpload.loading === "loading" ||
        stateProvince.loading === "loading") && <Loading loading={true} />}
      <ModalControl
        tableName="TableTouristAttraction"
        initialValues={initialValues}
        validationSchema={props.validationSchema}
        backdrop={"static"}
        style={{
          justifyContent: "start",
          padding: "2px 5rem 3px 16rem",
          backgroundColor: "#fff",
        }}
        toggle={props.toggle}
        className={props.className}
        showModal={props.showModal}
        /////
        titlePopup="Thêm mới một địa điểm"
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmitAndCreate}
        HandleClickSaveAndClosed={handleClickOnSubmitAndClose}
      >
        <Row>
          <FormGroup style={styles}>
            <div style={{ width: "150px" }}>
              <label className="h-label h-lable-Obligatory">Mã địa điểm</label>
            </div>
            <div style={{ width: "calc(100% - 150px" }}>
              <FastField
                className="h-textbox"
                name="TouristAttrID"
                disabled={true}
                component={InputField}
              />
            </div>
          </FormGroup>
          <FormGroup style={styles}>
            <div style={{ width: "150px" }}>
              <label className="h-label h-lable-Obligatory">
                Tên tỉnh thành
              </label>
            </div>
            <div style={{ width: "calc(100% - 150px" }}>
              <Field
                className="h-textbox"
                component={SelectField}
                name="ProvinceID"
                isLoading={stateProvince.loading === "loaded" ? false : true}
                options={stateProvince.data}
              />
            </div>
          </FormGroup>
          <FormGroup style={styles}>
            <div style={{ width: "150px" }}>
              <label className="h-label h-lable-Obligatory">Tên địa điểm</label>
            </div>
            <div style={{ width: "calc(100% - 150px" }}>
              <FastField
                className="h-textbox"
                component={InputField}
                name="TouristAttrName"
              />
            </div>
          </FormGroup>

          <FormGroup style={styles}>
            <div style={{ width: "150px" }}>
              <label className="h-label">Mô tả chi tiết</label>
            </div>
            <div style={{ width: "calc(100% - 150px" }}>
              <FastField
                className="h-textbox"
                component={TextAreaField}
                name="Description"
                height="150px"
              />
            </div>
          </FormGroup>
          <FormGroup style={styles}>
            <div style={{ width: "150px" }}>
              <label className="h-label h-lable-Obligatory">Hình ảnh</label>
            </div>
            <div style={{ width: "calc(100% - 150px" }}>
              <FastField
                type="file"
                multiple={"multiple"}
                handleChange={handleClickChangeImages}
                accept="image/*"
                name="TouristAttrImages"
                className="h-textbox form-control"
                component={InputField}
              ></FastField>
            </div>
          </FormGroup>
          <Col>
            <Row
              className="mt-1"
              style={{
                justifyContent: "right",
              }}
            >
              {renderImages(imagesList)}
            </Row>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

TouristAttrAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  onSubmitFormAndCreate: PropTypes.func,
  onSubmitFormAndClose: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  onChangeImages: PropTypes.func,
  imagesList: PropTypes.array,
};
TouristAttrAddEdit.defaultProps = {
  onSubmitForm: null,
  onSubmitFormAndCreate: null,
  onSubmitFormAndClose: null,
  onChangeImages: null,
  imagesList: [],
};

export default TouristAttrAddEdit;
