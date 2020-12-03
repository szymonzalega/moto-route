import React, { useState, useEffect } from "react";
import "./RoutesGalleryPage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  savePhotos,
  getPhotosByRouteId,
  getMorePhotosByRouteId,
} from "../../../redux/actions/routeActions";
import PhotoPreview from "../../gallery/PhotoPreview";
import Sidebar from "../../sidebar/Sidebar";
import useSidebarState from "../../sidebar/useSidebarState";
import GallerySidebar from "../../gallery/sidebar/GallerySidebar";
import {
  fetchPhotos,
  uploadPhotos,
  resetGalleryState,
} from "../../../redux/actions/galleryActions";

export default function RoutesGalleryPage(props) {
  const dispatch = useDispatch();
  const [routeId, setRouteId] = useState("");
  const [lastVisible, setLastVisible] = useState("");
  const photos = useSelector((state) => state.routeGallery.photos);
  const fetchStatus = useSelector((state) => state.routeGallery.status);
  const error = useSelector((state) => state.routeGallery.error);

  const { openSidebar } = useSidebarState();

  useEffect(() => {
    (async () => {
      const currentRouteId = props.match.params.id;
      setRouteId(currentRouteId);

      if (fetchStatus === "idle") {
        setLastVisible(
          await dispatch(fetchPhotos(getPhotosByRouteId, currentRouteId, 6))
        );
      }
    })();
  }, [dispatch, routeId, props.match.params.id]);

  useEffect(() => {
    const sidebar = {
      isOpen: true,
      mode: "gallery",
      routeId,
    };
    openSidebar(sidebar);

    //onDestroy
    return () => {
      const sidebar = {
        isOpen: true,
        mode: "details",
        routeId,
      };
      dispatch(resetGalleryState());
      openSidebar(sidebar);
    };
  }, [routeId]);

  const getMorePhotos = async () => {
    setLastVisible(
      await dispatch(
        fetchPhotos(getMorePhotosByRouteId, routeId, 6, lastVisible)
      )
    );
  };

  const handleSubmit = async (e, photoToUpload) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      //todo obsluga bledow i obsluga ladowania
      await dispatch(uploadPhotos(savePhotos, routeId, photoToUpload));
    } catch (e) {
      console.error(`Failed to add new photos, ${e} `);
    }
  };

  return (
    <div className="routeGalleryPage">
      <Sidebar>
        <GallerySidebar
          onSubmit={handleSubmit}
          getMorePhotos={getMorePhotos}
          isMorePhotosAvailable={lastVisible}
        />
      </Sidebar>
      {photos && <PhotoPreview />}
    </div>
  );
}
