import React from "react";
import "./SidebarSelectSource.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function SidebarSelectSource({ onSelect }) {
  const sourceList = useSelector((state) => state.gallery.sources);
  const { id } = useParams();

  const onSourceSelectHandler = (e) => {
    const selectedSource = sourceList.find(
      (source) => source.id === e.target.value
    );
    onSelect(selectedSource);
  };

  return (
    <div>
      <select value={id} onChange={onSourceSelectHandler}>
        {sourceList.map((source, index) => (
          <option key={index} value={source.id}>
            {source.name}
          </option>
        ))}
      </select>
    </div>
  );
}
