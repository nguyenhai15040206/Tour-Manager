import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ModalControl from "./../../components/Customs/ModalControl";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import { FastField } from "formik";
import InputField from "./../../../../CustomFields/InputField/Index";
import SelectField from "./../../../../CustomFields/SelectField/Index";
import { useDispatch, useSelector } from "react-redux";
import TextAreaField from "./../../../../CustomFields/TextareaField/Index";
import * as yup from "yup";
import Loading from "./../../../../components/Loading/Index";

function TouristAttrAddEdit(props) {
  const { initialValues, onSubmitForm } = props;

  const stateProvince = useSelector((state) => state.address);
  const stateTouristAttr = useSelector((state) => state.touristAttraction);

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };

  const validationSchema = yup.object().shape({
    touristAttrName: yup
      .string()
      .trim()
      .required("[Tên địa điểm] không được để trống"),
  });

  const handleClickOnSubmit = async (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
    }
  };

  return (
    <>
      {stateTouristAttr.loading === "loading" && <Loading loading={true} />}
      <ModalControl
        initialValues={initialValues}
        //validationSchema={validationSchema}
        backdrop={"static"}
        toggle={props.toggle}
        className={props.className}
        showModal={props.showModal}
        /////
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmit}
        HandleClickSaveAndClosed={handleClickOnSubmit}
      >
        <Row>
          <Col lg={12} xl={8}>
            <Row>
              <Col xl={8} lg={12}>
                <FormGroup style={styles}>
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Mã địa điểm
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px" }}>
                    <FastField
                      className="h-textbox"
                      name="touristAttrId"
                      disabled={true}
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label h-lable-Obligatory">
                    Tên tỉnh thành
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <FastField
                    className="h-h-textbox"
                    component={SelectField}
                    isMulti={false}
                    name="provinceId"
                    isLoading={
                      stateProvince?.loading === "loaded" ? false : true
                    }
                    options={stateProvince.data.map((item) => {
                      return { value: item.value, label: item.label };
                    })}
                  />
                </div>
              </FormGroup>
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label h-lable-Obligatory">
                    Tên địa điểm
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <FastField
                    className="h-textbox"
                    component={InputField}
                    name="touristAttrName"
                  />
                </div>
              </FormGroup>

              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label">Hình ảnh</label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <FastField
                    type="file"
                    accept="image/*"
                    name="imageList"
                    className="h-textbox form-control"
                    component={InputField}
                  ></FastField>
                </div>
              </FormGroup>
            </Row>
          </Col>
          <Col xl={4} lg={12}>
            <Card style={{ height: "130px" }} inverse>
              <CardImg
                style={{ height: "128px", objectFit: "cover" }}
                alt="image"
              ></CardImg>
            </Card>
          </Col>

          <FormGroup style={styles}>
            <div style={{ width: "150px" }}>
              <label className="h-label">Mô tả chi tiết</label>
            </div>
            <div style={{ width: "calc(100% - 150px" }}>
              <FastField
                className="h-textbox"
                component={TextAreaField}
                name="description"
              />
            </div>
          </FormGroup>
        </Row>
      </ModalControl>
    </>
  );
}

TouristAttrAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};
TouristAttrAddEdit.defaultProps = {
  onSubmitForm: null,
};

export default TouristAttrAddEdit;
