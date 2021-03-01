import React, {useState, useEffect} from 'react';
import './ProductOverview.css'
import { Link, RouteComponentProps } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from '../../redux/store/store';
import ImageItem from '../Image/ImageItem';
import url from '../../url';
import Price from '../Price/Price';
import { addToCart, getOneProductByID } from '../../redux/slices/productsSlice';
import Spinner from '../Spinner/Spinner';
import Reviews from '../Reviews/Reviews';
import AddReviews from '../AddReviews/AddReviews';

type PordParamsType = { id: string }

const ProductOverview: React.FC<RouteComponentProps<PordParamsType>> = ({ match }) => {

    const { id } = match.params

    const dispatch = useDispatch()

    useEffect(() => {
        if (id !== '') {
            dispatch(getOneProductByID({id}))
        } 
    },[id])
    
    // const products = useSelector((state: RootState) => state.products[category].products)
    const inCart = useSelector((state: RootState) => state.products.cart)
    const loading = useSelector((state: RootState): boolean => state.products.loading)
    
    const findInCart = inCart.findIndex(({ prodId }) => prodId === id)
    const notInCart = findInCart === -1 ? true : false
    
    let [productCount, setProductCount] = useState<number>(1)
    const [showAddToCart, setShowAddToCart] = useState<boolean>(notInCart)

    const increaseProdCount = () => setProductCount(productCount = productCount + 1)
    const decreaseProdCount = () => setProductCount(productCount = productCount === 1 ? 1 : productCount-1)
    
    // const product = products.find(prod => prod._id === id)
    const product = useSelector((state: RootState) => state.products.productOverview.product)
    const reviews = useSelector((state: RootState) => state.products.productOverview.reviews)


    if (product._id !== '' && id === product._id) {
        const {
            _id,
            name,
            price,
            img,
            features,
            discount,
            description } = product
        
        const totalPrice = Math.round(price * discount)

        const addToCartBtn = (
            <button
                onClick={() => {

                    setShowAddToCart(false)

                    dispatch(addToCart(
                        {
                            productCount,
                            prodId: _id,
                            name,
                            price: totalPrice,
                            imgURL: img
                        }
                    ))
                }}    
                className='product__cart-btn'>Добавить в корзину</button>
        )

        const moveToCartBtn = (
            <Link
                to='/cart'
                className = 'cart-link' >Перейти в корзину</Link>
        )

        const showBtns = showAddToCart ? addToCartBtn : moveToCartBtn     
        
        return (
            <div className='product'>
                <div className="product__wrapper">
                    <ImageItem fullUrl={`${url}${img}`} placeholderHeight={400} />
                    <div className="product__about">
                        <h1>{name}</h1>
                        <Price price={price} discount={discount} />
                        <div className="product__features">
                            {features.map(({name, descrition, _id}) => {
                                return (
                                    <div className = 'product__features-item' key = {_id}>
                                        <span className = 'product__features-name'>{name} : </span>
                                        <span className = 'product__features-descr'>{descrition}</span>       
                                    </div>
                                )
                            })}
                        </div>
                        <div className='product__counter'>
                            <button
                                className='product__counter-decr'
                                onClick={()=>decreaseProdCount()}>-</button>
                            <input
                                value={productCount}
                                className='product__counter-input'
                                type='text'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const prodValue = parseInt(e.target.value)
                                    if (!isNaN(prodValue) && prodValue >= 1) {
                                        setProductCount(parseInt(e.target.value))
                                    } else return
                                }} />
                            <button
                                className='product__counter-incr'
                                onClick={()=> increaseProdCount()} >+</button>
                        </div>
                        {showBtns}
                    </div>
                </div>    
                <div className="product__descr">{description}</div>
                <AddReviews pordId={_id}/>
                <Reviews reviews={reviews}/>
            </div>
        );
    } else if (loading) {
        return <Spinner/>
    }
    else if(product._id === '') {
        return (
            <h1>Product Not found</h1>
        )
    }    
    else {
        return null
    }
}

export default ProductOverview;

