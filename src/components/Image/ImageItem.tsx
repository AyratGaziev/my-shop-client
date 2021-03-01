import React, { useEffect, useState } from 'react';
import './ImageItem.css'

type ImageItemType = {
    fullUrl: string,
    placeholderHeight: number
}

const ImageItem: React.FC<ImageItemType> = ({ fullUrl, placeholderHeight }) => {

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
        // maxHeight: `${placeholderWidth/1.1}px`        
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
