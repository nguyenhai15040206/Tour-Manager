import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";
import { customStyles } from "../../utils/constant";
// import "react-select/dist/react-select.css";

function SelectField(props) {
  const {
    field,
    form,
    lable,
    placeholder,
    disable,
    options,
    isLoading,
    isMulti,
  } = props;
  const { name, value } = field;
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
      field.onChange(changeEvent);
    } else {
      const changeEvent = {
        target: {
          name: name,
          value: selectedOption,
        },
      };
      field.onChange(changeEvent);
    }
  };
  return (
    <FormGroup className="mt-1">
      {lable && <Label for="categoryId">Category</Label>}
      <Select
        id={name}
        {...field}
        isLoading={isLoading}
        isMulti={isMulti}
        styles={customStyles}
        value={selectedValuesChange}
        onChange={handleSelectedOptionChange}
        disable={disable}
        placeholder={placeholder}
        options={options}
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

  lable: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  options: PropTypes.array,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
};

SelectField.defaultProps = {
  lable: "",
  placeholder: "",
  disable: false,
  options: [],
  isLoading: false,
  isMulti: false,
};

export default SelectField;
