import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ModalControl from "./../../components/Customs/ModalControl";
import { Col, FormGroup, Row } from "reactstrap";
import { FastField } from "formik";
import InputField from "./../../../../CustomFields/InputField/Index";
import SelectField from "./../../../../CustomFields/SelectField/Index";
import { useDispatch, useSelector } from "react-redux";
import { Adm_GetProvince } from "./../../Slices/SliceAddress";
import TextAreaField from "./../../../../CustomFields/TextareaField/Index";
import { Adm_CreateTourAttr } from "../../Slices/SliceTouristAttraction";
import { NotificationManager } from "react-notifications";
import * as yup from "yup";
import { Adm_GetTouristAttr } from "./../../Slices/SliceTouristAttraction";
import { unwrapResult } from "@reduxjs/toolkit";

function TouristAttrAddEdit(props) {
  const dispatch = useDispatch();
  const stateProvince = useSelector((state) => state.address);
  //console.log("data", stateProvince.data);
  const stateTouristAttr = useSelector((state) => state.touristAttraction);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(Adm_GetProvince());
      } catch {
        throw console.error();
      }
    };
    fetchApi();
  }, [dispatch]);

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };

  const initialValues = {
    //touristAttrId: "",
    touristAttrName: "",
    description: "",
    imagesList: "",
    provinceId: "",
  };

  const validationSchema = yup.object().shape({
    touristAttrName: yup
      .string()
      .trim()
      .required("[Tên địa điểm] không được để trống"),
  });

  const handleClickOnSubmit = async (value, type) => {
    try {
      const params = {};
      console.log(value);
      if (type === "SaveAndCreated") {
        alert("SaveAndCreate");
      }
      if (type === "SaveAndClosed") {
        alert("SaveAndClose");
      }
      const actionResult = await dispatch(Adm_CreateTourAttr(value));
      const currentEmp = unwrapResult(actionResult);
      await dispatch(Adm_GetTouristAttr(params));
      return NotificationManager.success("Success!", "Thêm thành công!", 1500);
    } catch {
      return NotificationManager.error("Error!", "Thêm thất bại!", 1500);
    }
  };

  return (
    <ModalControl
      initialValues={initialValues}
      validationSchema={validationSchema}
      backdrop={props.backdrop}
      toggle={props.toggle}
      className={props.className}
      showModal={props.showModal}
      HandleClickSave={(values) => {
        handleClickOnSubmit(values);
      }}
      HandleClickSaveAndCreated={(value) => {
        handleClickOnSubmit(value, "SaveAndCreated");
      }}
      HandleClickSaveAndClosed={(values) => {
        handleClickOnSubmit(values, "SaveAndClosed");
      }}
    >
      <Row>
        <Col lg={12}>
          <Row>
            <Col xl={4} lg={6}>
              <FormGroup row style={styles}>
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
          </Row>
          <Row>
            <Col>
              <FormGroup row style={styles}>
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
            </Col>
          </Row>
          <Row>
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
          </Row>
          <Row>
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
          <Row>
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
        </Col>
      </Row>
    </ModalControl>
  );
}

TouristAttrAddEdit.propTypes = {};

export default TouristAttrAddEdit;
