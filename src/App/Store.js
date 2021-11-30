import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../features/Admins/Slices/SliceAddress";
import employeeReducer from "../features/Admins/Slices/SliceEmployee";
import tourReducer from "../features/Admins/Slices/SliceTour";
import tourDetailsReducer from "../features/Admins/Slices/SliceTourDetails";
import touristAttrReducer from "../features/Admins/Slices/SliceTouristAttraction";
import unitPriceReducer from "../features/Admins/Slices/SliceUnitPrice";
import customerReducer from "../features/Clients/Customers/SliceCustomer";
import districtReducer from "../features/Admins/Slices/SliceDistrict";
import wardsReducer from "../features/Admins/Slices/SliceWards";
import tourGuideReducer from "../features/Admins/Slices/SliceTourGuide";

export default configureStore({
  reducer: {
    customer: customerReducer,
    employee: employeeReducer,
    tour: tourReducer,
    touristAttraction: touristAttrReducer,
    address: addressReducer,
    tourDetails: tourDetailsReducer,
    unitPrice: unitPriceReducer,
    district: districtReducer,
    wards: wardsReducer,
    tourGuide: tourGuideReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
