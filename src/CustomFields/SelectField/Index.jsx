import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import { FormGroup, Label } from "reactstrap";
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
  } = props;
  const { name, value, onChange } = field;
  const selectedValuesChange = options.find((option) => option.value === value);
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;
    if (!isMulti) {
      const changeEvent = {
        target: {
          name: name,
          value: selectedValue,
        },
      };
      onChange(changeEvent);
    } else {
      const changeEvent = {
        target: {
          name: name,
          value: selectedOption,
        },
      };
      onChange(changeEvent);
    }
  };

  const handleChangeClick = (e) => {
    if (handleChange) {
      handleChange(e);
    }
  };
  return (
    <FormGroup className="mt-1">
      <Select
        id={name}
        isClearable={true}
        {...field}
        options={options}
        isLoading={isLoading}
        isMulti={isMulti}
        styles={customStyles}
        value={selectedValuesChange}
        onChange={(e) => {
          handleSelectedOptionChange(e);
          handleChangeClick(e);
        }}
        disable={disable}
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
};

SelectField.defaultProps = {
  handleChange: null,
  placeholder: "",
  disable: false,
  options: [],
  isLoading: false,
  isMulti: false,
};

export default SelectField;
