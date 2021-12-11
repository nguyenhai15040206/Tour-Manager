import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { IoMdSave } from "react-icons/io";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ModalControl(props) {
  const { showModal, children, toggle, className, titlePopup } = props;
  let submitAction = undefined;
  return (
    <Modal
      className={className}
      style={{ color: "#333" }}
      backdropTransition={{
        timeout: 300,
      }}
      modalTransition={{
        timeout: 400,
      }}
      centered={true}
      isOpen={showModal}
      toggle={toggle}
      backdrop={props.backdrop}
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
        {`${titlePopup}`}
      </ModalHeader>
      <Formik
        enableReinitialize={true}
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (submitAction === "Save") {
            props.HandleClickSave(values);
            return;
          }
          if (submitAction === "SaveAndCreated") {
            props.HandleClickSaveAndCreated(values);
            resetForm();
            return;
          }
          if (submitAction === "SaveAndClosed") {
            props.HandleClickSaveAndClosed(values);
            toggle();
            return;
          }
          submitAction = undefined;
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <ModalBody>{children}</ModalBody>
              <ModalFooter style={props.style}>
                <button
                  className="h-button"
                  type="button"
                  onClick={() => {
                    submitAction = "Save";
                    formikProps.submitForm();
                  }}
                >
                  <IoMdSave size={20} color="#3664a4" />
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    submitAction = "SaveAndCreated";
                    formikProps.submitForm();
                  }}
                  className="h-button"
                  style={{ marginLeft: "4px" }}
                >
                  <IoMdSave size={20} color="#3664a4" />
                  Lưu và tạo mới
                </button>
                <button
                  type="button"
                  onClick={() => {
                    submitAction = "SaveAndClosed";
                    formikProps.submitForm();
                  }}
                  className="h-button"
                  style={{ marginLeft: "4px" }}
                >
                  <IoMdSave size={20} color="#3664a4" />
                  Lưu và đóng
                </button>
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

ModalControl.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  titlePopup: PropTypes.string,
};

ModalControl.defaultProps = {
  showModal: false,
  toggle: null,
  className: "",
  titlePopup: "Tạo mới",
};

export default ModalControl;
