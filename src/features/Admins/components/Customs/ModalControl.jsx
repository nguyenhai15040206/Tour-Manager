import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { IoMdSave } from "react-icons/io";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ModalControl(props) {
  const { showModal, children, toggle, className, titlePopup, tableName } =
    props;
  let submitAction = undefined;
  return (
    <Modal
      id={`${tableName}`}
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
        onSubmit={async (values) => {
          if (submitAction === "Save") {
            await props.HandleClickSave(values);
            return;
          }
          if (submitAction === "SaveAndCreated") {
            await props.HandleClickSaveAndCreated(values);
            return;
          }
          if (submitAction === "SaveAndClosed") {
            await props.HandleClickSaveAndClosed(values);
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
                  onClick={async () => {
                    submitAction = "Save";
                    await formikProps.submitForm();
                  }}
                >
                  <IoMdSave size={20} color="#3664a4" />
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    submitAction = "SaveAndCreated";
                    await formikProps.submitForm();
                  }}
                  className="h-button"
                  style={{ marginLeft: "4px" }}
                >
                  <IoMdSave size={20} color="#3664a4" />
                  Lưu và tạo mới
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    submitAction = "SaveAndClosed";
                    await formikProps.submitForm();
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
  tableName: PropTypes.string,
};

ModalControl.defaultProps = {
  showModal: false,
  tableName: "",
  toggle: null,
  className: "",
  titlePopup: "Tạo mới",
};

export default ModalControl;
