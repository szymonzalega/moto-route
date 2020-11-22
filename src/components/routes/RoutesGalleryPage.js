import React, { useState, useEffect, useRef } from "react";
import "./RouteGalleryPage.css";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
  savePhotos,
  getPhotosByRouteId,
} from "../../redux/actions/routeActions";
import {loadRoutePhotos} from "../../redux/actions/galleryActions"
import Gallery from "../gallery/Gallery";
import Sidebar from "../sidebar/Sidebar";
import useSidebarState from "../sidebar/useSidebarState";
import GallerySidebar from "../gallery/GallerySidebar";


export default function RoutesGalleryPage(props) {
  const [routeId, setRouteId] = useState("");
  // const [photos, setPhotos] = useState([]);
  const [validated, setValidated] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.routes);
  const gallery = useSelector((state) => state.gallery);

  const photosRef = useRef();
const [openSidebar, closeSidebar] = useSidebarState();


  // useEffect(() => {
  //   const currentRouteId = props.match.params.id;
  //   setRouteId(currentRouteId);
    
  //   (async () => {
  //       if (routeId) {
  //         setPhotos(await getPhotosByRouteId(routeId, 10));
  //       }
  //     })();
  // }, [props.match.params.id, routeId]);

  useEffect(() => {
    const currentRouteId = props.match.params.id;
    setRouteId(currentRouteId);

    (async () => {
      try {
        // if (gallery && gallery.photos && gallery.photos.length === 0 && routeId) {
        //   await dispatch(loadRoutePhotos(routeId));
        // }
        if(routeId) {
          await dispatch(loadRoutePhotos(routeId));
        }
      } catch (e) {
        console.error(`Loading routes failed ${e}`);
      }
    })();
  }, [dispatch, routeId, props.match.params.id])
  
  useEffect(() => {
    const sidebar = {
      isOpen: true,
      mode: "gallery"
    };
    openSidebar(sidebar);
  }, [])

  function selectPhoto(photoUrl) {
    setSelectedPhoto(photoUrl);
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //   setValidated(true);

  //   try {
  //     // setLoading(true);
  //     let savePhotosResult = await savePhotos(
  //       routeId,
  //       photosRef.current.files
  //     );
  //     console.log(savePhotosResult);
  //     setPhotos(await getPhotosByRouteId(routeId, 10));
  //     //   setLoading(false);
  //   } catch (e) {
  //     //   setLoading(false);
  //     console.error(`Failed to add new photos, ${e} `);
  //   }
  // }

  return (
    <div className="routeGalleryPage">
        <Sidebar>
          <GallerySidebar />
        </Sidebar>
      {gallery.photos && <Gallery />}
      {/* {<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group id="photos">
          <Form.Label>Photos</Form.Label>
          <Form.File
            id="exampleFormControlFile1"
            label="Example file input"
            ref={photosRef}
            multiple
          />
        </Form.Group>
        <Button className="w-100" type="submit">
          Add photos
        </Button>
      </Form>} */}
    </div>
    // <div>
    //   Routes Gallery {props.match.params.id}
    //   name: {route && <div>{route.name}</div>}
    //   {selectedPhoto && (
    //     <div>
    //       <img
    //         style={{ width: "600px", height: "600px" }}
    //         alt={selectedPhoto}
    //         src={selectedPhoto}
    //       />
    //     </div>
    //   )}
    //   <div>
    //     {photos &&
    //       photos.map(({ photoUrl }, index) => (
    //         <img
    //           key={photoUrl}
    //           style={{ width: "200px", height: "200px" }}
    //           alt={index}
    //           src={photoUrl}
    //           onClick={() => selectPhoto(photoUrl)}
    //         />
    //       ))}
    //   </div>
    //   <Form noValidate validated={validated} onSubmit={handleSubmit}>
    //     <Form.Group id="photos">
    //       <Form.Label>Photos</Form.Label>
    //       <Form.File
    //         id="exampleFormControlFile1"
    //         label="Example file input"
    //         ref={photosRef}
    //         multiple
    //       />
    //       {/* <Form.Control.Feedback type="invalid">
    //           To pole jest wymagane
    //         </Form.Control.Feedback> */}
    //     </Form.Group>
    //     <Button className="w-100" type="submit">
    //       Add photos
    //     </Button>
    //   </Form>
    // </div>
  );
}
