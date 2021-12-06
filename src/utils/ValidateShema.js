import * as yup from "yup";

const validationSchema = {
  // Tour Manager Begin
  TourManagerAdd: yup.object().shape({
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
};

export default validationSchema;
