import React, { useState } from "react";
import RouteForm from "./routes/RouteForm";

export default function ManageRoute() {
  const [route, setRoute] = useState({});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setRoute((prevRoute) => ({
      ...prevRoute,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

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
