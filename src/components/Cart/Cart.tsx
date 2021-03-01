import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteFromCart, updateInCartCount } from '../../redux/slices/productsSlice';
import { RootState } from '../../redux/store/store';
import url from '../../url';
import ImageItem from '../Image/ImageItem';
import './Cart.css'

const Cart: React.FC = () => {    
    
    const cartItems = useSelector((state: RootState) => state.products.cart)

    const dispatch = useDispatch()

    const decreaseProdCount = (id: string, count: number) => {
        if (count === 1) return
        const newCount = count - 1        
        dispatch(updateInCartCount({count: newCount, id}))
    }

    const increaseProdCount = (id: string, count: number) => {
        const newCount = count + 1
        dispatch(updateInCartCount({count: newCount, id}))
    }    

    let cartList    

    if (cartItems.length > 0) {
        cartList = cartItems.map(item => {
            return (
                <div key={item.prodId} className='cart__list-item'>
                    <div className='cart__img'>
                        <ImageItem fullUrl = {`${url}${item.imgURL}`} placeholderHeight = {100} />
                    </div>
                    <Link
                        className='cart__list-name'
                        to={`/productOverview/${item.prodId}`}>
                        {item.name}
                    </Link>
                    <div className ='cart__list-price'>{`${item.price} ₽`}</div>
                    <div className='cart__counter'>
                        <button
                            className='cart__counter-decr'
                            onClick={()=>decreaseProdCount(item.prodId, item.productCount)}>-</button>
                        <input
                            value={item.productCount}
                            className='cart__counter-input'
                            type='text'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const prodValue = parseInt(e.target.value)
                                if (!isNaN(prodValue) && prodValue >= 1) {
                                    dispatch(updateInCartCount({count: prodValue, id: item.prodId}))
                                } else return
                            }} />
                        <button
                            className='cart__counter-incr'
                            onClick={() => increaseProdCount(item.prodId, item.productCount)} >+</button>
                        <button
                            onClick={()=>dispatch(deleteFromCart(item.prodId))}
                            className='cart__delete'>                            
                        </button>
                    </div>
                </div>              
            )
        })

        return (
            <div className = 'cart'>
                <h1>Корзина</h1>
                <div className='cart__list'>
                    {cartList}
                </div>
                <div className='cart__total'>
                    <div className='cart__total-text'>Итого к оплате:</div>
                    <div className='cart__total-price'>{
                        cartItems
                            .map(item => item.price * item.productCount)
                            .reduce((acc, item) => acc+item)
                    } ₽</div>
                </div>
            </div>
        );

    } else {
        return (
            <div className='cart'>
                <h1>Корзина</h1>
                <h2>Нет товаров</h2>
            </div>
        )
    }    
}

export default Cart;
