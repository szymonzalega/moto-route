import React, { useRef, useState } from "react";
import "./SidebarAddEditMode.css"
import { Form, Button } from "react-bootstrap";
import { saveRoute } from "../../redux/actions/routeActions";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import useSidebarState from "./useSidebarState";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SidebarAddEditMode() {
  const [validated, setValidated] = useState(false);
  const { currentUser } = useAuth();
  const [openSidebar] = useSidebarState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const name = useRef();
  const description = useRef();
  const length = useRef();
  const level = useRef();
  const routeType = useRef();
  const url = useRef();

  function openSidebarHandler(routeId) {
    const sidebar = {
      isOpen: true,
      mode: "details",
      routeId,
    };
    openSidebar(sidebar);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    const newRoute = {
      name: name.current.value,
      description: description.current.value,
      length: length.current.value,
      level: level.current.value,
      routeType: routeType.current.value,
      url: url.current.value,
    };
    try {
      setLoading(true);
      let newRouteId = await dispatch(saveRoute(newRoute, currentUser));
      setLoading(false);
      openSidebarHandler(newRouteId);
    } catch (e) {
      setLoading(false);
      console.error(`Failed to save new route, ${e} `);
    }
  }

  return (
    <div className="sidebarAddEditMode">
      {loading ? (
        <div
          className="sidebarAddEditMode__preloader"
        >
          <CircularProgress />
        </div>
      ) : (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group id="name">
            <Form.Label>Nazwa trasy</Form.Label>
            <Form.Control ref={name} required></Form.Control>
            <Form.Control.Feedback type="invalid">
              To pole jest wymagane
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group id="description">
            <Form.Label>Opis trasy</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              ref={description}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group id="length">
            <Form.Label>Długość</Form.Label>
            <Form.Control type="number" ref={length} required></Form.Control>
            <Form.Control.Feedback type="invalid">
              To pole jest wymagane
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group id="level">
            <Form.Label>Poziom trudności</Form.Label>
            <Form.Control as="select" ref={level} required>
              <option value="easy">Łatwa</option>
              <option value="medium">Średnia</option>
              <option value="hard">Trudna</option>
              <option value="very-hard">Bardzo trudna</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              To pole jest wymagane
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group id="routeType">
            <Form.Label>Typ trasy</Form.Label>
            <Form.Control as="select" ref={routeType}>
              <option value="turist">Turystyczna</option>
              <option value="sport">Sportowa</option>
              <option value="enduro">Enduro</option>
            </Form.Control>
          </Form.Group>

          <Form.Group id="url">
            <Form.Label>Link</Form.Label>
            <Form.Control ref={url} required></Form.Control>
            <Form.Control.Feedback type="invalid">
              To pole jest wymagane
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="w-100" type="submit">
            Stwórz trasę
          </Button>
        </Form>
      )}
    </div>
  );
}
