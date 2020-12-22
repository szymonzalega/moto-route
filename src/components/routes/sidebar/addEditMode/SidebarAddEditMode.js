import React, { useRef, useState, useEffect } from "react";
import "./SidebarAddEditMode.css";
import { Form, Button } from "react-bootstrap";
import { saveRoute } from "../../../../redux/actions/routeActions";
import { useAuth } from "../../../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import useSidebarState from "../../../sidebar/useSidebarState";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SidebarAddEditMode({ routeId }) {
  const [validated, setValidated] = useState(false);
  const [route, setRoute] = useState({});
  const { currentUser } = useAuth();
  const { openSidebar } = useSidebarState();
  const dispatch = useDispatch();

  const saveStatus = useSelector((state) => state.routes.saveStatus);
  const routes = useSelector((state) => state.routes.routes);

  const name = useRef();
  const description = useRef();
  const length = useRef();
  const level = useRef();
  const routeType = useRef();
  const url = useRef();

  useEffect(() => {
    const getRouteDetails = (routeId) =>
      routes.find((route) => route.id === routeId);
    if (routeId) {
      setRoute(getRouteDetails(routeId));
    } else {
      setRoute({});
    }
  }, [routes, routeId]);

  useEffect(() => {
    if (saveStatus === "succeeded") {
      redirectToRoute();
    }
  }, [saveStatus]);

  const redirectToRoute = () => {
    const createSidebar = (routeId) => {
      return {
        isOpen: true,
        mode: "details",
        routeId,
      };
    };

    if (routeId === undefined) {
      const routeIdCreatedElement = routes[routes.length - 1];
      openSidebar(createSidebar(routeIdCreatedElement.id));
    } else {
      openSidebar(createSidebar(route.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    let routeToSave = {
      ...route,
      name: name.current.value,
      description: description.current.value,
      length: length.current.value,
      level: level.current.value,
      routeType: routeType.current.value,
      url: url.current.value,
    };

    if (route.id) {
      routeToSave.id = route.id;
    }

    dispatch(saveRoute(currentUser, routeToSave));
  };

  let sidebarContent;

  if (saveStatus === "idle") {
    sidebarContent = (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group id="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            ref={name}
            defaultValue={route.name}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group id="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            ref={description}
            // as="textarea"
            // rows={3}
            defaultValue={route.description}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group id="length">
          <Form.Label>Length in kilometers</Form.Label>
          <Form.Control
            type="number"
            ref={length}
            defaultValue={route.length}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            To pole jest wymagane
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group id="level">
          <Form.Label>An advanced level</Form.Label>
          <Form.Control
            as="select"
            ref={level}
            defaultValue={route.level}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="very-hard">Ninja</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group id="routeType">
          <Form.Label>Type</Form.Label>
          <Form.Control as="select" ref={routeType} defaultValue={route.type}>
            <option value="turist">Tourist</option>
            <option value="sport">Sport</option>
            <option value="enduro">Enduro</option>
          </Form.Control>
        </Form.Group>

        <Form.Group id="url">
          <Form.Label>Link to map</Form.Label>
          <Form.Control
            ref={url}
            defaultValue={route.url}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="w-100" type="submit">
          {route.id ? "Save route" : "Create new route"}
        </Button>
      </Form>
    );
  } else if (saveStatus === "pending") {
    sidebarContent = (
      <div className="sidebarAddEditMode__preloader">
        <CircularProgress />
      </div>
    );
  } else if (saveStatus === "failed") {
    sidebarContent = (
      <div className="routePage__message--error">Error while saving route</div>
    );
  }

  return <div className="sidebarAddEditMode">{sidebarContent}</div>;
}
