import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import { FormGroup } from "reactstrap";
import { customStyles } from "../../utils/constant";
// import "react-select/dist/react-select.css";

function SelectField(props) {
  const {
    field,
    form,
    handleChange,
    placeholder,
    disable,
    options,
    isLoading,
    isMulti,
    isClearable,
  } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleSelectedOptionChange = (selectedOption) => {
    // console.log(selectedOption.value);
    form.setFieldValue(
      name,
      isMulti
        ? selectedOption.map((item) => item.value)
        : selectedOption === null
        ? ""
        : selectedOption.value
      //
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === value);
    } else {
      return isMulti ? [] : "";
    }
  };

  const handleChangeClick = (e) => {
    if (handleChange) {
      handleChange(e);
    }
  };
  const handleBlur = () => {
    form.setFieldTouched(name);
  };
  return (
    <FormGroup className="mt-1">
      {/* {console.log(field)} */}
      <Select
        id={name}
        isClearable={isClearable}
        {...field}
        closeMenuOnSelect={!isMulti}
        options={options}
        isLoading={isLoading}
        isMulti={isMulti}
        styles={customStyles}
        value={getValue() || ""}
        onChange={(e) => {
          handleSelectedOptionChange(e);
          handleChangeClick(e);
        }}
        onBlur={handleBlur}
        isDisabled={disable}
        placeholder={placeholder}
      ></Select>
      {showError && <div className="invalid-feedback">{errors[name]}</div>}
      {/* <span className={showError ? 'is-invalid' : ''}></span>
        <ErrorMessage name={name} component={FormFeedback} /> */}
    </FormGroup>
  );
}

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  handleChange: PropTypes.func,

  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  options: PropTypes.array,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
};

SelectField.defaultProps = {
  handleChange: null,

  placeholder: "",
  disable: false,
  options: [],
  isLoading: false,
  isMulti: false,
  isClearable: true,
};

export default SelectField;
