import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {} from "../../Types/ProductTypes";
import {
    authCheckUserResponseType,
    loginUserResponseType,
    regNewUserRequsetType,
    regNewUserResponseType,
    UserStateType
} from "../../Types/UsersType";
import url from "../../url";

const initialState = {
    id: "",
    roles: [""],
    showLogin: false,
    showRegister: false,
    username: "",
    loading: false,
    message: ""
} as UserStateType;

export const regNewUser = createAsyncThunk(
    "user/regNewUser",
    async (newUser: regNewUserRequsetType, { rejectWithValue }) => {
        const { username, password } = newUser;

        try {
            const response = await axios.post(`${url}registration`, {
                username,
                password
            });
            return response.data as regNewUserResponseType;
        } catch (e) {
            if (!e.response) {
                throw e;
            }
            return rejectWithValue(e.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (newUser: regNewUserRequsetType, { rejectWithValue }) => {
        const { username, password } = newUser;

        try {
            const response = await axios.post(`${url}login`, {
                username,
                password
            });
            return response.data as loginUserResponseType;
        } catch (e) {
            if (!e.response) {
                throw e;
            }
            return rejectWithValue(e.response.data);
        }
    }
);

export const authCheck = createAsyncThunk(
    "user/authCheck",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}isAuth`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data as authCheckUserResponseType;
        } catch (e) {
            if (!e.response) {
                throw e;
            }
            return rejectWithValue(e.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setShowLogin: (state) => {
            state.showLogin = !state.showLogin;
        },
        userLogout: (state) => {
            state.id = "";
            state.roles = [];
            state.username = "";
        },
        setShowRegister: (state) => {
            state.showRegister = !state.showRegister;
        },
        clearUserMessage: (state) => {
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        //Registration new User
        builder.addCase(regNewUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(
            regNewUser.fulfilled,
            (
                state: UserStateType,
                action: PayloadAction<regNewUserResponseType>
            ) => {
                state.message = action.payload.message;
                state.loading = false;
            }
        );
        builder.addCase(regNewUser.rejected, (state: UserStateType, action) => {
            console.log(action.payload);
        });

        //Login User
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(
            loginUser.fulfilled,
            (
                state: UserStateType,
                action: PayloadAction<loginUserResponseType>
            ) => {
                state.id = action.payload.id;
                state.username = action.payload.name;
                state.roles = action.payload.role;
                state.loading = false;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("id", action.payload.id);
            }
        );
        builder.addCase(loginUser.rejected, (state: UserStateType, action) => {
            console.log(action.payload);
        });
        //CheckAuth
        builder.addCase(authCheck.pending, (state: UserStateType, action) => {
            state.loading = true;
        });
        builder.addCase(
            authCheck.fulfilled,
            (
                state: UserStateType,
                action: PayloadAction<authCheckUserResponseType>
            ) => {
                state.id = action.payload.id;
                state.username = action.payload.name;
                state.roles = action.payload.role;
                state.loading = false;
            }
        );
        builder.addCase(authCheck.rejected, (state: UserStateType, action) => {
            state.loading = false;
            console.log(action.payload);
        });
    }
});

export const {
    setShowLogin,
    setShowRegister,
    clearUserMessage,
    userLogout
} = userSlice.actions;

export default userSlice.reducer;
