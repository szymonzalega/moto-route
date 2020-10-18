import React, { useState } from "react";
import RouteForm from "./RouteForm";
import * as routeActions from "../../redux/actions/routeActions";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";

export default function ManageRoute() {
  const [route, setRoute] = useState({});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target;
    setRoute((prevRoute) => ({
      ...prevRoute,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    setSaving(true);
    dispatch(routeActions.saveRoute(route, currentUser.uid));

    console.log(route);
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
