import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { savePhotos } from "../../redux/actions/routeActions";

export default function RoutesGalleryPage(props) {
  const [route, setRoute] = useState({});
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.routes);
  const photosRef = useRef();

  useEffect(() => {
    const currentRouteId = props.match.params.id;
    const currentRoute = routes.filter((route) => route.id === currentRouteId);
    setRoute(currentRoute[0]);
  }, [routes, route, props.match.params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    try {
      //   setLoading(true);
      dispatch(savePhotos(route, photosRef.current.files));
      //   redirectToRoute(newRouteId);
      //   setLoading(false);
    } catch (e) {
      //   setLoading(false);
      console.error(`Failed to add new photos, ${e} `);
    }
  }

  return (
    <div>
      Routes Gallery {props.match.params.id}
      {route && <div>{route.name}</div>}
      {route && route.photos &&
        route.photos.map((photo, index) => (
          <img key={photo} style={{ width: "200px", height: "200px" }} alt={index} src={photo} />
        ))}
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
