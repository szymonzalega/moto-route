import React, { useState, useEffect } from "react";
import "./Gallery.css";

export default function Gallery({ photos }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgWidth, setImgWidth] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    (function calculatePhotoWidth() {
      const IMG_AMOUNT = 10;
      const IMG_GAP = 10;
      let imgWidth = (windowSize.width - (IMG_GAP * (IMG_AMOUNT - 1))) / IMG_AMOUNT;
      setImgWidth(imgWidth);
    })()
  }, [windowSize])

  function selectImage(photoUrl) {
    setSelectedImg(photoUrl);
  }
  

  return (
    <div className="gallery">
      <div className="gallery__bigPhoto">
        {selectedImg && <div className="bigPhoto__photo" style={{backgroundImage: `url(${selectedImg})`}}></div>}
      </div>
      <div className="gallery__photoList">
        {photos.map(({photoUrl}) => (
          <div onClick={() => selectImage(photoUrl)} className="photoList__photo" style={{backgroundImage: `url(${photoUrl})`, width: `${imgWidth}px`, height: `${imgWidth}px`}} alt={photoUrl} src={photoUrl} />
        ))}
      </div>
    </div>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
