import React from "react";
import "./Card.css";
import url from "../../url";
import ImageItem from "../Image/ImageItem";
import { ProductDataType } from "../../Types/ProductTypes";
import Price from "../Price/Price";

type CardPropsType = {
    product: ProductDataType;
};

const Card: React.FC<CardPropsType> = ({ product }) => {
    const prodItem = (
        <div className="card__text">
            <div className="card__title">{product.name}</div>
            <Price price={product.price} discount={product.discount} />
        </div>
    );

    return (
        <div className="card">
            <ImageItem
                fullUrl={`${url}${product.img}`}
                placeholderHeight={150}
            />
            {prodItem}
        </div>
    );
};

export default Card;
