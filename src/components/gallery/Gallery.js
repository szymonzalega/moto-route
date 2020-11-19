import React, { useState, useEffect } from "react";
import "./Gallery.css";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import useSidebarState from "../sidebar/useSidebarState";

export default function Gallery({ photos }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [photoList, setPhotoList] = useState([]);
  const [imgWidth, setImgWidth] = useState(0);
  const windowSize = useWindowSize();
  const [openSidebar, closeSidebar] = useSidebarState();


  useEffect(() => {
    (function calculatePhotoWidth() {
      const IMG_AMOUNT = 10;
      const IMG_GAP = 10;
      let imgWidth =
        (windowSize.width - IMG_GAP * (IMG_AMOUNT - 1)) / IMG_AMOUNT;
      setImgWidth(imgWidth);
    })();
  }, [windowSize]);


  function selectImage(photoUrl) {
    setSelectedImg(photoUrl);
  }

  useEffect(() => {
    function getPhotos() {
      return null;
    }
    if (photos) {
      setPhotoList(photos);
    } else {
      getPhotos();
    }
  }, []);

  function showNextPhoto() {}

  function showPrevPhoto() {}

  let url = "https://firebasestorage.googleapis.com/v0/b/moto-route-dev.appspot.com/o/historia_kredytu.JPG?alt=media&token=86fc1ea1-cf41-439f-ab22-15a32c074c8d"

  return (
    <div className="gallery">
      <div className="gallery__bigPhoto">
        {selectedImg && (
          <>
            <IconButton
              aria-label="more"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={showPrevPhoto}
            >
              <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </IconButton>
            <div
              className="bigPhoto__photo"
              style={{ backgroundImage: `url(${selectedImg})` }}
            ></div>
            <IconButton
              aria-label="more"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={showNextPhoto}
            >
              <NavigateNextIcon style={{ fontSize: 50 }} />
            </IconButton>
          </>
        )}
      </div>
      <div className="gallery__photoList">
        {/* {photos.map(({ photoUrl }) => (
          <div
            onClick={() => selectImage(photoUrl)}
            className="photoList__photo"
            style={{
              backgroundImage: `url(${photoUrl})`,
              width: `${imgWidth}px`,
              height: `${imgWidth}px`,
            }}
            alt={photoUrl}
            src={photoUrl}
          />
        ))} */}
        
          <div
            onClick={() => selectImage(url)}
            className="photoList__photo"
            style={{
              backgroundImage: `url(${url})`,
              width: `${imgWidth}px`,
              height: `${imgWidth}px`,
            }}
            alt={url}
            src={url}
          />
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
