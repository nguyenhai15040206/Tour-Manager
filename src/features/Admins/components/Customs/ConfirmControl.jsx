import React from "react";
import PropTypes from "prop-types";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ConfirmControl(props) {
  const { showModal, toggle, ConfirmDelete } = props;
  return (
    <>
      <Modal
        style={{ color: "#333", marginTop: "150px" }}
        className="modal-sm"
        backdropTransition={{
          timeout: 300,
        }}
        modalTransition={{
          timeout: 400,
        }}
        backdrop="static"
        isOpen={showModal}
      >
        <ModalHeader
          style={{
            color: "#43A1FC",
            fontSize: "13px",
            fontWeight: "600",
            padding: "5px 10px",
            backgroundColor: "#F8F8F8",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          Thông báo
        </ModalHeader>
        <ModalBody style={{ fontSize: "12px", fontWeight: "400" }}>
          <div className="h-warning"></div>
          <div style={{ display: "inline-block", marginLeft: "45px" }}>
            {`Bạn có chắc muốn xóa ${1} dòng dữ liệu?`}
          </div>
        </ModalBody>
        <ModalFooter
          style={{
            marginTop: "5px",
            borderTop: "none",
            justifyContent: "center",
            padding: "2px 2px",
            backgroundColor: "#fff",
          }}
        >
          <button
            style={{ marginRight: "5px", width: "100px" }}
            onClick={ConfirmDelete}
            className="h-button"
            type="button"
          >
            {/* <IoMdSave size={20} color="#3664a4" /> */}
            OK
          </button>
          <button
            style={{ marginRight: "5px", width: "100px" }}
            onClick={toggle}
            className="h-button"
            type="button"
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

ConfirmControl.propTypes = {
  toggle: PropTypes.func,
  showModal: PropTypes.bool,
  ConfirmDelete: PropTypes.func,
};

ConfirmControl.defaultProps = {
  toggle: null,
  showModal: false,
  ConfirmDelete: null,
};

export default ConfirmControl;
