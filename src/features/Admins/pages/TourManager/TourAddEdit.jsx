import { FastField, Field } from "formik";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ReactRating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as yup from "yup";
import EditorField from "../../../../CustomFields/EditorField/Index";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import TextAreaField from "../../../../CustomFields/TextareaField/Index";
import ModalControl from "../../components/Customs/ModalControl";
import { NotificationManager } from "react-notifications";
import { Adm_GetTouristAttr } from "../../Slices/SliceTouristAttraction";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import RadioField from "../../../../CustomFields/InputField/RadioField";

const initialValues = {
  TourImg: "",
  TourID: "",
  TourName: "",
  Description: "",
  DateStart: "",
  DateEnd: "",
  PhuongTienXuatPhat: "",

  Schedule: "",
  QuanityMax: 10,
  QuanityMin: "",
  CurrentQuanity: "",
  DeparturePlace: null,
  TouristAttaction: [],
};
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
};

function TourAddEdit(props) {
  const stateTourisAtt = useSelector((state) => state?.touristAttraction);
  const stateAddress = useSelector((state) => state?.address);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const values = {};
        await dispatch(Adm_GetProvince());
        await dispatch(Adm_GetTouristAttr(values));
      } catch (err) {
        console.log(err);
        return NotificationManager.error(`${err}`, "Error", 1500);
      }
    };
    fetchApi();
  }, [dispatch]);
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

  const handleClickOnSumitForm = (values, type) => {
    // thực hiện call dữ liệu

    //
    if (type === "SaveAndCreated") {
      alert("OOOOOOOOOOOOOOOO");
    }
    if (type === "SaveAndClosed") {
    }
    console.log(values);
    const i = true;
    if (i) {
      return NotificationManager.success("Success!", "Thêm thành công!", 1500);
    } else {
      return NotificationManager.error("Error!", "Thêm thất bại!", 1500);
    }
  };

  return (
    <>
      {console.log(stateAddress.data)}
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
          handleClickOnSumitForm(values, "SaveAndCreated");
        }}
        HandleClickSaveAndClosed={(values) => {
          handleClickOnSumitForm(values, "SaveAndClosed");
        }}
      >
        <Row>
          <Col lg={12}>
            <FormGroup row style={styles}>
              <div style={{ width: "150px" }}></div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <ReactRating
                  initialRating={3}
                  emptySymbol={<AiOutlineStar size={20} />}
                  fullSymbol={<AiFillStar color="orange" size={20} />}
                />
              </div>
            </FormGroup>
            <Row>
              <Col xl={4} lg={6}>
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
            </Row>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">Tên tour</label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <FastField
                  className="h-textbox"
                  name="TourName"
                  component={InputField}
                />
              </div>
            </FormGroup>
            <FormGroup row style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">Mô tả tour</label>
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
            <Row>
              <Col xl={4} lg={6}>
                <FormGroup row style={styles}>
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Địa điểm Xuất phát
                    </label>
                  </div>
                  <div style={{ width: "calc(100% - 150px)" }}>
                    <FastField
                      className="h-textbox"
                      isLoading={
                        stateAddress?.loading === "loaded" ? false : true
                      }
                      placeholder="Vui lòng chọn"
                      name="DeparturePlace"
                      options={stateAddress.data.map((item) => {
                        return { value: item.value, label: item.label };
                      })}
                      component={SelectField}
                    />
                  </div>
                </FormGroup>
                <FormGroup style={styles} className="mt-1 mb-1">
                  <div style={{ width: "150px" }}>
                    <label className="h-label h-lable-Obligatory">
                      Phương tiện
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
              <Col xl={8} lg={6}></Col>
            </Row>

            <FormGroup row style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Địa điểm du lịch
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <FastField
                  isMulti={true}
                  className="h-textbox"
                  isLoading={
                    stateTourisAtt?.loading === "loaded" ? false : true
                  }
                  placeholder="Vui lòng chọn"
                  name="TouristAttaction"
                  options={stateTourisAtt.data.map((item) => {
                    return {
                      value: item.touristAttrId,
                      label: item.touristAttrName,
                    };
                  })}
                  component={SelectField}
                />
              </div>
            </FormGroup>
            <FormGroup row style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">Ảnh </label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <FastField
                  type="file"
                  // multiple="multiple"
                  accept="image/*"
                  name="TourImg"
                  className="h-textbox form-control"
                  component={InputField}
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
            </Row>
            <Row>
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

TourAddEdit.propTypes = {};

export default TourAddEdit;
