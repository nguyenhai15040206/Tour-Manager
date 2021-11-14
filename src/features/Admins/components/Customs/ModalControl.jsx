import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { IoMdSave } from "react-icons/io";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ModalControl(props) {
  const { showModal, children, toggle, className } = props;

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
        Tạo mới tour du lịch
      </ModalHeader>
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
      >
        {(formikProps) => {
          //console.log(formikProps.values);
          return (
            <Form>
              <ModalBody>{children}</ModalBody>
              <ModalFooter
                style={{
                  justifyContent: "start",
                  padding: "2px 20rem 3px 16rem",
                  backgroundColor: "#fff",
                }}
              >
                <button className="h-button" type="submit">
                  <IoMdSave size={20} color="#3664a4" />
                  Lưu
                </button>
                <button
                  type="button"
                  className="h-button"
                  style={{ marginLeft: "4px" }}
                >
                  <IoMdSave size={20} color="#3664a4" />
                  Lưu và tạo mới
                </button>
                <button
                  type="reset"
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
};

ModalControl.defaultProps = {
  showModal: false,
  toggle: null,
  className: "",
};

export default ModalControl;
