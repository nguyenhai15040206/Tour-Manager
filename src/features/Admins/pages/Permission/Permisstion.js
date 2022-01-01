import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function Permisstion(props) {
  const { showModal, children, toggle, className, titlePopup } = props;
  return (
    <>
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
        <ModalBody>{children}</ModalBody>
      </Modal>
    </>
  );
}

Permisstion.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  titlePopup: PropTypes.string,
};
Permisstion.defaultProps = {
  showModal: false,
  toggle: null,
  className: "modal-xl",
  titlePopup: "Phân quyền người dùng vào nhóm",
};

export default Permisstion;
