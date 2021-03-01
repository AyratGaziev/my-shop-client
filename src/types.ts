export type ProductDataType = {
  _id: string,
  name: string,
  price: number,
  discount: number,
  category: string,
  description: string,
  features: {_id: string, name:string, descrition:string}[]
  img: string
}
export type ProductsListType = ProductDataType[]
export type SomeProductsType = {
  loadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed' | 'done',
  products: ProductsListType
  start: number
}
export type ProductCategoryType = 'allProducts' | 'notebooks' | 'phones' | 'tvs' | 'search' 
export type CartItemType = {
  prodId: string,
  name: string,
  price: number,
  productCount: number,
  imgURL: string
}
export type CartType = CartItemType[]
export type CartCountUpdateType = {
  id: string,
  count: number
}
export type ProductRequsetType = {
  start: number
  limit: number
  category: string
  searchText?: string
}
export type ProdSearchRequestType = {
  start: number
  limit: number
  searchText: string
}
export type ProductsState = {
    allProducts: SomeProductsType
    notebooks: SomeProductsType
    phones: SomeProductsType
    tvs: SomeProductsType    
    search: SomeProductsType  
    loading: boolean
    cart: CartType
    productOverview: ProductDataType
}


export type ProdResonseType = {
    products: ProductsListType
    done: boolean,
    category: ProductCategoryType
}
export type ProdSearchResonseType = {
    products: ProductsListType
    done: boolean
}
export type ProductRequsetByIdType = {
  id: string
}