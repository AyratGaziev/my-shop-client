import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { payForOrder } from "../../redux/slices/ordrersSlice";
import {
    clearCart,
    deleteFromCart,
    updateInCartCount
} from "../../redux/slices/productsSlice";
import { RootState } from "../../redux/store/store";
import url from "../../url";
import ImageItem from "../Image/ImageItem";
import "./Cart.css";
import { ReactComponent as EmptyCart } from "./empty-cart.svg";

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.products.cart);

    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.user.id);

    const decreaseProdCount = (id: string, count: number) => {
        if (count === 1) return;
        const newCount = count - 1;
        dispatch(updateInCartCount({ count: newCount, id }));
    };

    const increaseProdCount = (id: string, count: number) => {
        const newCount = count + 1;
        dispatch(updateInCartCount({ count: newCount, id }));
    };

    const totalSum =
        cartItems.length > 0
            ? cartItems
                  .map((item) => item.price * item.productCount)
                  .reduce((acc, item) => acc + item)
            : null;

    let cartList;

    const products =
        cartItems.length > 0
            ? cartItems.map((item) => {
                  const { name, prodId, price, productCount } = item;
                  return { name, prodId, price, count: productCount };
              })
            : null;

    if (cartItems.length > 0) {
        cartList = cartItems.map((item) => {
            return (
                <div key={item.prodId} className="cart__list-item">
                    <div className="cart__img">
                        <ImageItem
                            fullUrl={`${url}${item.imgURL}`}
                            placeholderHeight={100}
                        />
                    </div>
                    <Link
                        className="cart__list-name"
                        to={`/productOverview/${item.prodId}`}>
                        {item.name}
                    </Link>
                    <div className="cart__list-price">{`${item.price} ₽`}</div>
                    <div className="cart__counter">
                        <button
                            className="cart__counter-decr"
                            onClick={() =>
                                decreaseProdCount(
                                    item.prodId,
                                    item.productCount
                                )
                            }>
                            -
                        </button>
                        <input
                            value={item.productCount}
                            className="cart__counter-input"
                            type="text"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const prodValue = parseInt(e.target.value);
                                if (!isNaN(prodValue) && prodValue >= 1) {
                                    dispatch(
                                        updateInCartCount({
                                            count: prodValue,
                                            id: item.prodId
                                        })
                                    );
                                } else return;
                            }}
                        />
                        <button
                            className="cart__counter-incr"
                            onClick={() =>
                                increaseProdCount(
                                    item.prodId,
                                    item.productCount
                                )
                            }>
                            +
                        </button>
                        <button
                            onClick={() =>
                                dispatch(deleteFromCart(item.prodId))
                            }
                            className="cart__delete"></button>
                    </div>
                </div>
            );
        });

        return (
            <div className="cart">
                <h1>Корзина</h1>
                <div className="cart__list">{cartList}</div>
                <div className="cart__total">
                    <div className="cart__total-text">Итого к оплате:</div>
                    <div className="cart__total-price">{totalSum} ₽</div>
                </div>
                <Link
                    onClick={() => {
                        if (totalSum !== null && products !== null) {
                            dispatch(
                                payForOrder({
                                    userId,
                                    total: totalSum,
                                    products
                                })
                            );
                            dispatch(clearCart());
                        }
                    }}
                    to="/"
                    className="cart__pay-btn">
                    Оплатить
                </Link>
            </div>
        );
    } else {
        return (
            <div className="cart">
                <h1>В корзине нет товаров</h1>
                <EmptyCart className="cart__empty" />
            </div>
        );
    }
};

export default Cart;
