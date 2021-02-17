export type ProductDataType = {
  _id: string,
  name: string,
  price: number,
  discount: number,
  category: string,
  subcategory: string,
  description: string,
  features: {_id: string, name:string, descrition:string}[]
  img: string
}
export type ProductsListType = ProductDataType[]