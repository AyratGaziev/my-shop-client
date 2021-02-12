import React, { useEffect, useState } from 'react';
import './ImageItem.css'

const ImageItem = ({ fullUrl, placeholderHeight }) => {

  const [imgStatus, setImgStatus] = useState(false)

    
    useEffect(() => {
        const img = new Image()
        img.src = `${fullUrl}`
        img.onload = () => {
            setImgStatus(true)
        }
    
    }, [fullUrl])

    const placeholderStyle = {
        height: `${placeholderHeight}px`
    }

    const showImg = (
        imgStatus
            ? <img className = "image" src={`${fullUrl}`} alt='item' />
            : <div
                style={placeholderStyle}
                className="placeholder"></div>
    )


    return (
        <div>
            {showImg}
        </div>
    );
}

export default ImageItem;
