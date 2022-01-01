import React from "react";
import PropTypes from "prop-types";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { FcEditImage } from "react-icons/fc";
function TableGridControl(props) {
  const {
    tableHeight,
    tableWidth,
    tableColoumn,
    pageSize,
    gridRef,
    onGridReady,
    rowData,
    onEditForm,
    fieldValues,
  } = props;
  const handleClickEdit = (id) => {
    if (onEditForm) {
      onEditForm(id);
    }
  };

  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{ height: `${tableHeight}`, width: `${tableWidth}` }}
      >
        <AgGridReact
          ref={gridRef}
          paginationPageSize={pageSize}
          cacheBlockSize={pageSize}
          pagination={true}
          onGridReady={onGridReady}
          rowSelection="multiple"
          defaultColDef={{
            flex: 1,
            resizable: true,
            minWidth: 200,
          }}
          suppressRowClickSelection={true}
          rowData={rowData}
          sideBar={true}
          animateRows={true}
          maxConcurrentDatasourceRequests={1}
          rowHeight={35}
          resizable={true}
        >
          {fieldValues !== "" && (
            <AgGridColumn
              headerName=""
              cellClass="h-cell-editform"
              field={`${fieldValues}`}
              minWidth={30}
              maxWidth={30}
              cellRendererFramework={(field) => {
                return (
                  <FcEditImage
                    style={{ marginBottom: "10px" }}
                    size={20}
                    onClick={() => {
                      handleClickEdit(field.value);
                    }}
                  />
                );
              }}
            ></AgGridColumn>
          )}

          {tableColoumn.map((item, index) => (
            <AgGridColumn
              key={index}
              headerCheckboxSelectionFilteredOnly={
                item.headerCheckboxSelectionFilteredOnly || false
              }
              cellRenderer={item.cellRenderer}
              headerName={item?.headerName}
              field={item?.field}
              sortable={item?.sortTable || false}
              unSortIcon={item?.unSortIcon || false}
              filter={item?.filter || false}
              checkboxSelection={item?.checkboxSelection || false}
              headerCheckboxSelection={item?.headerCheckboxSelection || false}
              minWidth={item?.minWidth}
              filterParams={item?.filterParam}
              hide={item?.hide}
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
  pageSize: PropTypes.number,
  // chọn checkbox
  gridRef: PropTypes.object.isRequired,
  onGridReady: PropTypes.func,
  rowData: PropTypes.array,
  // số coloumn
  tableColoumn: PropTypes.array,

  // handelCLickEdit
  fieldValues: PropTypes.string,
  onEditForm: PropTypes.func,
};
TableGridControl.defaultProps = {
  tableWidth: "100%",
  tableHeight: "600px",

  pageSize: 20,
  onGridReady: null,
  rowData: null,

  tableColoumn: [],
  onEditForm: null,
  fieldValues: "",
};

export default TableGridControl;
