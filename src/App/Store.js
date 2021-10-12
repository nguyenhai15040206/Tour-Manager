import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/Clients/Customers/SliceCustomer";

export default configureStore({
  reducer: {
    customer: customerReducer,
  },
});
