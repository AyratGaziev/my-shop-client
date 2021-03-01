import React from 'react';
import './Price.css'

type PricePropsType = {
    discount: number,
    price: number,

}

const Price: React.FC<PricePropsType> = ({price,discount}) => {
    const totalPrice = discount < 1
    ? (<>
        <div className="price__old-price">{`${price} ₽`}</div>
        <div className="price__discount-price">{ `${Math.round(price * discount)} ₽`}</div>
      </>) 
    : <div className="price__standard-price">{`${price} ₽`}</div>
    return (
        <div className ='price'>
            {totalPrice}
        </div>
    );
}

export default Price;
