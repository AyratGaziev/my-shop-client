export type cartProductType = {
    prodId: string;
    name: string;
    price: number;
    count: number;
};
export type GetOrderType = {
    _id: string;
    userId: string;
    products: cartProductType[];
    total: number;
    date: string;
}[];
export type PostOrderType = {
    userId: string;
    products: cartProductType[];
    total: number;
};
export type GetOrderRequestType = {
    userId: string;
};
