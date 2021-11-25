import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import "./styles.scss";

function InputField(props) {
  const {
    field,
    form,
    handleChange,
    handleOnBlur,

    label,
    type,
    placeholder,
    className,
    disabled,
    styles,
    multiple,
    accept,
  } = props;
  const { name, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleOnBlurFormat = (e) => {
    if (handleOnBlur) {
      handleOnBlur(e);
    }
  };
  return (
    <>
      <FormGroup className="mt-1">
        {label && <Label for={name}>{label}</Label>}
        <Input
          disabled={disabled}
          style={styles}
          className={className}
          id={name}
          {...field}
          onBlur={(event) => {
            onBlur(event);
            handleOnBlurFormat(event);
          }}
          onChange={(e) => {
            onChange(e);
            if (type === "file") {
              handleChange(e);
            }
          }}
          type={type}
          placeholder={placeholder}
          invalid={showError}
          multiple={`${multiple}`}
          accept={`${accept}`}
        />
        <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>
    </>
  );
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  handleOnBlur: PropTypes.func,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  multiple: PropTypes.string,
  accept: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  className: "",
  styles: { width: "100%" },
  disabled: false,
  multiple: "",
  accept: "",
  handleChange: null,
  handleOnBlur: null,
};

export default InputField;
