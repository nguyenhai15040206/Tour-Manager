import React, { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";
import ConfirmControl from "./ConfirmControl";
import { NotificationManager } from "react-notifications";
import PropTypes from "prop-types";

function ExportDataToExcel(props) {
  const { onExportData } = props;
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const handleClickExportData = (e) => {
    if (onExportData) {
      onExportData(e);
    }
  };

  const onConfrimExport = (apiData, fileName) => {
    if (apiData.length === 0) {
      return NotificationManager.warning(
        "Không có dữ liệu để kết xuất!",
        "Warning!!!",
        2500
      );
    }
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <ConfirmControl
        showModal={props.showModal}
        toggle={props.toggle}
        ExportExcel={`Bạn có chắc muốn xuất ${props.apiData.length} dòng dữ liệu?`}
        ConfirmDelete={(e) => {
          onConfrimExport(props.apiData, props.fileName);
        }}
      />
      <button
        type="button"
        className="h-button"
        onClick={(e) => {
          handleClickExportData(e);
          //exportToCSV(props.apiData, props.fileName, props.selected);
        }}
        style={{ marginLeft: "3px" }}
      >
        <RiFileExcel2Fill color="#2b6e44" size={15} /> Xuất Excel
      </button>
    </>
  );
}

ExportDataToExcel.propTypes = {
  onExportData: PropTypes.func,
};
ExportDataToExcel.defaultProps = {
  onExportData: null,
};

export default ExportDataToExcel;
