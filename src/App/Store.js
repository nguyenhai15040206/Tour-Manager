import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../features/Admins/Slices/SliceAddress";
import employeeReducer from "../features/Admins/Slices/SliceEmployee";
import tourReducer from "../features/Admins/Slices/SliceTour";
import touristAttrReducer from "../features/Admins/Slices/SliceTouristAttraction";
import customerReducer from "../features/Clients/Customers/SliceCustomer";

export default configureStore({
  reducer: {
    customer: customerReducer,
    employee: employeeReducer,
    tour: tourReducer,
    touristAttraction: touristAttrReducer,
    address: addressReducer,
  },
});
