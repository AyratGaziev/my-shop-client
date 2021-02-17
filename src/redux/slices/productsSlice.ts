import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ProductsListType } from '../../types'
import url from '../../url'

type SomeProductRequsetType = {
    start: number,
    limit: number
}

const initialState: ProductsListType = []

export const getAllProducts = createAsyncThunk(
    'products/GetAll',
    async () => {
        const response = await axios.get(`${url}products`)
        console.log(response);        
        return (response.data) as ProductsListType
    } 
)

export const getSomeProducts = createAsyncThunk<ProductsListType, SomeProductRequsetType>(
    'products/GetSome',
    async ({ limit, start }) => {
        const response = await axios.get(`${url}products/some/limit/${limit}/start/${start}`)            
        return( response.data) as ProductsListType
    }
)


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProducts.fulfilled, (state, action: PayloadAction<ProductsListType>) => {
            return action.payload
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            console.log(action.payload);            
        })
        builder.addCase(getSomeProducts.fulfilled, (state, action: PayloadAction<ProductsListType>) => {
            return state.concat(action.payload)
        })
    }
})

export default productsSlice.reducer