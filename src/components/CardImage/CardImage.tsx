import React, { useEffect, useState } from "react";
import "./CardImage.css";

type ImageItemType = {
    fullUrl: string;
    placeholderHeight: number;
};

const CardImage: React.FC<ImageItemType> = ({ fullUrl, placeholderHeight }) => {
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
            className="image"
            style={placeholderStyle}
            src={`${fullUrl}`}
            alt="item"
        />
    ) : (
        <div style={placeholderStyle} className="placeholder"></div>
    );

    return <div>{showImg}</div>;
};

export default CardImage;
