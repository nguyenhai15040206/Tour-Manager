import React from "react";
import PropTypes from "prop-types";
import { AiFillEdit } from "react-icons/ai";

function EditForm(props) {
  const { onClickEdit } = props;

  const handelClickEdit = (e) => {
    if (onClickEdit) {
      onClickEdit(e);
    }
  };
  return <AiFillEdit onClick={handelClickEdit} />;
}
EditForm.propTypes = {
  onClickEdit: PropTypes.func,
};

EditForm.defaultProps = {
  onClickEdit: null,
};

export default EditForm;
