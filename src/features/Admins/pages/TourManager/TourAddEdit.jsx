import { FastField, Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ReactRating from "react-rating";
import { useSelector } from "react-redux";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import Loading from "../../../../components/Loading/Index";
import EditorField from "../../../../CustomFields/EditorField/Index";
import InputField from "../../../../CustomFields/InputField/Index";
import RadioField from "../../../../CustomFields/InputField/RadioField";
import SelectField from "../../../../CustomFields/SelectField/Index";
import TextAreaField from "../../../../CustomFields/TextareaField/Index";
import Options from "../../../../utils/Options";
import validationShema from "../../../../utils/ValidateShema";
import ModalControl from "../../components/Customs/ModalControl";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
};

function TourAddEdit(props) {
  // Begin props in component
  const {
    onGetTOuristByRegions,
    touristAttrByRegions,
    initialValues,
    validationSchema,
    onChangeRating,
    onSubmitForm,
    onChangeImage,
  } = props;
  // End
  // Begin get state in store
  const stateTourisAtt = useSelector((state) => state.touristAttraction);
  const stateAddress = useSelector((state) => state.address);
  const stateTour = useSelector((state) => state.tour);
  const stateUnitPrice = useSelector((state) => state.unitPrice);
  const stateTourDetails = useSelector((state) => state.tourDetails);
  const stateImagesUpload = useSelector((state) => state?.imagesUpload);
  //const stateEmployee = useSelector((state) => state.employee);
  // END

  // ========================

  // bắt sự kiện lấy được số sao của tour khi đánh giá
  const handleOnChangeRating = (e) => {
    if (onChangeRating) {
      onChangeRating(e);
    }
  };
  const handelClickOnSubmitForm = (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
    }
  };

  // Change Image
  const handleChangeImage = (event) => {
    if (onChangeImage) {
      onChangeImage(event);
    }
  };

  // call Api tourist attr by Regions
  const handleChangeRegions = (e) => {
    if (onGetTOuristByRegions) {
      onGetTOuristByRegions(e);
    }
  };
  //========================
  return (
    <>
      {(stateAddress.loading === "loading" ||
        stateImagesUpload.loading === "loading" ||
        stateTour.loading === "loading" ||
        stateUnitPrice.loading === "loading" ||
        stateTourisAtt.loading === "loading") && <Loading loading={true} />}
      <ModalControl
        backdrop={props.backdrop}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues}
        validationSchema={validationSchema}
        HandleClickSave={handelClickOnSubmitForm}
        HandleClickSaveAndCreated={handelClickOnSubmitForm}
        HandleClickSaveAndClosed={handelClickOnSubmitForm}
        titlePopup="Tạo mới tour du lịch"
      >
        <Row>
          {stateTourDetails.loading === "loading" && <Loading loading={true} />}
          <Col lg={12}>
            <FormGroup style={styles}>
              <div style={{ width: "153px" }}></div>
              <div style={{ width: "calc(100% - 153px)" }}>
                <ReactRating
                  onChange={handleOnChangeRating}
                  initialRating={props.rating}
                  emptySymbol={<AiOutlineStar size={20} />}
                  fullSymbol={<AiFillStar color="orange" size={20} />}
                />
              </div>
            </FormGroup>
            <Row>
              <Col xl={8} lg={12}>
                <Row>
                  <FormGroup style={styles}>
                    <div style={{ width: "153px" }}>
                      <label className="h-label">Mã tour</label>
                    </div>
                    <div style={{ width: "calc(100% - 153px)" }}>
                      <FastField
                        disabled={true}
                        className="h-textbox"
                        name="TourID"
                        type="text"
                        component={InputField}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup style={styles}>
                    <div style={{ width: "153px" }}>
                      <label className="h-label h-lable-Obligatory">
                        Tên tour
                      </label>
                    </div>
                    <div style={{ width: "calc(100% - 153px)" }}>
                      <FastField
                        className="h-textbox"
                        name="TourName"
                        component={InputField}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup style={styles}>
                    <div style={{ width: "153px" }}>
                      <label className="h-label h-lable-Obligatory">
                        Mô tả tour
                      </label>
                    </div>
                    <div style={{ width: "calc(100% - 153px)" }}>
                      <FastField
                        // marginLeft="3px"
                        name="Description"
                        className="h-textbox"
                        component={TextAreaField}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup style={styles}>
                    <div style={{ width: "153px" }}>
                      <label className="h-label h-lable-Obligatory">Ảnh </label>
                    </div>
                    <div style={{ width: "calc(100% - 153px)" }}>
                      <FastField
                        type="file"
                        // multiple="multiple"
                        handleChange={handleChangeImage}
                        accept="image/*"
                        name="TourImg"
                        className="h-textbox form-control"
                        component={InputField}
                      />
                    </div>
                  </FormGroup>
                </Row>
                <Row>
                  <Col xl={12} lg={12}>
                    <FormGroup style={styles}>
                      <div style={{ width: "153px" }}>
                        <label className="h-label h-lable-Obligatory">
                          Địa điểm Xuất phát
                        </label>
                      </div>
                      <div
                        style={{
                          width: "calc(100% - 153px)",
                        }}
                      >
                        <Field
                          className="h-textbox"
                          isLoading={
                            stateAddress?.loading === "loaded" ? false : true
                          }
                          placeholder="Chọn tỉnh/thành phố"
                          name="DeparturePlace"
                          options={stateAddress.data}
                          component={SelectField}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup style={styles}>
                      <div style={{ width: "153px" }}>
                        <label className="h-label h-lable-Obligatory">
                          Vùng miền
                        </label>
                      </div>
                      <div style={{ width: "calc(100% - 153px)" }}>
                        <FastField
                          handleChange={(e) => {
                            handleChangeRegions(e);
                          }}
                          className="h-textbox"
                          placeholder="Chọn Vùng miền"
                          name="Regions"
                          options={Options.optionsRegions}
                          component={SelectField}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xl={4} lg={12}>
                <Card style={{ height: "219px", marginTop: "2px" }} inverse>
                  <CardImg
                    style={{ height: "218px", objectFit: "cover" }}
                    alt="Image Tour"
                    src={`${props.imageDefault}`}
                  />
                </Card>
                {/* <img
                  style={{ width: "100px" }}
                  src="https://benthanhtourist.com/uploads/images/sa-pa/silk-path-grand-sapa/60f6af2eb4a6b.jpg"
                  alt=""
                /> */}
              </Col>
            </Row>
            <FormGroup style={styles}>
              <div style={{ width: "153px" }}>
                <label className="h-label h-lable-Obligatory">
                  Địa điểm du lịch
                </label>
              </div>
              <div style={{ width: "calc(100% - 153px)" }}>
                <Field
                  isMulti={true}
                  className="h-textbox"
                  isLoading={stateTourisAtt.loading === "loaded" ? false : true}
                  placeholder="Chọn địa điểm du lịch"
                  name="TouristAttaction"
                  options={touristAttrByRegions}
                  component={SelectField}
                />
              </div>
            </FormGroup>

            <Row>
              <Col lg={6} xl={4}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Ngày bắt đầu
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <FastField
                      type="date"
                      name="DateStart"
                      className="h-textbox"
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col lg={6} xl={4}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Ngày kết thúc
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <FastField
                      type="date"
                      name="DateEnd"
                      className="h-textbox"
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col lg={6} xl={4}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Phương tiện x/phát
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <div style={styles}>
                      <FormGroup
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <FastField
                          styles={{ width: "15px", height: "15px" }}
                          name="Transport"
                          id="Máy bay"
                          defaultChecked={"Máy bay"}
                          className="h-textbox"
                          component={RadioField}
                        />
                        <label
                          htmlFor="Máy bay"
                          className="pt-2 h-label-checkbox"
                        >
                          Máy bay
                        </label>
                      </FormGroup>
                      <FormGroup
                        style={{
                          marginLeft: "2px",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <FastField
                          styles={{ width: "15px", height: "15px" }}
                          id="Xe khách"
                          name="Transport"
                          className="h-textbox"
                          component={RadioField}
                        />
                        <label
                          htmlFor="Xe khách"
                          className="pt-2 h-label-checkbox"
                        >
                          Xe khách
                        </label>
                      </FormGroup>
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col xl={4} lg={6}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Số lượng tối đa
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <FastField
                      type="number"
                      name="QuanityMax"
                      className="h-textbox"
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col xl={4} lg={6}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Số lượng tối thiểu
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <FastField
                      type="number"
                      name="QuanityMin"
                      className="h-textbox"
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col xl={4} lg={6} style={{ display: "block" }}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label">Số lượng hiện tại</label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <FastField
                      disabled={true}
                      type="number"
                      name="CurrentQuanity"
                      className="h-textbox"
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col xl={4} lg={6}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Đơn giá người lớn
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <FastField
                      type="text"
                      name="AdultUnitPrice"
                      className="h-textbox"
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col xl={4} lg={6}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Đơn giá trẻ em
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <FastField
                      type="text"
                      name="ChildrenUnitPrice"
                      className="h-textbox"
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col xl={4} lg={6} style={{ display: "block" }}>
                <FormGroup style={styles}>
                  <div style={{ width: "153px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Đơn giá trẻ nhỏ
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 153px)" }}>
                    <FastField
                      type="text"
                      name="BabyUnitPrice"
                      className="h-textbox"
                      component={InputField}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup style={styles}>
              <div style={{ width: "153px" }}>
                <label className="h-label h-lable-Obligatory">
                  Lịch trình tour
                </label>
              </div>
              <div style={{ width: "calc(100% - 153px)" }}>
                <FastField
                  className="h-editor form-control"
                  name="Schedule"
                  component={EditorField}
                  placeholder="Vui lòng nhập lịch trình và format theo đúng quy định!"
                />
              </div>
            </FormGroup>
            <FormGroup style={{ marginTop: "2px", ...styles }}>
              <div style={{ width: "153px" }}></div>
              <div style={{ width: "calc(100% - 153px)" }}></div>
            </FormGroup>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

TourAddEdit.propTypes = {
  validationSchema: PropTypes.object,
  onGetTOuristByRegions: PropTypes.func,
  touristAttrByRegions: PropTypes.array,
  initialValues: PropTypes.object.isRequired,
  onChangeRating: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onChangeImage: PropTypes.func,
};

TourAddEdit.defaultProps = {
  onGetTOuristByRegions: null,
  touristAttrByRegions: [],
  onChangeRating: null,
  onSubmitForm: null,
  onChangeImage: null,
};

export default TourAddEdit;
