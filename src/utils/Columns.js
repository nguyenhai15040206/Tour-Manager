// Nguyễn Tấn Hải 2021-11-11
// Tour
export const tableColumnsTour = [
  {
    field: `tourId`,
    headerName: "Mã tour",
    sortTable: true,
    unSortIcon: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    headerCheckboxSelection: true,
    minWidth: 250,
  },

  {
    field: "tourName",
    headerName: "Tên tour",
    filter: true,
    minWidth: 300,
  },
  {
    field: "description",
    headerName: "Mô tả tour",
    minWidth: 200,
  },
  {
    field: "tourImg",
    headerName: "Ảnh tour",
    minWidth: 190,
  },
  {
    field: "transport",
    headerName: "Phương tiện x/phát",
    minWidth: 190,
  },
  {
    field: "provinceName",
    headerName: "Địa điểm xuất phát",
    minWidth: 200,
  },
  {
    field: "dateStart",
    headerName: "Ngày bắt đầu",
    minWidth: 130,
  },
  {
    field: "dateEnd",
    headerName: "Ngày kết thúc",
    minWidth: 130,
  },
  {
    field: "quanityMax",
    headerName: "SL Max",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 120,
  },
  {
    field: "quanityMin",
    headerName: "SL Min",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 120,
  },
  {
    field: "currentQuanity",
    headerName: "SL hiện tại",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 150,
  },
  {
    field: "suggest",
    headerName: "Đề xuất",
    sortTable: true,
    unSortIcon: true,
    cellRenderer: (params) => {
      var input = document.createElement("input");
      input.type = "checkbox";
      //input.className = "form-check-input";
      input.checked = params.value;
      // input.addEventListener("click", function (event) {
      //   params.value = !params.value;
      //   params.node.data.fieldName = params.value;
      // });
      return input;
    },
    minWidth: 150,
  },
];
