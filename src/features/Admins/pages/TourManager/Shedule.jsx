import React from "react";
import PropTypes from "prop-types";
import { FastField, Field } from "formik";
import { FormGroup } from "reactstrap";
import EditorField from "../../../../CustomFields/EditorField/Index";
import InputField from "../../../../CustomFields/InputField/Index";
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
};

function Shedule(props) {
  const { name, title, day } = props;
  return (
    <FormGroup style={{ marginTop: "2px", ...styles }}>
      <div style={{ width: "153px" }}>
        <label className="h-label h-lable-Obligatory">
          Lịch trình ngày {`${day}`}
        </label>
      </div>
      <div style={{ width: "calc(100% - 153px)" }}>
        <FastField
          className="h-textbox"
          name={`${title}`}
          component={InputField}
          placeholder={`Nhập tiêu để lịch trình ngày ${day}`}
        ></FastField>
        <Field
          className="h-editor form-control"
          name={`${name}`}
          component={EditorField}
          placeholder={`Vui lòng nhập nội dung lịch trình ngày ${day} và format theo đúng quy định!`}
        />
      </div>
    </FormGroup>
  );
}

Shedule.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  day: PropTypes.number,
};

Shedule.defaultProps = {
  name: "Schedule",
  title: "title",
  day: 1,
};

export default Shedule;
