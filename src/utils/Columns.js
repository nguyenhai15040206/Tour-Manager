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
    headerCheckboxSelectionFilteredOnly: true,
    headerCheckboxSelection: true,
    minWidth: 170,
    with: 170,
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
    field: "phuongTienXuatPhat",
    headerName: "Phương tiện xuất phát",
    filter: true,
    minWidth: 220,
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
];
