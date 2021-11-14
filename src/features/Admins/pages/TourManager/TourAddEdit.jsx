import { FastField } from "formik";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ReactRating from "react-rating";
import { Col, FormGroup, Row } from "reactstrap";
import * as yup from "yup";
import EditorField from "../../../../CustomFields/EditorField/Index";
import InputField from "../../../../CustomFields/InputField/Index";
import TextAreaField from "../../../../CustomFields/TextareaField/Index";
import ModalControl from "../../components/Customs/ModalControl";
function TourAddEdit(props) {
  const styles = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
  };

  const initialValues = {
    TourImg: "",
    TourID: "",
    TourName: "",
    Description: "",
    DateStart: new Date(),
    DateEnd: "",
    //PhuongTienXuatPhat: false,
    Schedule: "",
    QuanityMax: 10,
    QuanityMin: "",
    CurrentQuanity: "",
  };

  const validationSchema = yup.object().shape({
    TourName: yup.string().required("[Tên tour] không được để trống!"),
    Description: yup.string().required("[Mô tả] không được để trống"),
    TourImg: yup.string().required("[Ảnh tour] không được để trống!"),
    QuanityMax: yup
      .number()
      .min(10, "[Số lượng] phải lớn hơn 10!")
      .required("[Số lượng] không được để trống!"),
    QuanityMin: yup
      .number()
      .max(
        parseInt(initialValues?.QuanityMax),
        "[Số lượng min] < [Số lượng max]"
      )
      .required("[Số lượng] không được để trống!"),
    DateStart: yup
      .date()
      .min(new Date(), "[Ngày bắt đầu] không hợp lệ!")
      .required("[Ngày bắt đầu] không được trống!"),
    DateEnd: yup
      .date()
      .min(initialValues.DateStart, "[Ngày kết thúc] không hợp lệ!")
      .required("[Ngày kết thúc] không được trống!"),
  });

  return (
    <ModalControl
      backdrop={props.backdrop}
      toggle={props.toggle}
      showModal={props.showModal}
      className={props.className}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {console.log(initialValues.QuanityMin)}
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

          {/* <FormGroup style={styles}>
                    <div style={{ width: "150px" }}>
                      <label className="h-label h-lable-Obligatory">
                        P/Tiện xuất phát
                      </label>
                    </div>
                    <div style={{ width: "calc(100% - 150px)" }}>
                      <FormGroup style={styles}>
                        <FastField
                          styles={{ width: "15px", height: "15px" }}
                          type="checkbox"
                          name="PhuongTienXuatPhat"
                          className="h-textbox"
                          component={InputField}
                        />
                        <label style={{ marginTop: "3px" }} className="h-label">
                          Máy bay (My tour đề xuất)
                        </label>
                      </FormGroup>
                    </div>
                  </FormGroup> */}
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
  );
}

TourAddEdit.propTypes = {};

export default TourAddEdit;
