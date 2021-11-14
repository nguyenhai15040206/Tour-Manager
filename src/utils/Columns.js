// Nguyễn Tấn Hải 2021-11-11

//
// const filterParamsDate = {
//   comparator: function (filterLocalDateAtMidnight, cellValue) {
//     var dateAsString = cellValue;
//     if (dateAsString == null) return -1;
//     var dateParts = dateAsString.split("/");
//     var cellDate = new Date(
//       Number(dateParts[2]),
//       Number(dateParts[1]) - 1,
//       Number(dateParts[0])
//     );
//     if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
//       return 0;
//     }
//     if (cellDate < filterLocalDateAtMidnight) {
//       return -1;
//     }
//     if (cellDate > filterLocalDateAtMidnight) {
//       return 1;
//     }
//   },
//   browserDatePicker: true,
//   minValidYear: 2000,
// };

// Tour
export const tableColumnsTour = [
  {
    field: `tourId`,
    headerName: "Mã tour",
    sortTable: true,
    unSortIcon: true,
    filter: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    minWidth: 170,
    with: 170,
  },
  {
    field: "tourName",
    headerName: "Tên tour",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: "description",
    headerName: "Mô tả tour",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: "tourImg",
    headerName: "Ảnh tour",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 190,
  },
  {
    field: "phuongTienXuatPhat",
    headerName: "Phương tiện xuất phát",
    sortTable: false,
    unSortIcon: false,
    filter: true,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 220,
  },
  {
    field: "provinceName",
    headerName: "Địa điểm xuất phát",
    sortTable: false,
    unSortIcon: false,
    filter: true,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: "dateStart",
    headerName: "Ngày bắt đầu",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 120,
  },
  {
    field: "dateEnd",
    headerName: "Ngày kết thúc",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 130,
  },
  {
    field: "quanityMax",
    headerName: "SL Max",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 120,
  },
  {
    field: "quanityMin",
    headerName: "SL Min",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 120,
  },
  {
    field: "currentQuanity",
    headerName: "SL hiện tại",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 150,
  },
];
