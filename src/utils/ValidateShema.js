import * as yup from "yup";
import moment from "moment";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = {
  // Tour Manager Begin
  TourManagerAdd: yup.object().shape({
    // Validate thông tin cơ bản
    TourName: yup.string().trim().required("[Tên tour] không được để trống!"),
    Description: yup.string().required("[Mô tả] không được để trống"),
    TravelTypeID: yup
      .string()
      .required("[Loại hình du lịch] không được để trống!"),
    TourImg: yup.string().required("[Ảnh tour] không được để trống!"),
    DeparturePlaceFrom: yup
      .string()
      .trim()
      .required("[Địa điểm xuất phát] không thể bỏ trống!"),
    DeparturePlaceTo: yup
      .string()
      .trim()
      .required("[Điểm đến] không thể bỏ trống!"),
    DateStart: yup
      .date()
      .min(new Date(), "[Ngày bắt đầu] không hợp lệ!")
      .required("[Ngày bắt đầu] không được trống!"),
    DateEnd: yup
      .date()
      .when("DateStart", (enteredDate, schema) => {
        if (enteredDate) {
          // This can be calculated in many ways. Just be sure that its type is `Date` object
          const dayAfter = new Date(enteredDate.getTime() + 86400000);
          return schema.min(dayAfter, "[Ngày kết thúc] không hợp lệ!");
        }
        return schema;
      })
      .required("[Ngày kết thúc] không được trống!"),
    AdultUnitPrice: yup
      .number()
      .moreThan(0, "[Đơn giá] lớn hơn 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    ChildrenUnitPrice: yup
      .number()
      .moreThan(0, "[Đơn giá] lớn hơn 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(yup.ref("AdultUnitPrice"), "[Giá trẻ em] < [Giá người lớn]")
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    BabyUnitPrice: yup
      .number()
      .moreThan(0, "[Đơn giá] lớn hơn 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(yup.ref("ChildrenUnitPrice"), "[Giá trẻ nhỏ] < [Giá trẻ em]")
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    Surcharge: yup
      .string()
      .matches(/^[0-9]+$/, "Vui lòng nhập đơn giá hợp lệ!"),
    QuanityMax: yup
      .number()
      .min(10, "[Số lượng] phải lớn hơn 10!")
      .required("[Số lượng] không được để trống!"),
    QuanityMin: yup
      .number()
      .moreThan(0, "[Số lượng] lớn hơn 0")
      .max(yup.ref("QuanityMax"), "[Số lượng min] < [Số lượng max]")
      .required("[Số lượng] không được để trống!"),

    // thồn tin tour lịch trình
    Regions: yup.string().trim().required("Vui lòng chọn vùng miền!"),
    Schedule: yup
      .string()
      .trim()
      .required("[Lịch trình] không được bỏ trống!")
      .min(20, "[Lịch trình] không được bỏ trống!"),
    TouristAttaction: yup
      .array()
      .min(1, "[Địa điểm du lịch] không được để trống!")
      .required("[Địa điểm du lịch] không được để trống!")
      .nullable(),

    // thông tin khác

    // Transport: yup
    //   .string()
    //   .trim()
    //   .required("[Phương tiện] không được để trống"),
  }),

  // Edit
  TourManagerEdit: yup.object().shape({
    TravelTypeID: yup
      .string()
      .trim()
      .required("[Loại hình du lịch] không được để trống!"),
    DeparturePlace: yup
      .string()
      .trim()
      .required("[Địa điểm xuất phát] không thể bỏ trống!"),
    Regions: yup.string().trim().required("Vui lòng chọn vùng miền!"),
    AdultUnitPrice: yup
      .number()
      .moreThan(0, "[Đơn giá] lớn hơn 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    ChildrenUnitPrice: yup
      .number()
      .moreThan(0, "[Đơn giá] lớn hơn 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(yup.ref("AdultUnitPrice"), "[Giá trẻ em] < [Giá người lớn]")
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    BabyUnitPrice: yup
      .number()
      .moreThan(0, "[Đơn giá] lớn hơn 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(yup.ref("ChildrenUnitPrice"), "[Giá trẻ nhỏ] < [Giá trẻ em]")
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    Schedule: yup
      .string()
      .trim()
      .required("[Lịch trình] không được bỏ trống!")
      .min(20, "[Lịch trình] không được bỏ trống!"),
    Transport: yup
      .string()
      .trim()
      .required("[Phương tiện] không được để trống"),
    TouristAttaction: yup
      .array()
      .min(1, "[Địa điểm du lịch] không được để trống!")
      .required("[Địa điểm du lịch] không được để trống!")
      .nullable(),
    TourName: yup.string().trim().required("[Tên tour] không được để trống!"),
    Description: yup.string().trim().required("[Mô tả] không được để trống"),
    //TourImg: yup.string().required("[Ảnh tour] không được để trống!"),
    QuanityMax: yup
      .number()
      .min(10, "[Số lượng] phải lớn hơn 10!")
      .required("[Số lượng] không được để trống!"),
    QuanityMin: yup
      .number()
      .moreThan(0, "[Số lượng] lớn hơn 0")
      .max(yup.ref("QuanityMax"), "[Số lượng min] < [Số lượng max]")
      .required("[Số lượng] không được để trống!"),
    DateStart: yup
      .date()
      .min(new Date(), "[Ngày bắt đầu] không hợp lệ!")
      .required("[Ngày bắt đầu] không được trống!"),
    DateEnd: yup
      .date()
      .min(yup.ref("DateStart"), "[Ngày kết thúc] không hợp lệ!")
      .required("[Ngày kết thúc] không được trống!"),
  }),

  //End Validate TourManager

  // Promotion
  PromotionManager: yup.object().shape({
    PromotionName: yup
      .string()
      .trim()
      .max(200, "[Tên khuyến mãi] không vượt quá 200 kí tự")
      .required("[Tên khuyến mãi] không thể bỏ trống!"),
    Discount: yup
      .number()
      .min(5, "[Giảm giá] lớn hơn 5%")
      .max(100, "[Giảm giá] nhỏ hơn 100%")
      .required("[Giảm giá] không thể bỏ trống!"),
    DateStart: yup
      .date()
      .min(new Date(), "[Ngày bắt đầu] không hợp lệ!")
      .required("[Ngày bắt đầu] không được trống!"),
    DateEnd: yup
      .date()
      .when("DateStart", (enteredDate, schema) => {
        if (enteredDate) {
          // This can be calculated in many ways. Just be sure that its type is `Date` object
          const dayAfter = new Date(enteredDate.getTime() + 86400000);
          return schema.min(dayAfter, "[Ngày kết thúc] không hợp lệ!");
        }
        return schema;
      })
      .required("[Ngày kết thúc] không được trống!"),
  }),

  // Company
  CompanyManagerAdd: yup.object().shape({
    CompanyName: yup
      .string()
      .trim()
      .required("[Tên công ty] không thể bỏ trống!")
      .max(498, "[Tên công ty] không vượt quá 500 kí tự"),
    PhoneNumber: yup
      .string()
      .trim()
      .matches(phoneRegExp, "[Số điện thoại không hợp lệ!]")
      .min(10, "[Số điện thoại không hợp lệ!]")
      .max(10, "[Số điện thoại không hợp lệ!]")
      .required("[Số điện thoại] không thể bỏ trống!"),
    CompanyImage: yup
      .string()
      .trim()
      .required("[Ảnh đại diện] không thể bỏ trống!"),
    ProvinceID: yup.string().trim().required("Vui lòng chọn tỉnh/thành"),
    TravelTypeID: yup.string().required("Vui lòng chọn loại hình vận chuyển"),
    DistrictID: yup.string().required("Vui lòng chọn quận/huyện"),
    WardsID: yup.string().trim().required("Vui lòng chọn phường/xã"),
    Address: yup.string().trim().required("[Địa chỉ] không thể bỏ trống"),
  }),
  CompanyManagerEdit: yup.object().shape({
    CompanyName: yup
      .string()
      .trim()
      .required("[Tên công ty] không thể bỏ trống!")
      .max(498, "[Tên công ty] không vượt quá 500 kí tự"),
    PhoneNumber: yup
      .string()
      .trim()
      .matches(phoneRegExp, "[Số điện thoại không hợp lệ!]")
      .min(10, "[Số điện thoại không hợp lệ!]")
      .max(10, "[Số điện thoại không hợp lệ!]")
      .required("[Số điện thoại] không thể bỏ trống!"),
    ProvinceID: yup.string().required("Vui lòng chọn tỉnh/thành"),
    TravelTypeID: yup.string().required("Vui lòng chọn loại hình vận chuyển"),
    DistrictID: yup.string().required("Vui lòng chọn quận/huyện"),
    WardsID: yup.string().required("Vui lòng chọn phường/xã"),
    Address: yup.string().trim().required("[Địa chỉ] không thể bỏ trống"),
  }),

  //
  TouristAttractionAdd: yup.object().shape({
    TouristAttrName: yup
      .string()
      .trim()
      .max(248, "[Tên địa điểm] không quá 250 kí tự")
      .required("[Tên địa điểm] không được để trống"),
    ProvinceID: yup.string().required("[Tỉnh thành] không được để trống"),
    TouristAttrImages: yup.string().nullable().required("Vui lòng chọn ảnh!"),
  }),
  TouristAttractionEdit: yup.object().shape({
    TouristAttrName: yup
      .string()
      .trim()
      .max(248, "[Tên địa điểm] không quá 250 kí tự")
      .required("[Tên địa điểm] không được để trống"),
    ProvinceID: yup.string().required("[Tỉnh thành] không được để trống"),
    //TouristAttrImages: yup.string().nullable().required("Vui lòng chọn ảnh!"),
  }),

  // validate unitprice
  UnitPriceValidate: yup.object().shape({
    TimeStart: yup.string().required("[Giờ đi] không được trống!"),
    TimeEnd: yup
      .string()
      .required("[Giờ đến] không được trống!")
      .test("is-greater", "[Giờ đến] phải lớn hơn!!!", function (value) {
        const { TimeStart } = this.parent;
        return moment(value, "HH:mm").isSameOrAfter(moment(TimeStart, "HH:mm"));
      }),
    CompanyID: yup.string().required("[Nơi đi] không được trống!"),
    TravelTypeID: yup.string().required("[Nơi đi] không được trống!"),
    ProvinceFrom: yup.string().required("[Nơi đi] không được trống!"),
    ProvinceTo: yup.string().required("[Nơi đi] không được trống!"),
    AdultUnitPrice: yup
      .number()
      .moreThan(0, "[Đơn giá] lớn hơn 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    ChildrenUnitPrice: yup
      .number()
      .min(0, "[Đơn giá] lớn hơn hoặc bằng 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(yup.ref("AdultUnitPrice"), "[Giá trẻ em] < [Giá người lớn]")
      .required("Vui lòng nhập đơn giá hợp lệ!"),
    BabyUnitPrice: yup
      .number()
      .min(0, "[Đơn giá] lớn hơn hoặc bằng 0")
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(yup.ref("ChildrenUnitPrice"), "[Giá trẻ nhỏ] < [Giá trẻ em]")
      .required("Vui lòng nhập đơn giá hợp lệ!"),
  }),
};

export default validationSchema;
