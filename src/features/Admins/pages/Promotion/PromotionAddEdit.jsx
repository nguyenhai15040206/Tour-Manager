import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Col, FormGroup, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Index";
import validationSchema from "../../../../utils/ValidateShema";
import SelectField from "../../../../CustomFields/SelectField/Index";
import SupportSearchTour from "../../components/Customs/SupportSearchTour";
import { FaSearch } from "react-icons/fa";
import { Adm_GetTourList } from "../../Slices/SliceTour";
import { useDispatch } from "react-redux";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import { Adm_GetTravelTypeCbo } from "../../Slices/SliceTravelType";
import { NotificationManager } from "react-notifications";
import { useRef } from "react";
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};
function PromotionAddEdit(props) {
  // state in store

  const { tourList, loading } = useSelector((state) => state?.tour);
  const statePromotion = useSelector((state) => state.promotion);
  const { initialValues, onSubmitForm, onCheckedApplyAll, isChecked } = props;

  const {
    onChoseTourID,
    onSubmitSearchTour,
    isOpenSupportSearch,
    toggleSupport,
    onOpenSearchTour,
    tourListSupportSearch,
  } = props;

  const handleClickOnSubmit = async (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
    }
  };

  const handleClickCheckedApplyAll = (e) => {
    if (onCheckedApplyAll) {
      onCheckedApplyAll(e);
    }
  };

  const titlePopup =
    initialValues?.PromotionID === ""
      ? "Tạo mới  khuyến mãi"
      : "Cập nhât khuyến mãi";

  //===================

  //============
  const handleChoseTourSupport = (e) => {
    if (onChoseTourID) {
      onChoseTourID(e);
    }
  };

  const handleOpenSearchTour = (e) => {
    if (onOpenSearchTour) {
      onOpenSearchTour(e);
    }
  };

  const handleSubmitSearchTour = (e) => {
    if (onSubmitSearchTour) {
      onSubmitSearchTour(e);
    }
  };
  //
  return (
    <>
      {(statePromotion.loading === "loading" || loading === "loading") && (
        <Loading loading={true} />
      )}
      <ModalControl
        backdrop={"static"}
        toggle={props.toggle}
        showModal={props.showModal}
        className={props.className}
        initialValues={initialValues}
        validationSchema={validationSchema.PromotionManager}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmit}
        HandleClickSaveAndClosed={handleClickOnSubmit}
        titlePopup={titlePopup}
        style={{
          justifyContent: "start",
          padding: "2px 5rem 3px 15rem",
          backgroundColor: "#fff",
        }}
      >
        <Row>
          <Col>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label">Mã khuyến mãi</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  disabled={true}
                  className="h-textbox"
                  name="PromotionID"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Tên khuyến mãi
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="PromotionName"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Ngày bắt đầu
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="DateStart"
                  type="date"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Ngày kết thúc
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  name="DateEnd"
                  type="date"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">Giảm giá %</label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <FastField
                  className="h-textbox"
                  placeholder="%"
                  name="Discount"
                  type="number"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup
              style={styles}
              className={isChecked === true ? "d-none" : ""}
            >
              <div style={{ width: "140px" }}>
                <label className="h-label h-lable-Obligatory">
                  Áp dụng cho
                </label>
              </div>
              <div style={{ width: "calc(100% - 160px" }}>
                <div style={styles}>
                  <div style={{ width: "calc(100% - 100px)" }}>
                    <Field
                      disable={initialValues?.PromotionID === "" ? false : true}
                      className="h-textbox"
                      isMulti={true}
                      placeholder="Chọn các tour được áp dụng"
                      name="TourList"
                      isLoading={loading === "loading" ? true : false}
                      options={tourList?.map((item) => {
                        return {
                          value: String(item?.tourId),
                          label:
                            String(item?.tourId).slice(0, 32) +
                            " -- " +
                            item?.tourName.slice(0, 22),
                        };
                      })}
                      component={SelectField}
                    ></Field>
                  </div>
                  <button
                    type="button"
                    disabled={initialValues?.PromotionID === "" ? false : true}
                    style={{
                      width: "100px",
                      maxHeight: "35px",
                      margin: "2.9px 0px 0px 3px",
                    }}
                    className="h-button"
                    onClick={handleOpenSearchTour}
                  >
                    <FaSearch color="rgb(180 173 30)" size={15} />
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "140px" }}></div>
              <div
                style={{
                  width: "calc(100% - 140px)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "stretch",
                }}
              >
                <FastField
                  disabled={initialValues?.PromotionID === "" ? false : true}
                  handleChange={(e) => {
                    handleClickCheckedApplyAll(e);
                  }}
                  className="h-checkbox"
                  name="IsAppyAll"
                  component={InputField}
                  type="checkbox"
                />
                <label className="h-label-checkbox">
                  Sử dụng cho tất cả tour
                </label>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </ModalControl>
      <SupportSearchTour
        gridRef={props.gridRef}
        onChoseTourID={handleChoseTourSupport}
        onSubmit={handleSubmitSearchTour}
        data={tourListSupportSearch}
        toggle={toggleSupport}
        isOpen={isOpenSupportSearch}
      />
    </>
  );
}

PromotionAddEdit.propTypes = {
  onSubmitForm: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  onchange: PropTypes.func,

  //
  onSubmitSearchTour: PropTypes.func,
  onChoseTourID: PropTypes.func,
  isOpenSupportSearch: PropTypes.bool,
  toggleSupport: PropTypes.func,
  onOpenSearchTour: PropTypes.func,
  tourListSupportSearch: PropTypes.array,
  onCheckedApplyAll: PropTypes.func,
  isChecked: PropTypes.bool,
};
PromotionAddEdit.defaulProps = {
  onSubmitForm: null,
  onchange: null,

  //===
  onSubmitSearchTour: null,
  onOpenSearchTour: null,
  onChoseTourID: null,
  isOpenSupportSearch: false,
  toggleSupport: null,
  tourListSupportSearch: null,
  onCheckedApplyAll: null,
  isChecked: false,
};

export default PromotionAddEdit;
