import React, { useEffect, useState } from "react";
import "./ProductImage.css";

type ImageItemType = {
    fullUrl: string;
    placeholderHeight: number;
};

const ProductImage: React.FC<ImageItemType> = ({
    fullUrl,
    placeholderHeight
}) => {
    const [imgStatus, setImgStatus] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = `${fullUrl}`;
        const onImgLoad = () => {
            setImgStatus(true);
        };
        img.addEventListener("load", onImgLoad);
        return () => {
            img.removeEventListener("load", onImgLoad);
        };
    }, [fullUrl]);

    const placeholderStyle = {
        height: `${placeholderHeight}px`
    };

    const showImg = imgStatus ? (
        <img
            className="product__image"
            style={placeholderStyle}
            src={`${fullUrl}`}
            alt="item"
        />
    ) : (
        <div style={placeholderStyle} className="product__placeholder"></div>
    );

    return <div>{showImg}</div>;
};

export default ProductImage;
