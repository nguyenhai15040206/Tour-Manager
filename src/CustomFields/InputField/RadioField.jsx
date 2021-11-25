import PropTypes from "prop-types";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import "./styles.scss";

function RadioField(props) {
  const {
    field,
    form,
    label,
    type,
    className,
    disabled,
    styles,
    id,
    defaultChecked,
  } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <>
      <FormGroup className="mt-1">
        {label && <Label for={name}>{label}</Label>}
        <Input
          disabled={disabled}
          style={styles}
          className={className}
          name={name}
          id={id}
          value={id}
          checked={`${defaultChecked}` === id}
          onChange={onChange}
          onBlur={onBlur}
          checked={id === value}
          type={type}
          invalid={showError}
        />
        {showError && <div className="invalid-feedback"></div>}
        {/* <ErrorMessage name={name} component={FormFeedback} /> */}
      </FormGroup>
    </>
  );
}

RadioField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  defaultChecked: PropTypes.string,
};

RadioField.defaultProps = {
  id: "",
  type: "radio",
  label: "",
  className: "",
  styles: { width: "100%" },
  disabled: false,
  defaultChecked: "Máy bay",
};

export default RadioField;
