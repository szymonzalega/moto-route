import React, { useState, useEffect } from "react";
import RouteForm from "./RouteForm";
import * as routeActions from "../../redux/actions/routeActions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function ManageRoute(props) {
  const [route, setRoute] = useState({name: "", length: ""});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const state = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    if (state.routes.length === 0) {
      routeActions.loadUserRoutes(currentUser.uid);
    } else {
      const routeId = props.match.params.id;
      const route = getRouteById(state.routes, routeId);
      setRoute(route);
    }
  }, [state, props]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRoute((prevRoute) => ({
      ...prevRoute,
      [name]: value,
    }));
  }

  async function handleSave(event) {
    event.preventDefault();

    setSaving(true);
    try {
      await dispatch(routeActions.saveRoute(route, currentUser.uid));
      console.log("Utworzono nowy");
      history.push("/index/routes");
    } catch (e) {
      setSaving(false);
    }
  }

  function getRouteById(routesList, id) {
    const emptyRoute = {
      name: null,
      length: null,
    };
    return id !== undefined
      ? routesList.find((route) => route.id === id)
      : emptyRoute;
  }

  return (
    <RouteForm
      route={route}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}
