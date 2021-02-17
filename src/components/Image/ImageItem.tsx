import React, { useEffect, useState } from 'react';
import './ImageItem.css'

type ImageItemType = {
    fullUrl: string,
    placeholderWidth?: string
}

const ImageItem: React.FC<ImageItemType> = ({ fullUrl, placeholderWidth }) => {

  const [imgStatus, setImgStatus] = useState(false)

    
    useEffect(() => {
        const img = new Image()
        img.src = `${fullUrl}`
        img.onload = () => {
            setImgStatus(true)
        }
    
    }, [fullUrl])

    const placeholderStyle = {
        height: `${placeholderWidth}px`
    }

    const showImg = (
        imgStatus
            ? <img className = "image" style={placeholderStyle} src={`${fullUrl}`} alt='item' />
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
