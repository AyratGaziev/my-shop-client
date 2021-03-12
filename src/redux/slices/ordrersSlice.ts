import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
    GetOrderRequestType,
    GetOrderType,
    OrdersStateType,
    PostOrderType
} from "../../Types/OrdersTypes";

import url from "../../url";

const initialState = {
    orders: [
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
    ],
    ordersLoading: false
} as OrdersStateType;

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
            payForOrder.pending,
            (state: OrdersStateType, action) => {
                state.ordersLoading = true;
            }
        );
        builder.addCase(
            payForOrder.fulfilled,
            (state: OrdersStateType, action: PayloadAction<GetOrderType>) => {
                state.orders = action.payload;
                state.ordersLoading = false;
            }
        );
        builder.addCase(
            payForOrder.rejected,
            (state: OrdersStateType, action) => {
                console.log(action.payload);
                state.ordersLoading = false;
            }
        );
        //GetOrders
        builder.addCase(getOrders.pending, (state: OrdersStateType, action) => {
            state.ordersLoading = true;
        });
        builder.addCase(
            getOrders.fulfilled,
            (state: OrdersStateType, action: PayloadAction<GetOrderType>) => {
                state.orders = action.payload;
                state.ordersLoading = false;
            }
        );
        builder.addCase(
            getOrders.rejected,
            (state: OrdersStateType, action) => {
                console.log(action.payload);
                state.ordersLoading = false;
            }
        );
    }
});

export default ordersSlice.reducer;
