import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../features/Admins/Slices/SliceAddress";
import employeeReducer from "../features/Admins/Slices/SliceEmployee";
import imagesUploadReducer from "../features/Admins/Slices/SliceImagesUpload";
import tourReducer from "../features/Admins/Slices/SliceTour";
import tourDetailsReducer from "../features/Admins/Slices/SliceTourDetails";
import touristAttrReducer from "../features/Admins/Slices/SliceTouristAttraction";
import travelTypeReducer from "../features/Admins/Slices/SliceTravelType";
import customerReducer from "../features/Clients/Customers/SliceCustomer";
import districtReducer from "../features/Admins/Slices/SliceDistrict";
import wardsReducer from "../features/Admins/Slices/SliceWards";
import tourGuideReducer from "../features/Admins/Slices/SliceTourGuide";
import promotionReducer from "../features/Admins/Slices/SlicePromotion";
import enumConstantReducer from "../features/Admins/Slices/SliceEnumConstant";
import travelConpanyTransportSliceReducer from "../features/Admins/Slices/SliceTravelConpanyTransport";

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
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
