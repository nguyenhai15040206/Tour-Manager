import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback, FormGroup, Input } from "reactstrap";

function TextAreaField(props) {
  const { field, form, placeholder, className, width, marginLeft } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <>
      <FormGroup className="mt-1">
        <Input
          style={{ width: `${width}`, marginLeft: `${marginLeft}` }}
          className={className}
          id={name}
          {...field}
          type="textarea"
          placeholder={placeholder}
          invalid={showError}
        />
        <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>
    </>
  );
}

TextAreaField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  placeholder: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  marginLeft: PropTypes.string,
};

TextAreaField.defaultProps = {
  label: "",
  placeholder: "",
  className: "",
  width: "100%",
  marginLeft: "0",
};

export default TextAreaField;
