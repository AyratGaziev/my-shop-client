import React from 'react';
import './Card.css'
import url from '../../url';
import ImageItem from '../Image/ImageItem'
import {ProductDataType} from '../../types'

type CardType = {
  product: ProductDataType
}

const Card: React.FC<CardType> = ({product}) => {  

  
  const discount = product.discount < 1
    ? (<>
        <div className="card__old-price">{`${product.price} ₽`}</div>
        <div className="card__discount-price">{ `${Math.floor(product.price * product.discount)} ₽`}</div>
      </>) 
    : <div className="card__standard-price">{`${product.price} ₽`}</div>

  const prodItem = (
    <div className="card__text">
      <div className="card__title">{product.name}</div>
      <div className="card__price">
        {discount}
      </div>      
    </div>
  )
  

  return (
    <div className="card"> 
      <ImageItem fullUrl={`${url}${product.img}`} placeholderWidth={'150'} />
      {prodItem}      
    </div>
  );
}

export default Card;
