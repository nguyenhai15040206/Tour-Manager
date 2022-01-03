//==

import { NotificationManager } from "react-notifications";
import newsApi from "../apis/NewsApi";
import permisstionApi from "../apis/PermissionApi";
import tourApi from "../apis/TourApi";

//#region  phân quyền màn hình
export const tableColumnEmployeeUserGroup = [
  {
    field: `empId`,
    headerName: "Mã nhân viên",
    sortTable: true,
    unSortIcon: true,
    filter: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    minWidth: 180,
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
    minWidth: 150,
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
    minWidth: 100,
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
];
export const tableUserGroup = [
  {
    field: `userGroupId`,
    headerName: "Mã nhóm quyền",
    sortTable: true,
    unSortIcon: true,
    filter: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    minWidth: 200,
  },
  {
    field: `userGroupName`,
    headerName: "Tên nhóm quyền",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
];
export const tableCatScreen = [
  {
    field: `userGroupID`,
    headerName: "Mã Nhóm",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
    hide: true,
  },
  {
    field: `screenID`,
    headerName: "Mã màn hình",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: `screenName`,
    headerName: "Tên màn hình",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: "status",
    headerName: "Quyền",
    sortTable: true,
    unSortIcon: true,
    cellRenderer: (values) => {
      var input = document.createElement("input");
      input.type = "checkbox";
      input.readOnly = true;
      input.checked = values.value;
      input.addEventListener("click", () => {
        permisstionApi
          .Adm_ChangePermissionStatus({
            pScreenID: values.data.screenID,
            pUserGroupID: values.data.userGroupID,
          })
          .then(() => {})
          .catch(async (err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("accessTokenEmp");
              await NotificationManager.warning(
                "Vui lòng đăng nhập lại",
                `Phiên bản đăng nhập hết hạn!`,
                2500
              );
              window.location.href = "http://localhost:3000/admin/login";
              return;
            }
          });
      });
      return input;
    },
    minWidth: 130,
  },
];
//#endregion

export const tableColumnNews = [
  {
    field: `newsId`,
    headerName: "Mã tin tức",
    sortTable: true,
    unSortIcon: true,
    filter: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    minWidth: 200,
  },
  {
    field: `newsName`,
    headerName: "Tên tin tức",
    sortTable: true,
    unSortIcon: true,
    minWidth: 200,
  },
  {
    field: `kindOfNew`,
    headerName: "Loại tin tức",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 170,
  },
  {
    field: `newsImg`,
    headerName: "Ảnh minh họa",
    minWidth: 200,
  },
  // {
  //   field: `content`,
  //   headerName: "Nội dung",
  //   sortTable: true,
  //   unSortIcon: true,
  //   filter: false,
  //   headerSelect: true,
  //   checkboxSelection: false,
  //   headerCheckboxSelection: false,
  //   minWidth: 200,
  // },
  {
    field: "dateUpdate",
    headerName: "Ngày cập nhật",
    minWidth: 130,
  },
  {
    field: "empName",
    headerName: "Nhân viên cập nhật",
    minWidth: 170,
  },
  {
    field: "active",
    headerName: "Kích hoạt",
    sortTable: true,
    unSortIcon: true,
    cellRenderer: (values) => {
      var input = document.createElement("input");
      input.type = "checkbox";
      input.readOnly = true;
      input.checked = values.value;
      input.addEventListener("click", () => {
        const params = {
          pID: values.data.newsId,
          pEmpID: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
        };
        console.log(params);
        newsApi.Adm_ActiveNews(params).catch(async (err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            await NotificationManager.warning(
              "Vui lòng đăng nhập lại",
              `Phiên bản đăng nhập hết hạn!`,
              2500
            );
            window.location.href = "http://localhost:3000/admin/login";
            return;
          }
        });
      });
      return input;
    },
    minWidth: 130,
  },
];

export const tableColumnCustomer = [
  {
    field: `customerId`,
    headerName: "Mã khách hàng",
    sortTable: true,
    unSortIcon: true,
    filter: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    minWidth: 200,
  },
  {
    field: `customerName`,
    headerName: "Tên khách hàng",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
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
    minWidth: 100,
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
    minWidth: 150,
  },
  {
    field: `address`,
    headerName: "Địa chỉ",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: `empIdUpdate`,
    headerName: "Nhân viên cập nhật",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 180,
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
  },
];

//
export const tableColumnTourGuidSupportSearch = [
  {
    field: `tourGuideId`,
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
    field: `tourGuideName`,
    headerName: "Tên nhân viên",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
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
    minWidth: 100,
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
    field: `address`,
    headerName: "Địa chỉ",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 300,
  },
];
//===
export const tableColumnUnitPriceTransport = [
  {
    field: `upTransportId`,
    headerName: "Mã đơn giá",
    sortTable: true,
    unSortIcon: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    headerCheckboxSelection: true,
    minWidth: 250,
  },
  {
    field: "timeStart",
    headerName: "Giờ đi",
    filter: true,
    minWidth: 110,
  },
  {
    field: "timeEnd",
    headerName: "Giờ đến",
    minWidth: 110,
  },
  {
    field: "provinceFrom",
    headerName: "Nơi khởi hành",
    minWidth: 200,
  },
  {
    field: "provinceTo",
    headerName: "Nơi đến",
    minWidth: 200,
  },
  {
    field: "companyName",
    headerName: "Hãng vận chuyển",
    minWidth: 200,
  },
  {
    field: "adultUnitPrice",
    headerName: "Đơn giá người lớn",
    minWidth: 150,
  },
  {
    field: "childrenUnitPrice",
    headerName: "Đơn giá trẻ em",
    minWidth: 150,
  },
  {
    field: "babyUnitPrice",
    headerName: "Đơn giá trẻ nhỏ",
    minWidth: 150,
  },
  {
    field: "dateUpdate",
    headerName: "Ngày cập nhật",
    minWidth: 150,
  },
  {
    field: "empName",
    headerName: "Nhân viên cập nhật",
    minWidth: 200,
  },
];

//Nguyễn Tấn Hải 2021-12-19
// table Phương tiện
export const tableColoumnCompanyTransport = [
  {
    field: `companyId`,
    headerName: "Mã công công ty",
    sortTable: true,
    unSortIcon: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    headerCheckboxSelection: true,
    minWidth: 250,
  },

  {
    field: "companyName",
    headerName: "Tên công ty",
    filter: true,
    minWidth: 200,
  },
  {
    field: "enumerationID",
    headerName: "Loại phương tiện",
    minWidth: 200,
  },
  {
    field: "companyImage",
    headerName: "Ảnh đại diện",
    minWidth: 200,
  },
  {
    field: "phoneNumber",
    headerName: "Số điện thoại",
    minWidth: 150,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    minWidth: 200,
  },
  {
    field: "empIDUpdate",
    headerName: "Người cập nhật",
    minWidth: 200,
  },
  {
    field: "dateUpdate",
    headerName: "Ngày cập nhật",
    minWidth: 150,
  },
];

// table khuyến mãi
export const tableColumnPromotion = [
  {
    field: `promotionId`,
    headerName: "Mã khuyến mãi",
    sortTable: true,
    unSortIcon: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    headerCheckboxSelection: true,
    minWidth: 250,
  },

  {
    field: "promotionName",
    headerName: "Tên khuyên mãi",
    filter: true,
    minWidth: 300,
  },
  {
    field: "dateStart",
    headerName: "Ngày bắt đầu",
    minWidth: 150,
  },
  {
    field: "dateEnd",
    headerName: "Ngày kết thúc",
    minWidth: 150,
  },
  {
    field: "discount",
    headerName: "Giảm giá(%)",
    minWidth: 120,
  },
  {
    field: "isApplyAll",
    headerName: "Áp dụng cho tất cả",
    sortTable: true,
    unSortIcon: true,
    minWidth: 200,
    cellRenderer: (params) => {
      var input = document.createElement("input");
      input.type = "checkbox";
      input.readonly = "readonly";
      input.checked = params.value;
      return input;
    },
  },
];

export const tableColumnBooking = [
  {
    field: `bookingTourId`,
    headerName: "Mã booking",
    sortTable: true,
    unSortIcon: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    headerCheckboxSelection: true,
    minWidth: 220,
  },
  {
    field: "bookingDate",
    headerName: "Ngày booking",
    minWidth: 150,
  },
  {
    field: `tourId`,
    headerName: "Mã tour",
    minWidth: 220,
  },
  {
    field: `tourName`,
    headerName: "Tên tour",
    minWidth: 220,
  },
  {
    field: `customerId`,
    headerName: "Mã khách hàng",
    minWidth: 220,
  },
  {
    field: `customerName`,
    headerName: "Tên khách hàng",
    minWidth: 220,
  },
  {
    field: `phoneNumber`,
    headerName: "Số điện thoại",
    minWidth: 220,
  },
  {
    field: `email`,
    headerName: "Email",
    minWidth: 220,
  },
  {
    field: `quanityAdult`,
    headerName: "SL người lớn",
    minWidth: 150,
  },
  {
    field: `quanityChildren`,
    headerName: "SL trẻ em",
    minWidth: 150,
  },
  {
    field: `quanityBaby`,
    headerName: "SL trẻ nhỏ",
    minWidth: 150,
  },
  {
    field: `quanityInfant`,
    headerName: "SL trẻ sơ sinh",
    minWidth: 150,
  },
  {
    field: `adultUnitPrice`,
    headerName: "Đơn giá người lớn",
    minWidth: 150,
  },
  {
    field: `childrenUnitPrice`,
    headerName: "Đơn giá trẻ em",
    minWidth: 150,
  },
  {
    field: `babyUnitPrice`,
    headerName: "Đơn giá trẻ em",
    minWidth: 150,
  },
  {
    field: `surcharge`,
    headerName: "Phụ thu phòng đơn",
    minWidth: 160,
  },
  {
    field: `discount`,
    headerName: "Giảm giá",
    minWidth: 150,
  },
  {
    field: `totalMoneyBooking`,
    headerName: "Tổng tiền booking",
    minWidth: 200,
  },
  {
    field: `totalMoney`,
    headerName: "Tổng tiền tất cả",
    minWidth: 200,
  },
  {
    field: `optionsNote`,
    headerName: "Các ghi chú",
    minWidth: 220,
  },
  {
    field: `note`,
    headerName: "Ghi chú khác",
    minWidth: 200,
  },
  {
    field: `typePayment`,
    headerName: "Loại thanh toán",
    minWidth: 200,
  },
  {
    field: `status`,
    headerName: "Tình trạng tranh toán",
    minWidth: 200,
  },
  {
    field: "empIDConfirm",
    headerName: "Nhân viên xác nhận",
    minWidth: 200,
  },
  {
    field: "dateConfirm",
    headerName: "Ngày xác nhận",
    minWidth: 150,
  },
];

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
    minWidth: 220,
  },

  {
    field: "tourName",
    headerName: "Tên tour",
    filter: true,
    minWidth: 220,
  },
  {
    field: "description",
    headerName: "Mô tả tour",
    minWidth: 200,
  },
  {
    field: "tourImg",
    headerName: "Ảnh tour",
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
    field: "rating",
    headerName: "Đánh giá(sao)",
    minWidth: 150,
    sortTable: true,
    unSortIcon: true,
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
    field: "adultUnitPrice",
    headerName: "Đơn giá người lớn",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 190,
  },
  {
    field: "childrenUnitPrice",
    headerName: "Đơn giá trẻ em",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 190,
  },
  {
    field: "babyUnitPrice",
    headerName: "Đơn giá trẻ nhỏ",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 190,
  },
  {
    field: "surcharge",
    headerName: "Phụ phí(nếu có)",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 190,
  },
  {
    field: "departurePlaceFrom",
    headerName: "Nơi khởi hành",
    minWidth: 170,
  },
  {
    field: "departurePlaceTo",
    headerName: "Nơi đến",
    minWidth: 170,
  },
  {
    field: "tourGuideName",
    headerName: "Hướng dẫn viên",
    minWidth: 190,
  },
  {
    field: "travelTypeName",
    headerName: "Loại hình du lịch",
    minWidth: 190,
  },
  {
    field: "empName",
    headerName: "Người cập nhật",
    minWidth: 150,
  },
  {
    field: "dateUpdate",
    headerName: "Ngày cập nhật",
    minWidth: 150,
  },
  {
    field: "suggest",
    headerName: "Đề xuất",
    sortTable: true,
    unSortIcon: true,
    cellRenderer: (values) => {
      var input = document.createElement("input");
      input.type = "checkbox";
      input.readOnly = true;
      input.checked = values.value;
      input.addEventListener("click", () => {
        const params = {
          pID: values.data.tourId,
          pEmpID: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
        };
        console.log(params);
        tourApi.Adm_UpdateSuggest(params).catch(async (err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            await NotificationManager.warning(
              "Vui lòng đăng nhập lại",
              `Phiên bản đăng nhập hết hạn!`,
              2500
            );
            window.location.href = "http://localhost:3000/admin/login";
            return;
          }
        });
      });
      return input;
    },
    minWidth: 130,
  },
];
export const tableColumnsTourSupportSearch = [
  {
    field: `tourId`,
    headerName: "Mã tour",
    sortTable: true,
    unSortIcon: true,
    headerSelect: true,
    checkboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    headerCheckboxSelection: true,
    minWidth: 220,
  },

  {
    field: "tourName",
    headerName: "Tên tour",
    filter: true,
    minWidth: 220,
  },
  {
    field: "description",
    headerName: "Mô tả tour",
    minWidth: 200,
  },
  {
    field: "tourImg",
    headerName: "Ảnh tour",
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
    field: "rating",
    headerName: "Đánh giá(sao)",
    minWidth: 150,
    sortTable: true,
    unSortIcon: true,
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
    field: "adultUnitPrice",
    headerName: "Đơn giá người lớn",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 190,
  },
  {
    field: "childrenUnitPrice",
    headerName: "Đơn giá trẻ em",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 190,
  },
  {
    field: "babyUnitPrice",
    headerName: "Đơn giá trẻ nhỏ",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 190,
  },
  {
    field: "surcharge",
    headerName: "Phụ phí(nếu có)",
    sortTable: true,
    unSortIcon: true,
    filter: "agNumberColumnFilter",
    minWidth: 190,
  },
  {
    field: "departurePlaceFrom",
    headerName: "Nơi khởi hành",
    minWidth: 170,
  },
  {
    field: "departurePlaceTo",
    headerName: "Nơi đến",
    minWidth: 170,
  },
  {
    field: "tourGuideName",
    headerName: "Hướng dẫn viên",
    minWidth: 190,
  },
  {
    field: "travelTypeName",
    headerName: "Loại hình du lịch",
    minWidth: 190,
  },
  {
    field: "empName",
    headerName: "Người cập nhật",
    minWidth: 150,
  },
  {
    field: "dateUpdate",
    headerName: "Ngày cập nhật",
    minWidth: 150,
  },
  {
    field: "suggest",
    headerName: "Đề xuất",
    sortTable: true,
    unSortIcon: true,
    cellRenderer: (values) => {
      var input = document.createElement("input");
      input.type = "checkbox";
      input.readOnly = true;
      input.checked = values.value;
      return input;
    },
    minWidth: 130,
  },
];

export const tableColumnEmployee = [
  {
    field: `empId`,
    headerName: "Mã nhân viên",
    sortTable: true,
    unSortIcon: true,
    filter: true,
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
    minWidth: 170,
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
    minWidth: 130,
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
    minWidth: 150,
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
    minWidth: 150,
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
    field: `address`,
    headerName: "Địa chỉ",
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
    minWidth: 150,
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
    minWidth: 220,
  },
  {
    field: `touristAttrName`,
    headerName: "Tên địa điểm",
    minWidth: 200,
  },
  {
    field: `description`,
    headerName: "Chi tiết",
    minWidth: 250,
  },

  {
    field: `provinceName`,
    headerName: "Tỉnh thành",
    minWidth: 200,
  },
  {
    field: `dateUpdate`,
    headerName: "Ngày cập nhật",
    minWidth: 170,
  },
  {
    field: `empName`,
    headerName: "Nhân viên cập nhật",
    minWidth: 190,
  },
];

//tinhr thanh
export const tableColumnProvince = [
  {
    field: `provinceId`,
    headerName: "Mã tỉnh/ thành",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: `divisionType`,
    headerName: "Loại tỉnh/ thành",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 290,
  },
  {
    field: `provinceName`,
    headerName: "Tên tỉnh/thành phố",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 290,
  },
  {
    field: `count`,
    headerName: "Số địa điểm du lịch",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: `regions`,
    headerName: "Miền",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 290,
  },
];

//quận huyện
export const tableColumnDistrict = [
  {
    field: `districtId`,
    headerName: "Mã quận/ huyện",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
  {
    field: `divisionType`,
    headerName: "Loại quận/ huyện",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 300,
  },
  {
    field: `districtName`,
    headerName: "Tên quận/ huyện",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 300,
  },
  {
    field: `provinceName`,
    headerName: "Tên tỉnh/ thành",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 300,
  },
  {
    field: `count`,
    headerName: "số lượng phường/ xã",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
];
//phường
export const tableColumnWard = [
  {
    field: `wardId`,
    headerName: "Mã phường/xã",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 150,
  },
  {
    field: `wardName`,
    headerName: "Tên phường/ xã",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 350,
  },
  {
    field: `divisionType`,
    headerName: "Kiểu phân chia",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 290,
  },
  {
    field: `districtName`,
    headerName: "Tên quận/ huyện",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: false,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 290,
  },
];

///export column tourGuide
export const tableColumnTourGuide = [
  {
    field: `tourGuideId`,
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
    field: `tourGuideName`,
    headerName: "Tên nhân viên",
    sortTable: true,
    unSortIcon: true,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
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
    minWidth: 100,
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
    field: `address`,
    headerName: "Địa chỉ",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 300,
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
    minWidth: 150,
  },
  {
    field: `empName`,
    headerName: "Nhân viên",
    sortTable: false,
    unSortIcon: false,
    filter: false,
    headerSelect: true,
    checkboxSelection: false,
    headerCheckboxSelection: false,
    minWidth: 200,
  },
];
