import React, { useState, useEffect } from "react";
import "./RouteGalleryPage.css";
import { useSelector, useDispatch } from "react-redux";
import { savePhotos, getPhotosByRouteId } from "../../redux/actions/routeActions";
import { resetGalleryState } from "../../redux/actions/galleryActions";
import PhotoPreview from "../gallery/PhotoPreview";
import Sidebar from "../sidebar/Sidebar";
import useSidebarState from "../sidebar/useSidebarState";
import GallerySidebar from "../gallery/GallerySidebar";
import { fetchPhotos, uploadPhotos } from "../../redux/actions/routeGalleryActions";

export default function RoutesGalleryPage(props) {
  const dispatch = useDispatch();
  const [routeId, setRouteId] = useState("");
  const photos = useSelector(state => state.routeGallery.photos);
  const fetchStatus = useSelector(state => state.routeGallery.status);
  const error = useSelector(state => state.routeGallery.error);

  const [openSidebar, closeSidebar] = useSidebarState();

  useEffect(() => {
    const currentRouteId = props.match.params.id;
    setRouteId(currentRouteId);

    if(fetchStatus === 'idle') {
      dispatch(fetchPhotos(getPhotosByRouteId, currentRouteId, 5))
    }
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

  let content;

  if (fetchStatus === 'pending') {
    content = <div>Loading...</div>
  } else if (fetchStatus === 'succeeded') {
    content = <GallerySidebar onSubmit={handleSubmit} />
  } else if (fetchStatus === 'failed') {
    content = <div>Error</div>
  }

  async function handleSubmit(e, photoToUpload) {
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
  }

  return (
    <div className="routeGalleryPage">
      <Sidebar>
        {content}
      </Sidebar>
      {photos && <PhotoPreview />}
    </div>
  );
}
