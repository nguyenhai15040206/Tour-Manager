import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import {
  MdOutlineCancelPresentation,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { useSelector } from "react-redux";
import SelectField from "../../../../CustomFields/SelectField/Index";
import * as yup from "yup";

//==
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};

const initialValues = {
  DateStartClone: "",
  DateEndClone: "",
  SuggestClone: false,
  DeparturePlaceFromClone: false,
};

const validattionSchema = yup.object().shape({
  DeparturePlaceFromClone: yup
    .string()
    .trim()
    .required("[Địa điểm xuất phát] không thể bỏ trống!"),
  DateStartClone: yup
    .date()
    .min(new Date(), "[Ngày bắt đầu] không hợp lệ!")
    .required("[Ngày bắt đầu] không được trống!"),
  DateEndClone: yup
    .date()
    .when("DateStartClone", (enteredDate, schema) => {
      if (enteredDate) {
        // This can be calculated in many ways. Just be sure that its type is `Date` object
        const dayAfter = new Date(enteredDate.getTime() + 86400000);
        return schema.min(dayAfter, "[Ngày kết thúc] không hợp lệ!");
      }
      return schema;
    })
    .required("[Ngày kết thúc] không được trống!"),
});
function InsertTourAvailable(props) {
  const { showModal, toggle, onSubmit } = props;
  const stateAddress = useSelector((state) => state.address);

  const handleOnSubmit = (e) => {
    if (onSubmit) {
      onSubmit(e);
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
        isOpen={showModal}
        className="modal-md"
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
          Nhập thông tin nhân bản
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            validationSchema={validattionSchema}
          >
            {(formikProps) => {
              return (
                <Form>
                  <Row>
                    <Col>
                      <FormGroup style={styles}>
                        <div style={{ width: "135px" }}>
                          <label className="h-label  h-lable-Obligatory">
                            Ngày bắt đầu
                          </label>
                        </div>
                        <div style={{ width: "calc(100% - 135px" }}>
                          <FastField
                            className="h-textbox"
                            name="DateStartClone"
                            type="date"
                            component={InputField}
                          ></FastField>
                        </div>
                      </FormGroup>
                      <FormGroup style={styles}>
                        <div style={{ width: "135px" }}>
                          <label className="h-label  h-lable-Obligatory">
                            Ngày kết thúc
                          </label>
                        </div>
                        <div style={{ width: "calc(100% - 135px" }}>
                          <FastField
                            className="h-textbox"
                            name="DateEndClone"
                            type="date"
                            component={InputField}
                          ></FastField>
                        </div>
                      </FormGroup>
                      <FormGroup style={styles}>
                        <div style={{ width: "135px" }}>
                          <label className="h-label h-lable-Obligatory">
                            Điểm khởi hành
                          </label>
                        </div>
                        <div
                          style={{
                            width: "calc(100% - 135px)",
                          }}
                        >
                          <Field
                            isClearable={false}
                            className="h-textbox"
                            isLoading={
                              stateAddress?.loading === "loaded" ? false : true
                            }
                            placeholder="Chọn tỉnh/thành phố"
                            name="DeparturePlaceFromClone"
                            options={stateAddress.data}
                            component={SelectField}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup style={styles}>
                        <div style={{ width: "135px" }}></div>
                        <div
                          style={{
                            width: "calc(100% - 135px)",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "stretch",
                          }}
                        >
                          <FastField
                            className="h-checkbox"
                            name="SuggestClone"
                            component={InputField}
                            type="checkbox"
                          />
                          <label className="h-label-checkbox">
                            Tour được Mytour đề xuất?
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* Event */}
                  <ModalFooter
                    style={{
                      justifyContent: "start",
                      padding: "3px 1rem 0px 13.5rem",
                      backgroundColor: "#fff",
                      marginTop: "10px",
                    }}
                  >
                    <button className="h-button" type="submit">
                      <MdOutlineLibraryBooks size={20} color="#228B22" />
                      Nhân bản
                    </button>
                    <button
                      type="button"
                      onClick={toggle}
                      className="h-button"
                      style={{ marginLeft: "6px" }}
                    >
                      <MdOutlineCancelPresentation size={20} color="red" />
                      Hủy bỏ
                    </button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
}

InsertTourAvailable.propTypes = {
  onSubmit: PropTypes.func,
};
InsertTourAvailable.defaultProps = {
  onSubmit: null,
};

export default InsertTourAvailable;
