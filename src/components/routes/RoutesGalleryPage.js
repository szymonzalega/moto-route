import React, { useState, useEffect } from "react";
import "./RouteGalleryPage.css";
import { useSelector, useDispatch } from "react-redux";
import { savePhotos } from "../../redux/actions/routeActions";
import { loadRoutePhotos, resetGalleryState } from "../../redux/actions/galleryActions";
import PhotoPreview from "../gallery/PhotoPreview";
import Sidebar from "../sidebar/Sidebar";
import useSidebarState from "../sidebar/useSidebarState";
import GallerySidebar from "../gallery/GallerySidebar";

export default function RoutesGalleryPage(props) {
  const [routeId, setRouteId] = useState("");
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery);

  const [openSidebar, closeSidebar] = useSidebarState();

  useEffect(() => {
    const currentRouteId = props.match.params.id;
    setRouteId(currentRouteId);

    (async () => {
      try {
        if (routeId) {
          await dispatch(loadRoutePhotos(routeId));
        }
      } catch (e) {
        console.error(`Loading routes failed ${e}`);
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

  async function handleSubmit(e, photoToUpload) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      // setLoading(true);
      let savePhotosResult = await savePhotos(routeId, photoToUpload);
      console.log(savePhotosResult);
      await dispatch(loadRoutePhotos(routeId));
      //   setLoading(false);
    } catch (e) {
      //   setLoading(false);
      console.error(`Failed to add new photos, ${e} `);
    }
  }

  return (
    <div className="routeGalleryPage">
      <Sidebar>
        <GallerySidebar onSubmit={handleSubmit} />
      </Sidebar>
      {/* {gallery.photos && <PhotoPreview />} */}
      <PhotoPreview />
    </div>
  );
}
