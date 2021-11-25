import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../features/Admins/Slices/SliceAddress";
import employeeReducer from "../features/Admins/Slices/SliceEmployee";
import tourReducer from "../features/Admins/Slices/SliceTour";
import tourDetailsReducer from "../features/Admins/Slices/SliceTourDetails";
import touristAttrReducer from "../features/Admins/Slices/SliceTouristAttraction";
import unitPriceReducer from "../features/Admins/Slices/SliceUnitPrice";
import customerReducer from "../features/Clients/Customers/SliceCustomer";

export default configureStore({
  reducer: {
    customer: customerReducer,
    employee: employeeReducer,
    tour: tourReducer,
    touristAttraction: touristAttrReducer,
    address: addressReducer,
    tourDetails: tourDetailsReducer,
    unitPrice: unitPriceReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
