import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ProductsListType, SomeProductsType } from '../../types'
import url from '../../url'

type ProductRequsetType = {
    start: number
    limit: number
    category: string
}

type ProductsState = {
    allProducts: SomeProductsType
    notebooks: SomeProductsType
    phones: SomeProductsType
    tvs: SomeProductsType    
    loading: boolean
}

type category = 'allProducts' | 'notebooks' | 'phones' | 'tvs'

type ProdResonseType = {
    products: ProductsListType
    done: boolean,
    category: category
}

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
    loading: false
} as ProductsState
    

export const getSomeProducts = createAsyncThunk(
    'products/GetSome',
    async (params: ProductRequsetType) => {
        const response = await axios.get(`${url}products/some/limit/${params.limit}/start/${params.start}/category/${params.category}`)            
        return( response.data) as ProdResonseType
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setStart: (state, action: PayloadAction<category>) => {
            console.log('payload ' + action.payload);
            
            state[action.payload].start = state[action.payload].products.length
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
    }
})

export const {setStart} = productsSlice.actions

export default productsSlice.reducer