import React, { useState, useEffect } from "react";
import "./RoutesGalleryPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import {
  getRoutesByUserId,
  savePhotosInRoute,
  getRoutePhotosByRouteId,
} from "../../../services/routeAPI";
import Content from "../../content/Content";
import PhotoPreview from "../../gallery/preview/PhotoPreview";
import Sidebar from "../../sidebar/Sidebar";
import useSidebarState from "../../sidebar/useSidebarState";
import GallerySidebar from "../../gallery/sidebar/GallerySidebar";
import {
  fetchSources,
  fetchPhotos,
  uploadPhotos,
  resetGalleryState,
} from "../../../redux/actions/galleryActions";
import { useParams } from "react-router-dom";

export default function RoutesGalleryPage(props) {
  const dispatch = useDispatch();
  const [lastVisible, setLastVisible] = useState("");
  const photos = useSelector((state) => state.gallery.photos);
  const sourceList = useSelector((state) => state.gallery.sources);
  let { id } = useParams();
  const { currentUser } = useAuth();
  const history = useHistory();

  const { openSidebar, closeSidebar } = useSidebarState();

  useEffect(() => {
    (async () => {
      await dispatch(fetchSources(getRoutesByUserId, currentUser.uid));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (id) {
        setLastVisible(
          await dispatch(fetchPhotos(getRoutePhotosByRouteId, id, 6))
        );
      }
    })();
  }, [id]);

  useEffect(() => {
    if (sourceList.length === 0) {
      closeSidebar();
    } else {
      const sidebar = {
        isOpen: true,
        mode: "gallery",
      };
      openSidebar(sidebar);
    }
  }, [sourceList]);

  //clean
  useEffect(() => {
    return () => {
      dispatch(resetGalleryState());
      closeSidebar();
    };
  }, []);

  const selectRoute = (route) => {
    history.push(`/index/gallery/routes/${route.id}`);
  };

  const getMorePhotos = async () => {
    setLastVisible(
      await dispatch(fetchPhotos(getRoutePhotosByRouteId, id, 6, lastVisible))
    );
  };

  const handleUpload = async (e, photoToUpload) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      await dispatch(uploadPhotos(savePhotosInRoute, id, photoToUpload));
    } catch (e) {
      console.error(`Failed to add new photos, ${e} `);
    }
  };

  return (
    <div className="galleryPage">
      <Sidebar>
        <GallerySidebar
          onSourceSelect={selectRoute}
          onUpload={handleUpload}
          getMorePhotos={getMorePhotos}
          isMorePhotosAvailable={lastVisible}
        />
      </Sidebar>

      <Content>{photos && <PhotoPreview />}</Content>
    </div>
  );
}
