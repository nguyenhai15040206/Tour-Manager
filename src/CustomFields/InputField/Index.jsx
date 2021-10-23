import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { ErrorMessage } from "formik";
import "./styles.scss";

function InputField(props) {
  const { field, form, label, type, placeholder, className } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <>
      <FormGroup className={className}>
        {label && <Label for={name}>{label}</Label>}
        <Input
          id={name}
          {...field}
          type={type}
          placeholder={placeholder}
          invalid={showError}
        />
        <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>
    </>
  );
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  className: "",
};

export default InputField;
