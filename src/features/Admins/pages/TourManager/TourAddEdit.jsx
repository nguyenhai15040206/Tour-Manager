import { FastField, Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ReactRating from "react-rating";
import { useSelector } from "react-redux";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import * as yup from "yup";
import Loading from "../../../../components/Loading/Index";
import EditorField from "../../../../CustomFields/EditorField/Index";
import InputField from "../../../../CustomFields/InputField/Index";
import RadioField from "../../../../CustomFields/InputField/RadioField";
import SelectField from "../../../../CustomFields/SelectField/Index";
import TextAreaField from "../../../../CustomFields/TextareaField/Index";
import Options from "../../../../utils/Options";
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

  // BEGIN Validate formik using yup
  const validationSchema = yup.object().shape({
    DeparturePlace: yup
      .string()
      .trim()
      .required("[Địa điểm xuất phát] không thể bỏ trống!"),
    Regions: yup.string().trim().required("Vui lòng chọn vùng miền!"),
    AdultUnitPrice: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    ChildrenUnitPrice: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .when(
        "AdultUnitPrice",
        (eventAdultUnitPrice, schema) =>
          eventAdultUnitPrice &&
          schema.max(eventAdultUnitPrice, "[Giá trẻ em] < [Giá người lớn]")
      )
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    BabyUnitPrice: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .when(
        "ChildrenUnitPrice",
        (eventChildrenUnitPrice, schema) =>
          eventChildrenUnitPrice &&
          schema.max(eventChildrenUnitPrice, "[Giá trẻ nhỏ] < [Giá trẻ em]")
      )
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    Schedule: yup
      .string()
      .required("[Lịch trình] không được bỏ trống!")
      .min(20, "[Lịch trình] không được bỏ trống!"),
    Transport: yup
      .string()
      .trim()
      .required("[Phương tiện] không được để trống"),
    TouristAttaction: yup
      .array()
      .min(1, "[Địa điểm du lịch] không được để trống!")
      .required("[Địa điểm du lịch] không được để trống!")
      .nullable(),
    TourName: yup.string().required("[Tên tour] không được để trống!"),
    Description: yup.string().required("[Mô tả] không được để trống"),
    TourImg: yup.string().required("[Ảnh tour] không được để trống!"),
    QuanityMax: yup
      .number()
      .min(10, "[Số lượng] phải lớn hơn 10!")
      .required("[Số lượng] không được để trống!"),
    QuanityMin: yup
      .number()
      .when(
        "QuanityMax",
        (eventQuanityMax, schema) =>
          eventQuanityMax &&
          schema.max(eventQuanityMax, "[Số lượng min] < [Số lượng max]")
      )
      .required("[Số lượng] không được để trống!"),
    DateStart: yup
      .date()
      .min(new Date(), "[Ngày bắt đầu] không hợp lệ!")
      .required("[Ngày bắt đầu] không được trống!"),
    DateEnd: yup
      .date()
      .when(
        "DateStart",
        (eventDateStart, schema) =>
          eventDateStart &&
          schema.min(eventDateStart, "[Ngày kết thúc] không hợp lệ!")
      )
      // .min(initialValues.DateStart, "[Ngày kết thúc] không hợp lệ!")
      .required("[Ngày kết thúc] không được trống!"),
  });
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
      >
        <Row>
          {stateTourDetails.loading === "loading" && <Loading loading={true} />}
          <Col lg={12}>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}></div>
              <div style={{ width: "calc(100% - 150px)" }}>
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
                    <div style={{ width: "150px" }}>
                      <label className="h-label">Mã tour</label>
                    </div>
                    <div style={{ width: "calc(100% - 150px)" }}>
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
                    <div style={{ width: "150px" }}>
                      <label className="h-label h-lable-Obligatory">
                        Tên tour
                      </label>
                    </div>
                    <div style={{ width: "calc(100% - 150px)" }}>
                      <FastField
                        className="h-textbox"
                        name="TourName"
                        component={InputField}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup style={styles}>
                    <div style={{ width: "150px" }}>
                      <label className="h-label h-lable-Obligatory">
                        Mô tả tour
                      </label>
                    </div>
                    <div style={{ width: "calc(100% - 150px)" }}>
                      <FastField
                        marginLeft="3px"
                        name="Description"
                        className="h-textbox"
                        component={TextAreaField}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup style={styles}>
                    <div style={{ width: "150px" }}>
                      <label className="h-label h-lable-Obligatory">Ảnh </label>
                    </div>
                    <div style={{ width: "calc(100% - 150px)" }}>
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
                      <div style={{ width: "150px" }}>
                        <label className="h-label h-lable-Obligatory">
                          Địa điểm Xuất phát
                        </label>
                      </div>
                      <div
                        style={{
                          width: "calc(100% - 150px)",
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
                      <div style={{ width: "150px" }}>
                        <label className="h-label h-lable-Obligatory">
                          Vùng miền
                        </label>
                      </div>
                      <div style={{ width: "calc(100% - 150px)" }}>
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
                <Card style={{ height: "219px" }} inverse>
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
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Địa điểm du lịch
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Ngày bắt đầu
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Ngày kết thúc
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Phương tiện x/phát
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Số lượng tối đa
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Số lượng tối thiểu
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label">Số lượng hiện tại</label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Đơn giá người lớn
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Đơn giá trẻ em
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Đơn giá trẻ nhỏ
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
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
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Lịch trình tour
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px)", marginLeft: "3px" }}>
                <FastField
                  className="h-editor form-control"
                  name="Schedule"
                  component={EditorField}
                  placeholder="Vui lòng nhập lịch trình và format theo đúng quy định!"
                />
              </div>
            </FormGroup>
            <FormGroup style={{ marginTop: "2px", ...styles }}>
              <div style={{ width: "150px" }}></div>
              <div style={{ width: "calc(100% - 150px)" }}></div>
            </FormGroup>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

TourAddEdit.propTypes = {
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
