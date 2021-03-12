import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
    GetOrderRequestType,
    GetOrderType,
    PostOrderType
} from "../../Types/OrdersTypes";

import url from "../../url";

const initialState = [
    {
        _id: "",
        products: [
            {
                name: "",
                price: 0,
                prodId: "",
                count: 0
            }
        ],
        total: 0,
        userId: "",
        date: ""
    }
] as GetOrderType;

export const payForOrder = createAsyncThunk(
    "orders/payForOrder",
    async (order: PostOrderType, { rejectWithValue }) => {
        const { products, total, userId } = order;

        try {
            const response = await axios.post(
                `${url}setOrders`,
                {
                    products,
                    total,
                    userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            return response.data as GetOrderType;
        } catch (e) {
            if (!e.response) {
                throw e;
            }
            return rejectWithValue(e.response.data);
        }
    }
);

export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async (order: GetOrderRequestType, { rejectWithValue }) => {
        const { userId } = order;

        try {
            const response = await axios.get(`${url}orders/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data as GetOrderType;
        } catch (e) {
            if (!e.response) {
                throw e;
            }
            return rejectWithValue(e.response.data);
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Set Order
        builder.addCase(
            payForOrder.fulfilled,
            (state: GetOrderType, action: PayloadAction<GetOrderType>) => {
                console.log(action.payload);

                return action.payload;
            }
        );
        //GetOrders
        builder.addCase(
            getOrders.fulfilled,
            (state: GetOrderType, action: PayloadAction<GetOrderType>) => {
                return action.payload;
            }
        );
    }
});

// export const {
//     setShowLogin,
//     setShowRegister,
//     clearUserMessage
// } = userSlice.actions;

export default ordersSlice.reducer;
