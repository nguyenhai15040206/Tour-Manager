import { FastField, Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { Col, FormGroup, Modal, ModalHeader, Row } from "reactstrap";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { tableColumnsTourSupportSearch } from "../../../../utils/Columns";
import TableGridControl from "./TableGridControl";

const initialValuesSearch = {
  TourName: "",
  DateStart: "",
  DateEnd: "",
  Suggest: false,
  TravelTypeID: null,
  DeparturePlace: [],
};
function SupportSearchTour(props) {
  const { isOpen, toggle, data, onSubmit, onChoseTourID } = props;

  const stateAddress = useSelector((state) => state.address);
  const stateTravelType = useSelector((state) => state?.travelType);

  const handleOnSubmit = (e) => {
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const handleChoseTourID = (e) => {
    if (onChoseTourID) {
      onChoseTourID(e);
    }
  };
  return (
    <>
      <Modal
        backdropTransition={{
          timeout: 300,
        }}
        modalTransition={{
          timeout: 400,
        }}
        centered={true}
        isOpen={isOpen}
        className="modal-xl"
        backdrop={"static"}
        toggle={toggle}
      >
        <ModalHeader
          style={{
            color: "#43A1FC",
            fontSize: "16px",
            fontWeight: "600",
            padding: "5px 10px",
            backgroundColor: "#F8F8F8",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
          toggle={toggle}
        >
          Hổ trợ tìm kiếm
        </ModalHeader>
        <Formik initialValues={initialValuesSearch} onSubmit={handleOnSubmit}>
          {(formikProps) => {
            return (
              <Form>
                <Row className="pb-2">
                  <Col xl={6} lg={6}>
                    <FormGroup className="mt-1 row">
                      <label className="col-lg-3 h-label">Loại hình tour</label>
                      <div className="col-lg-8" style={{ marginRight: "4px" }}>
                        <Field
                          name="TravelTypeID"
                          isLoading={
                            stateTravelType?.loading === "loading"
                              ? true
                              : false
                          }
                          placeholder="Vui lòng chọn"
                          options={stateTravelType?.dataCbo}
                          component={SelectField}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup className="row">
                      <label className="col-lg-3 h-label">Điểm x/phát</label>
                      <div className="col-lg-8">
                        <Field
                          name="DeparturePlace"
                          isMulti={true}
                          isLoading={
                            stateAddress?.loading === "loading" ? true : false
                          }
                          placeholder="Vui lòng chọn"
                          options={stateAddress.data}
                          component={SelectField}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup className="row">
                      <label className="col-lg-3 h-label">Tên tour</label>
                      <div className="col-lg-8">
                        <FastField
                          className="h-textbox"
                          name="TourName"
                          component={InputField}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl={6} lg={6}>
                    <FormGroup className="row mt-1">
                      <label className="col-lg-3 h-label">Ngày bắt đầu</label>
                      <div className="col-lg-8">
                        <FastField
                          className="h-textbox"
                          name="DateStart"
                          component={InputField}
                          type="date"
                        />
                      </div>
                    </FormGroup>
                    <FormGroup className="row">
                      <label className="col-lg-3 h-label">Ngày kết thúc</label>
                      <div className="col-lg-8">
                        <FastField
                          className="h-textbox"
                          name="DateEnd"
                          component={InputField}
                          type="date"
                        />
                      </div>
                    </FormGroup>
                    <FormGroup className="row mt-1">
                      <label className="col-lg-3 h-label"></label>
                      <div
                        className="col-lg-8"
                        style={{
                          display: "flex",
                          WebkitJustifyContent: "flex-start",
                        }}
                      >
                        <FastField
                          className="h-checkbox"
                          name="Suggest"
                          component={InputField}
                          type="checkbox"
                        />
                        <label className="h-label-checkbox">
                          Mytour đề xuất
                        </label>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                {/* Start toolbar widget */}
                <Row>
                  <Col>
                    <div className="commandToolBarWidge">
                      <button
                        type="button"
                        onClick={handleChoseTourID}
                        className="h-button"
                      >
                        <IoMdAddCircle color="#2b6e44" size={15} /> Chọn Tour
                      </button>

                      <button
                        type="submit"
                        className="h-button"
                        style={{ marginLeft: "3px" }}
                      >
                        <FaSearch color="rgb(180 173 30)" size={15} /> Tìm kiếm
                      </button>
                    </div>
                  </Col>
                </Row>
                {/* End tool bar widget */}
              </Form>
            );
          }}
        </Formik>
        <Row>
          <Col>
            <TableGridControl
              tableHeight="450px"
              rowData={data}
              gridRef={props.gridRef}
              //
              tableColoumn={tableColumnsTourSupportSearch}
              //fieldValues="tourId"
              //onEditForm={handleEditTour}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}

SupportSearchTour.propTypes = {
  onSubmit: PropTypes.func,
  onChoseTourID: PropTypes.func,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  data: PropTypes.array,
};
SupportSearchTour.defaultProps = {
  onChoseTourID: false,
  isOpen: false,
  toggle: null,
  onSubmit: null,
  data: [],
};

export default SupportSearchTour;
