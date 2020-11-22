import React, { useState, useEffect } from "react";
import "./GallerySidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto } from "../../redux/actions/galleryActions";

export default function GallerySidebar() {
  const sidebarSize = useSidebarSize();
  const [imgWidth, setImgWidth] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const gallery = useSelector(({ gallery }) => gallery);

  useEffect(() => {
    (function calculatePhotoWidth() {
      const IMG_AMOUNT = 2;
      const IMG_GAP = 22;
      let imgWidth =
        (sidebarSize.width - IMG_GAP * (IMG_AMOUNT - 1)) / IMG_AMOUNT;
      setImgWidth(imgWidth);
    })();
  }, [sidebarSize]);

  useEffect(() => {
    if (gallery && gallery.photos && !gallery.selectedPhoto) {
      selectImage(gallery.photos[0], 0);
    }
  }, [gallery.photos]);

  useEffect(() => {
    if (gallery && gallery.photos) {
      setSelectedImage(gallery.selectedPhoto);
    }
  }, [gallery.selectedPhoto]);

  function selectImage(photo, index) {
    const photoObj = { ...photo, index };
    setSelectedImage(photoObj);
    dispatch(selectPhoto(photoObj));
  }

  return (
    <div className="gallerySidebar">
      {gallery &&
        gallery.photos &&
        gallery.photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => selectImage(photo, index)}
            className="gallerySidebar__photo"
            style={{
              backgroundImage: `url(${photo.photoUrl})`,
              width: `${imgWidth}px`,
              height: `${imgWidth}px`,
              border: `${
                selectedImage.id === photo.id
                  ? "3px solid black"
                  : "3px solid transparent"
              }`,
            }}
            alt={photo.photoUrl}
            src={photo.photoUrl}
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

    const sidebarElement = document.querySelector("#sidebar .gallerySidebar");

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return sidebarSize;
}
