import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";

function ExportDataToExcel(props) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <button
      type="button"
      className="h-button"
      onClick={(e) => {
        exportToCSV(props.apiData, props.fileName);
      }}
      style={{ marginLeft: "3px" }}
    >
      <RiFileExcel2Fill color="#2b6e44" size={15} /> Xuất Excel
    </button>
  );
}

ExportDataToExcel.propTypes = {};

export default ExportDataToExcel;
