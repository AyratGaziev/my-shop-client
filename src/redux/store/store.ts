import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slices/productsSlice";
import userReducer from "../slices/userSlice";
import ordersReducer from "../slices/ordrersSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer,
        orders: ordersReducer
    }
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
