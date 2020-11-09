import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
  savePhotos,
  getPhotosByRouteId,
} from "../../redux/actions/routeActions";

export default function RoutesGalleryPage(props) {
  const [route, setRoute] = useState({});
  const [photos, setPhotos] = useState([]);
  const [validated, setValidated] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const routes = useSelector((state) => state.routes);
  const photosRef = useRef();

  useEffect(() => {
    const currentRouteId = props.match.params.id;
    const currentRoute = routes.filter((route) => route.id === currentRouteId);
    setRoute(currentRoute[0]);
  }, [routes, route, props.match.params.id]);

  useEffect(() => {
    (async () => {
      if (route && route.id) {
        setPhotos(await getPhotosByRouteId(route.id, 10));
      }
    })();
  }, [route]);

  function selectPhoto(photoUrl) {
    setSelectedPhoto(photoUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    try {
      // setLoading(true);
      let savePhotosResult = await savePhotos(
        route.id,
        photosRef.current.files
      );
      console.log(savePhotosResult);
      setPhotos(await getPhotosByRouteId(route.id, 10));
      //   setLoading(false);
    } catch (e) {
      //   setLoading(false);
      console.error(`Failed to add new photos, ${e} `);
    }
  }

  return (
    <div>
      Routes Gallery {props.match.params.id}
      name: {route && <div>{route.name}</div>}
      {selectedPhoto && (
        <div>
          <img
            style={{ width: "600px", height: "600px" }}
            alt={selectedPhoto}
            src={selectedPhoto}
          />
        </div>
      )}
      <div>
        {photos &&
          photos.map(({ photoUrl }, index) => (
            <img
              key={photoUrl}
              style={{ width: "200px", height: "200px" }}
              alt={index}
              src={photoUrl}
              onClick={() => selectPhoto(photoUrl)}
            />
          ))}
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group id="photos">
          <Form.Label>Photos</Form.Label>
          <Form.File
            id="exampleFormControlFile1"
            label="Example file input"
            ref={photosRef}
            multiple
          />
          {/* <Form.Control.Feedback type="invalid">
              To pole jest wymagane
            </Form.Control.Feedback> */}
        </Form.Group>
        <Button className="w-100" type="submit">
          Add photos
        </Button>
      </Form>
    </div>
  );
}
