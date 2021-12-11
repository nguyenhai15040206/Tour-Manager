import * as yup from "yup";

const validationSchema = {
  // Tour Manager Begin

  TourManagerAdd: yup.object().shape({
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
    TourName: yup.string().required("[Tên tour] không được để trống!"),
    Description: yup.string().required("[Mô tả] không được để trống"),
    TourImg: yup.string().required("[Ảnh tour] không được để trống!"),
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
    TourName: yup.string().required("[Tên tour] không được để trống!"),
    Description: yup.string().required("[Mô tả] không được để trống"),
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
    PhoneNumber: yup.string().required("[Số điện thoại] không thể bỏ trống!"),
    CompanyImage: yup.string().required("[Ảnh đại diện] không thể bỏ trống!"),
    ProvinceID: yup.string().required("Vui lòng chọn tỉnh/thành"),
    TravelTypeID: yup.string().required("Vui lòng chọn loại hình vận chuyển"),
    DistrictID: yup.string().required("Vui lòng chọn quận/huyện"),
    WardsID: yup.string().required("Vui lòng chọn phường/xã"),
    Address: yup.string().required("[Địa chỉ] không thể bỏ trống"),
  }),
  CompanyManagerEdit: yup.object().shape({
    CompanyName: yup
      .string()
      .trim()
      .required("[Tên công ty] không thể bỏ trống!")
      .max(498, "[Tên công ty] không vượt quá 500 kí tự"),
    PhoneNumber: yup.string().required("[Số điện thoại] không thể bỏ trống!"),
    ProvinceID: yup.string().required("Vui lòng chọn tỉnh/thành"),
    TravelTypeID: yup.string().required("Vui lòng chọn loại hình vận chuyển"),
    DistrictID: yup.string().required("Vui lòng chọn quận/huyện"),
    WardsID: yup.string().required("Vui lòng chọn phường/xã"),
    Address: yup.string().required("[Địa chỉ] không thể bỏ trống"),
  }),
};

export default validationSchema;
