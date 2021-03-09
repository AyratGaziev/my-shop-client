import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { OrderType } from "../../Types/OrdersTypes";
import qs from "qs";

import url from "../../url";

// const initialState = {
//     id: "",
//     roles: [""],
//     showLogin: false,
//     showRegister: false,
//     username: "",
//     loading: false,
//     message: ""
// } as UserStateType;

// export const payForOrder = createAsyncThunk(
//     "orders/payForOrder",
//     async (order: OrderType, { rejectWithValue }) => {
//         const { sum, clientid } = order;
//         const stringSum = sum.toString();
//         console.log(stringSum);

//         try {
//             const response = await axios.post(
//                 `https://demo.paykeeper.ru/create/`,
//                 qs.stringify({
//                     sum: stringSum,
//                     clientid,
//                     user_result_callback:
//                         "http://localhost:3000/products/allProducts"
//                 }),
//                 {
//                     headers: {
//                         "content-type": "application/x-www-form-urlencoded"
//                     }
//                 }
//             );
//             return response.data as any;
//         } catch (e) {
//             if (!e.response) {
//                 throw e;
//             }
//             return rejectWithValue(e.response.data);
//         }
//     }
// );

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        html: ""
    },
    reducers: {},
    extraReducers: (builder) => {}
});

// export const {
//     setShowLogin,
//     setShowRegister,
//     clearUserMessage
// } = userSlice.actions;

export default ordersSlice.reducer;
