import { unwrapResult } from "@reduxjs/toolkit";
import { FastField, Field } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { NotificationManager } from "react-notifications";
import ReactRating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardImg, Col, FormGroup, Row } from "reactstrap";
import * as yup from "yup";
import imageDefaultPNG from "../../../../assets/logo/imageDefault.png";
import Loading from "../../../../components/Loading/Index";
import EditorField from "../../../../CustomFields/EditorField/Index";
import InputField from "../../../../CustomFields/InputField/Index";
import RadioField from "../../../../CustomFields/InputField/RadioField";
import SelectField from "../../../../CustomFields/SelectField/Index";
import TextAreaField from "../../../../CustomFields/TextareaField/Index";
import Options from "../../../../utils/Options";
import ModalControl from "../../components/Customs/ModalControl";
import { Adm_InsertTour } from "../../Slices/SliceTour";
import { Adm_InsertTourDetails } from "../../Slices/SliceTourDetails";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
};

function TourAddEdit(props) {
  // Begin props in component
  const { onGetTOuristByRegions, touristAttrByRegions, initialValues } = props;
  // End
  // state in component
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);
  // end
  // Begin get state in store
  const stateTourisAtt = useSelector((state) => state.touristAttraction);
  const stateAddress = useSelector((state) => state.address);
  //const stateTour = useSelector((state) => state.tour);
  const stateTourDetails = useSelector((state) => state.tourDetails);
  //const stateEmployee = useSelector((state) => state.employee);
  // END

  //Begin useState react HOOK

  const [rating, setRating] = useState(3);
  //END

  //
  const dispatch = useDispatch();
  //const history = useHistory();

  // BEGIN Validate formik using yup
  const validationSchema = yup.object().shape({
    Schedule: yup.string().required("[Lịch trình] không được bỏ trống!"),
    PhuongTienXuatPhat: yup
      .string()
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
  const handleOnChangeRating = (rating) => {
    setRating(rating);
  };

  // Nguyễn Tấn Hải - bắt sự kiện submit form
  // Thêm mới dữ liệu TOur => call APi khi submit on success!
  const handleClickOnSumitForm = async (values) => {
    // thực hiện call dữ liệu
    const tour = {
      tourID: 0,
      tourName: values.TourName,
      description: values.Description,
      tourImg: values.TourImg,
      dateStart: values.DateStart,
      dateEnd: values.DateEnd,
      phuongTienXuatPhat: values.PhuongTienXuatPhat,
      quaniTyMax: values.QuanityMax,
      QuanityMin: values.QuanityMin,
      CurrentQuanity: values.CurrentQuanity,
      Schedule: values.Schedule,
      rating: rating,
      DeparturePlace: values.DeparturePlace,
      tourGuideID: null,
      empUpdate: 11,
      suggest: true,
      status: null,
    };
    try {
      if (values.TourID !== "" || values.TourID !== 0) {
        // edit here
        alert("Edit đê");
        return;
      } else {
        const action = await dispatch(Adm_InsertTour(tour));
        const unwrapRuslt = unwrapResult(action);
        const tourIDPayload = unwrapRuslt.tourId;
        if (tourIDPayload === undefined) {
          return NotificationManager.error(`Lỗi`, "Thêm thất bại!", 1500);
        }

        // insert tour => insert tourDetails => insert dong gia
        
        let arrTouristAttr = values.TouristAttaction;
        if (Array.isArray(arrTouristAttr)) {
          arrTouristAttr.map(async (item) => {
            const tourDetails = {
              tourID: tourIDPayload,
              touristAttrID: item.value,
              empIDInsert: 11,
              empIDUpdate: 11,
            };
            return await dispatch(Adm_InsertTourDetails(tourDetails));
          });
          return NotificationManager.success(
            "Success!",
            "Thêm thành công!",
            1500
          );
        }
      }
    } catch (err) {
      console.log(err);
      if ((err.status = 401)) {
        console.log(err.status);
        //history.push("/admin");
        //console.log("Vui lòng đăng nhập lại");
      }
      return NotificationManager.error(`${err.error}`, "Thêm thất bại!", 1500);
    }
    //
  };

  // Change Image
  const handleChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageDefault(URL.createObjectURL(event.target.files[0]));
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
        stateTourisAtt.loading === "loading") && <Loading loading={true} />}
      <ModalControl
        backdrop={props.backdrop}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues}
        //validationSchema={validationSchema}
        HandleClickSave={(values) => {
          handleClickOnSumitForm(values);
        }}
        HandleClickSaveAndCreated={(values) => {
          console.log(values);
          handleClickOnSumitForm(values);
        }}
        HandleClickSaveAndClosed={(values) => {
          handleClickOnSumitForm(values);
        }}
      >
        <Row>
          {stateTourDetails.loading === "loading" && <Loading loading={true} />}
          <Col lg={12}>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}></div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <ReactRating
                  onChange={(rating) => {
                    handleOnChangeRating(rating);
                  }}
                  initialRating={rating}
                  emptySymbol={<AiOutlineStar size={20} />}
                  fullSymbol={<AiFillStar color="orange" size={20} />}
                />
              </div>
            </FormGroup>
            <Row>
              <Col xl={8} lg={12}>
                <Row>
                  <Col xl={6} lg={6}>
                    <FormGroup style={styles}>
                      <div style={{ width: "150px" }}>
                        <label className="h-label">Mã tour</label>
                      </div>
                      <div style={{ width: "calc(100% - 150px)" }}>
                        <FastField
                          disabled={true}
                          className="h-textbox"
                          name="TourID"
                          type="number"
                          component={InputField}
                        />
                      </div>
                    </FormGroup>
                  </Col>
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
                        <FastField
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
                    src={imageDefault}
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
                          name="PhuongTienXuatPhat"
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
                          name="PhuongTienXuatPhat"
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
                      Đơn giá trẻ em
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
                    <label className="h-label h-lable-Obligatory">
                      Đơn giá trẻ nhỏ
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
                    <FastField
                      type="number"
                      name="CurrentQuanity"
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
                />
              </div>
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
};

TourAddEdit.defaultProps = {
  onGetTOuristByRegions: null,
  touristAttrByRegions: [],
};

export default TourAddEdit;
