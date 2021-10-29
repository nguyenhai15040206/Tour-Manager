import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/Admins/Slices/SliceEmployee";
import customerReducer from "../features/Clients/Customers/SliceCustomer";

export default configureStore({
  reducer: {
    customer: customerReducer,
    employee: employeeReducer,
  },
});
