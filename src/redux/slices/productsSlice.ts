import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
    CartCountUpdateType,
    CartItemType,
    ProductCategoryType,
    ProductRequsetType,
    ProductsState,
    ProdResonseType,
    ProductRequsetByIdType,
    ProductWithReviewsType,
    OneReviewRequsetType,
    OneReviewResponseType,
    ErrorPayloadType
} from "../../Types/ProductTypes";
import url from "../../url";

const initialState = {
    allProducts: {
        loadingStatus: "idle",
        products: [],
        start: 0
    },
    notebooks: {
        loadingStatus: "idle",
        products: [],
        start: 0
    },
    phones: {
        loadingStatus: "idle",
        products: [],
        start: 0
    },
    tvs: {
        loadingStatus: "idle",
        products: [],
        start: 0
    },
    search: {
        loadingStatus: "idle",
        products: [],
        start: 0
    },
    loading: false,
    productOverview: {
        product: {
            _id: "",
            category: "",
            description: "",
            discount: 0,
            features: [
                {
                    _id: "",
                    descrition: "",
                    name: ""
                }
            ],
            img: "",
            name: "",
            price: 0
        },
        reviews: []
    },
    cart: [],
    message: ""
} as ProductsState;

export const getSomeProducts = createAsyncThunk(
    "products/GetSome",
    async (params: ProductRequsetType) => {
        if (params.category === "search" && params.searchText !== "") {
            const response = await axios.get(
                `${url}products/some/limit/${params.limit}/start/${params.start}/category/${params.category}/sort/${params.sort}/searchText/${params.searchText}`
            );
            return response.data as ProdResonseType;
        } else {
            const response = await axios.get(
                `${url}products/some/limit/${params.limit}/start/${params.start}/category/${params.category}/sort/${params.sort}`
            );
            return response.data as ProdResonseType;
        }
    }
);

export const getOneProductByID = createAsyncThunk(
    "products/getOneProductByID",
    async (params: ProductRequsetByIdType, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${url}products/prodId/${params.id}`
            );
            return response.data as ProductWithReviewsType;
        } catch (e) {
            if (!e.response) {
                throw e;
            }
            return rejectWithValue(e.response.data);
        }
    }
);

export const addNewReview = createAsyncThunk(
    "products/addNewReview",
    async (newReview: OneReviewRequsetType, { rejectWithValue }) => {
        const { advantages, comments, limitations, name, prodId } = newReview;

        try {
            const response = await axios.post(
                `${url}reviews/add`,
                {
                    advantages,
                    comments,
                    limitations,
                    name,
                    prodId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            return response.data as OneReviewResponseType;
        } catch (e) {
            if (!e.response) {
                throw e;
            }
            return rejectWithValue(e.response.data);
        }
    }
);

// export const getSearchProducts = createAsyncThunk(
//     'products/Search',
//     async (params: ProdSearchRequestType) => {
//         const response = await axios.get(`${url}products/serach/limit/${params.limit}/start/${params.start}/searchText/${params.searchText}`)
//         return (response.data) as ProdSearchResonseType
//     }
// )

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearProductMessage: (state) => {
            state.message = "";
        },
        setStart: (state, action: PayloadAction<ProductCategoryType>) => {
            state[action.payload].start = state[action.payload].products.length;
        },
        setNewStart: (state, action: PayloadAction<ProductCategoryType>) => {
            state[action.payload].start = 0;
            state[action.payload].products = [];
        },
        addToCart: (
            state: ProductsState,
            action: PayloadAction<CartItemType>
        ) => {
            const itemOnCart = state.cart.findIndex(
                ({ prodId }) => prodId === action.payload.prodId
            );
            if (itemOnCart === -1) {
                state.cart.push(action.payload);
            } else if (itemOnCart >= 0) {
                state.cart[itemOnCart] = action.payload;
            }
        },
        updateInCartCount: (
            state: ProductsState,
            action: PayloadAction<CartCountUpdateType>
        ) => {
            const itemIdx = state.cart.findIndex(
                ({ prodId }) => prodId === action.payload.id
            );

            if (itemIdx !== -1) {
                state.cart[itemIdx].productCount = action.payload.count;
            }
        },
        deleteFromCart: (
            state: ProductsState,
            action: PayloadAction<string>
        ) => {
            state.cart = state.cart.filter(
                (item) => item.prodId !== action.payload
            );
        },
        setNewSearch: (state: ProductsState) => {
            state.search.start = 0;
            state.search.products = [];
        }
    },
    extraReducers: (builder) => {
        //GET some products, skip some limited response
        builder.addCase(getSomeProducts.pending, (state: ProductsState) => {
            state.loading = true;
        });
        builder.addCase(
            getSomeProducts.fulfilled,
            (state: ProductsState, action: PayloadAction<ProdResonseType>) => {
                if (action.payload.done) {
                    state[action.payload.category].loadingStatus = "done";
                    state[action.payload.category].products = [
                        ...state[action.payload.category].products,
                        ...action.payload.products
                    ];
                    state.loading = false;
                } else {
                    state[action.payload.category].loadingStatus = "succeeded";
                    state[action.payload.category].products = [
                        ...state[action.payload.category].products,
                        ...action.payload.products
                    ];
                    state.loading = false;
                }
            }
        );

        //GET one product by ID
        builder.addCase(getOneProductByID.pending, (state: ProductsState) => {
            state.loading = true;
        });
        builder.addCase(
            getOneProductByID.fulfilled,
            (
                state: ProductsState,
                action: PayloadAction<ProductWithReviewsType>
            ) => {
                state.productOverview = action.payload;
                state.loading = false;
            }
        );
        builder.addCase(getOneProductByID.rejected, (state: ProductsState) => {
            state.loading = false;
        });
        //POST Reviews
        builder.addCase(addNewReview.pending, (state: ProductsState) => {
            state.loading = true;
        });
        builder.addCase(
            addNewReview.fulfilled,
            (
                state: ProductsState,
                action: PayloadAction<OneReviewResponseType>
            ) => {
                state.productOverview.reviews.push(action.payload);
                state.loading = false;
            }
        );
        builder.addCase(
            addNewReview.rejected,
            (state, action: PayloadAction<ErrorPayloadType> | any) => {
                state.message = action.payload.message || action.payload;
            }
        );
    }
});

export const {
    setStart,
    addToCart,
    updateInCartCount,
    deleteFromCart,
    setNewSearch,
    setNewStart,
    clearProductMessage
} = productsSlice.actions;

export default productsSlice.reducer;
