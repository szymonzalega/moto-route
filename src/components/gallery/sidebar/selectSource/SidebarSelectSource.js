import React, { useEffect } from "react";
import "./SidebarSelectSource.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function SidebarSelectSource({ onSelect }) {
  const sourceList = useSelector((state) => state.gallery.sources);
  const status = useSelector((state) => state.gallery.sourcesStatus);
  const { id } = useParams();

  useEffect(() => {
    if (!id && sourceList.length) {
      onSelect(sourceList[0]);
    }
  }, [sourceList]);

  const onSourceSelectHandler = (e) => {
    const selectedSource = sourceList.find(
      (source) => source.id === e.target.value
    );
    onSelect(selectedSource);
  };

  let content;

  if (status === "pending") {
    content = (
      <div className="sidebarSelectSource">
        <CircularProgress />
      </div>
    );
  } else if (status === "failed") {
    content = (
      <div className="sidebarSelectSource sidebarSelectSource--error">
        Error while downloading sources
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className="sidebarSelectSource">
        <Form.Control as="select" placeholder="Password" onChange={onSourceSelectHandler} required>
          {sourceList.map((source, index) => (
            <option key={index} value={source.id}>
              {source.name}
            </option>
          ))}
        </Form.Control>
      </div>
    );
  }

  return <>{content}</>;
}
