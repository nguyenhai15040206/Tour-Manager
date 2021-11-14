import React from "react";
import PropTypes from "prop-types";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

function TableGridControl(props) {
  const {
    tableHeight,
    tableWidth,
    tableColoumn,

    gridRef,
    onGridReady,
    rowData,
  } = props;
  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{ height: `${tableHeight}`, width: `${tableWidth}` }}
      >
        <AgGridReact
          ref={gridRef}
          paginationPageSize={20}
          pagination={true}
          onGridReady={onGridReady}
          rowSelection="multiple"
          defaultColDef={{
            flex: 1,
            resizable: true,
            minWidth: 200,
          }}
          maxBlocksInCache={1}
          rowData={rowData}
          sideBar={true}
          animateRows={true}
          cacheBlockSize={100}
          maxConcurrentDatasourceRequests={1}
          rowHeight={35}
          resizable={true}
        >
          {tableColoumn.map((item, index) => (
            <AgGridColumn
              key={index}
              headerName={item?.headerName}
              field={item?.field}
              sortable={item?.sortTable}
              unSortIcon={item?.unSortIcon}
              filter={item?.filter}
              checkboxSelection={item?.checkboxSelection}
              headerCheckboxSelection={item?.headerCheckboxSelection}
              minWidth={item?.minWidth}
              filterParams={item?.filterParams}
            ></AgGridColumn>
          ))}
        </AgGridReact>
      </div>
    </>
  );
}

TableGridControl.propTypes = {
  // set width height table
  tableWidth: PropTypes.string,
  tableHeight: PropTypes.string,
  // phân trang
  paginationPageSize: PropTypes.number,
  // chọn checkbox
  gridRef: PropTypes.object.isRequired,
  onGridReady: PropTypes.func,
  rowData: PropTypes.array,
  // số coloumn
  tableColoumn: PropTypes.array,
};
TableGridControl.defaultProps = {
  tableWidth: "100%",
  tableHeight: "600px",

  paginationPageSize: 20,
  onGridReady: null,
  rowData: null,

  tableColoumn: [],
};

export default TableGridControl;
