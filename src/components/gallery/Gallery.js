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
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
