import React, { useState, useEffect } from "react";
import "./RouteGalleryPage.css";
import { useSelector, useDispatch } from "react-redux";
import { savePhotos, getPhotosByRouteId, getMorePhotosByRouteId } from "../../redux/actions/routeActions";
import { resetGalleryState } from "../../redux/actions/galleryActions";
import PhotoPreview from "../gallery/PhotoPreview";
import Sidebar from "../sidebar/Sidebar";
import useSidebarState from "../sidebar/useSidebarState";
import GallerySidebar from "../gallery/GallerySidebar";
import { fetchPhotos, uploadPhotos } from "../../redux/actions/routeGalleryActions";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function RoutesGalleryPage(props) {
  const dispatch = useDispatch();
  const [routeId, setRouteId] = useState("");
  const [lastVisible, setLastVisible] = useState("");
  const photos = useSelector(state => state.routeGallery.photos);
  const fetchStatus = useSelector(state => state.routeGallery.status);
  const error = useSelector(state => state.routeGallery.error);

  const [openSidebar, closeSidebar] = useSidebarState();

  useEffect(() => {
    const xx = async () => {
      const currentRouteId = props.match.params.id;
      setRouteId(currentRouteId);
  
      if(fetchStatus === 'idle') {
        setLastVisible(await dispatch(fetchPhotos(getPhotosByRouteId, currentRouteId, 5)));
      }
    }
    xx();
    
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
    const x = await dispatch(fetchPhotos(getMorePhotosByRouteId, routeId, 5, lastVisible));
    setLastVisible(x);
  }

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
  }

  let content;

  if (fetchStatus === 'pending') {
    content = <div className="routeGalleryPage__infoSection"><CircularProgress /></div>
  } else if (fetchStatus === 'succeeded') {
    content = <GallerySidebar onSubmit={handleSubmit} getMorePhotos={getMorePhotos}/>
  } else if (fetchStatus === 'failed') {
    content = <div className="routeGalleryPage__infoSection routeGalleryPage__infoSection--error">Error while showing photos</div>
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
