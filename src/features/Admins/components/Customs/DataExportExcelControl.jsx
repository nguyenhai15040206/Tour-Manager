import React from "react";
import PropTypes from "prop-types";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

DataExportExcelControl.propTypes = {
  columnsExport: PropTypes.array,
  onClick: PropTypes.func,
};
DataExportExcelControl.defaultProps = {
  columnsExport: [],
  onClick: null,
};

function DataExportExcelControl(props) {
  const { columnsExport, DataExport, onClick } = props;

  //
  //
  const DataSet = [
    {
      columns: columnsExport,

      data: props.DataExport.map((data) => {
        return [
          { value: data.empId },
          { value: data.empName },
          { value: data.gender },
          { value: data.dateOfBirth },
          { value: data.workingDate },
          { value: data.phoneNumber },
          { value: data.email },
          { value: data.dateUpdate },
        ];
      }),
    },
  ];
  console.log("column", columnsExport);
  console.log("dataExport", DataExport);
  return (
    <div>
      <ExcelFile element={props.button}>
        <ExcelSheet dataSet={DataSet} name="Covid-19 Country Report" />
      </ExcelFile>
    </div>
  );
}

export default DataExportExcelControl;
