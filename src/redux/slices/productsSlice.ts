import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { 
    CartCountUpdateType,
    CartItemType,
    ProductCategoryType, 
    ProductRequsetType,     
    ProductsState,
    ProdResonseType,
    ProductRequsetByIdType,
    ProductDataType} from '../../types'
import url from '../../url'



const initialState = {
    allProducts: {
        loadingStatus: 'idle',
        products: [],
        start: 0
    },
    notebooks: {
        loadingStatus: 'idle',
        products: [],
        start: 0
    },
    phones: {
        loadingStatus: 'idle',
        products: [],
        start: 0
    },
    tvs: {
        loadingStatus: 'idle',
        products: [],
        start: 0
    },
    search: {
        loadingStatus: 'idle',
        products: [],
        start: 0
    },
    loading: false,
    productOverview: {
        _id: '',
        category: '',
        description: '',
        discount: 0,
        features: [
            {
                _id: '',
                descrition: '',
                name: ''
            }
        ],
        img: '',
        name: '',
        price: 0
    },
    cart: []
} as ProductsState
    

export const getSomeProducts = createAsyncThunk(
    'products/GetSome',
    async (params: ProductRequsetType) => {
        
        if (params.category === 'search' && params.searchText !== '') { 
            const response = await axios.get(`${url}products/some/limit/${params.limit}/start/${params.start}/category/${params.category}/searchText/${params.searchText}`)            
            return( response.data) as ProdResonseType            
        } else {
            const response = await axios.get(`${url}products/some/limit/${params.limit}/start/${params.start}/category/${params.category}`)            
            return( response.data) as ProdResonseType  
        }
        
    }
)

export const getOneProductByID = createAsyncThunk(
    'products/getOneProductByID',
    async (params: ProductRequsetByIdType) => {        
        const response = await axios.get(`${url}products/prodId/${params.id}`)            
        return( response.data) as ProductDataType 
    }
)

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
        setStart: (state, action: PayloadAction<ProductCategoryType>) => {    
            state[action.payload].start = state[action.payload].products.length
        },
        addToCart: (state: ProductsState, action: PayloadAction<CartItemType>) => {
            const itemOnCart = state.cart.findIndex(({ prodId }) => prodId === action.payload.prodId)
            if (itemOnCart === -1) {
                state.cart.push(action.payload)
            } else if(itemOnCart >= 0) {
                state.cart[itemOnCart] = action.payload
            }
        },
        updateInCartCount: (state: ProductsState, action:    PayloadAction<CartCountUpdateType>) => {
            const itemIdx = state.cart.findIndex(({ prodId }) => prodId === action.payload.id)
            
            
            if (itemIdx !== -1) {
                state.cart[itemIdx].productCount = action.payload.count
            }
        },
        deleteFromCart: (state: ProductsState, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item.prodId !== action.payload)
        },
        setNewSearch: (state: ProductsState) => {
            state.search.start = 0
            state.search.products = []
        }
    },
    extraReducers: builder => {

        //GET some products, skip some limited response
        builder.addCase(getSomeProducts.pending, (state: ProductsState) => {
            state.loading = true          
        })
        builder.addCase(getSomeProducts.fulfilled, (state: ProductsState, action: PayloadAction<ProdResonseType>) => {
            if (action.payload.done) {
                state[action.payload.category].loadingStatus = 'done'
                state[action.payload.category].products = [...state[action.payload.category].products, ...action.payload.products] 
                state.loading = false  
            } else {
                state[action.payload.category].loadingStatus = 'succeeded'
                state[action.payload.category].products = [...state[action.payload.category].products, ...action.payload.products]
                state.loading = false 
            }
        })

        //GET one product by ID
        builder.addCase(
            getOneProductByID.pending,
            (state: ProductsState) => {
                state.loading = true
            }
        )
        builder.addCase(
            getOneProductByID.fulfilled,
            (state: ProductsState, action: PayloadAction<ProductDataType>) => {
                state.productOverview = action.payload
                state.loading = false
            }
        )
    }
})

export const {
    setStart,
    addToCart,
    updateInCartCount,
    deleteFromCart,
    setNewSearch} = productsSlice.actions

export default productsSlice.reducer