import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/Admins/Slices/SliceEmployee";
import tourReducer from "../features/Admins/Slices/SliceTour";
import customerReducer from "../features/Clients/Customers/SliceCustomer";

export default configureStore({
  reducer: {
    customer: customerReducer,
    employee: employeeReducer,
    tour: tourReducer,
  },
});
