import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../features/Admins/Slices/SliceAddress";
import employeeReducer from "../features/Admins/Slices/SliceEmployee";
import imagesUploadReducer from "../features/Admins/Slices/SliceImagesUpload";
import tourReducer from "../features/Admins/Slices/SliceTour";
import tourDetailsReducer from "../features/Admins/Slices/SliceTourDetails";
import touristAttrReducer from "../features/Admins/Slices/SliceTouristAttraction";
import travelTypeReducer from "../features/Admins/Slices/SliceTravelType";
import customerReducer from "../features/Admins/Slices/SliceCustomer";
import districtReducer from "../features/Admins/Slices/SliceDistrict";
import wardsReducer from "../features/Admins/Slices/SliceWards";
import tourGuideReducer from "../features/Admins/Slices/SliceTourGuide";
import promotionReducer from "../features/Admins/Slices/SlicePromotion";
import enumConstantReducer from "../features/Admins/Slices/SliceEnumConstant";
import travelConpanyTransportSliceReducer from "../features/Admins/Slices/SliceTravelConpanyTransport";
import unitPriceTransportReducer from "../features/Admins/Slices/SliceUnitPriceTransport";
import bookingTourReducer from "../features/Admins/Slices/SliceBookingTour";
import permissionReducer from "../features/Admins/Slices/SlicePermission";
import newsReducer from "../features/Admins/Slices/SliceNews";
import bannerReducer from "../features/Admins/Slices/SliceBanner";

export default configureStore({
  reducer: {
    customer: customerReducer,
    employee: employeeReducer,
    tour: tourReducer,
    touristAttraction: touristAttrReducer,
    address: addressReducer,
    tourDetails: tourDetailsReducer,
    imagesUpload: imagesUploadReducer,
    travelType: travelTypeReducer,
    district: districtReducer,
    wards: wardsReducer,
    tourGuide: tourGuideReducer,
    promotion: promotionReducer,
    enumConstant: enumConstantReducer,
    travelConpanyTransport: travelConpanyTransportSliceReducer,
    unitPriceTransport: unitPriceTransportReducer,
    bookingTour: bookingTourReducer,
    permission: permissionReducer,
    news: newsReducer,
    banner: bannerReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
