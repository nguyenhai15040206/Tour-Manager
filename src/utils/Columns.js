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
export const tableColumnEmployee = [
  {
    field: `empId`,
    headerName: "Mã nhân viên",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    minWidth: 200,
  },
  {
    field: `empName`,
    headerName: "Tên nhân viên",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 250,
  },
  {
    field: `gender`,
    headerName: "Giới tính",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 170,
  },
  {
    field: `dateOfBirth`,
    headerName: "Ngày sinh",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 170,
  },
  {
    field: `workingDate`,
    headerName: "Ngày vào làm",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 170,
  },
  {
    field: `phoneNumber`,
    headerName: "Số điện thoại",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 170,
  },
  {
    field: `email`,
    headerName: "Email",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: `dateUpdate`,
    headerName: "Ngày cập nhật",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
];

export const tableColumnTouristAttr = [
  {
    field: `touristAttrId`,
    headerName: "Mã địa điểm",
    sortTable: true,
    unSortIcon: true,
    filter: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    minWidth: 170,
  },
  {
    field: `touristAttrName`,
    headerName: "Tên địa điểm",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: `description`,
    headerName: "Chi tiết",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 500,
  },
  {
    field: `dateUpdate`,
    headerName: "Ngày cập nhật",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 170,
  },
  {
    field: `provinceName`,
    headerName: "Tỉnh thành",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: `empName`,
    headerName: "Nhân viên",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
];
