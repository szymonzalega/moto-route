import React, {useState, useEffect} from "react";
import "./GallerySidebar.css";
import { useDispatch } from "react-redux";
import {selectPhoto} from "../../redux/actions/galleryActions"


export default function GallerySidebar(props) {

    const sidebarSize = useSidebarSize();
    const [imgWidth, setImgWidth] = useState(0);
    const dispatch = useDispatch();


    useEffect(() => {
        (function calculatePhotoWidth() {
          const IMG_AMOUNT = 2;
          const IMG_GAP = 10;
          let imgWidth =
            (sidebarSize.width - IMG_GAP * (IMG_AMOUNT - 1)) / IMG_AMOUNT;
          setImgWidth(imgWidth);
        })();
      }, [sidebarSize]);


function selectImage(photoUrl){
    dispatch(selectPhoto(photoUrl));
}



  return (
    <div className="gallerySidebar">
      {props.photos.map(({ photoUrl }) => (
          <div
            onClick={() => selectImage(photoUrl)}
            className="gallerySidebar__photo"
            style={{
                backgroundImage: `url(${photoUrl})`,
                width: `${imgWidth}px`,
                height: `${imgWidth}px`,
              }}
            alt={photoUrl}
            src={photoUrl}
          />
        ))}
    </div>
  );
}


function useSidebarSize() {
    const [sidebarSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: sidebarElement.offsetWidth,
          height: sidebarElement.offsetHeight,
        });
      }

      const sidebarElement = document.querySelector("#sidebar .gallerySidebar")
  
      window.addEventListener("resize", handleResize);
  
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return sidebarSize;
  }