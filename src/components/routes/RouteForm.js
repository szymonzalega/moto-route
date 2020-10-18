import React from "react";
import TextInput from "../common/TextInput";

export default function RouteForm({
  route,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) {
  return (
    <form onSubmit={onSave}>
      <h2>{route.id ? "Edit" : "Add"} route</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={route.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="length"
        label="Length"
        value={route.length}
        onChange={onChange}
        error={errors.length}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
