import React, { useState, useRef } from "react";
import "./SidebarUploadPhoto.css";
import { Form, Button } from "react-bootstrap";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function SidebarUploadPhoto({ onSubmit }) {
  const [photoToUpload, setPhotoToUpload] = useState([]);
  const photosRef = useRef();

  const onImageChange = (e) => {
    const uploadedFiles = [...e.target.files];
    setPhotoToUpload([...photoToUpload, ...uploadedFiles]);
  };

  const isUploadedPhoto = photoToUpload.length > 0;

  const removePhotoToUpload = (index) => {
    const tempPhotoArr = [...photoToUpload];
    tempPhotoArr.splice(index, 1);
    setPhotoToUpload(tempPhotoArr);
  }

  const onSubmitHandler = (e) => {
    onSubmit(e, photoToUpload);
    setPhotoToUpload([]);
  }

  return (
    <>
      <Form
        noValidate
        onSubmit={(e) => onSubmitHandler(e)}
      >
        <Form.Group id="photos">
          <label
            for="file-upload"
            type="file"
            multiple
            className="sidebarUploadPhoto__uploadButton"
          >
            <InsertDriveFileIcon />
            Upload new photo
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            ref={photosRef}
            onChange={onImageChange}
          />
        </Form.Group>

        {isUploadedPhoto && (
          <>
            <div className="sidebarUploadPhoto__uploadedPhotoRow">
              {photoToUpload.map((file, index) => (
                <div
                  key={file.name}
                  className="sidebarUploadPhoto__uploadedPhoto"
                  style={{ backgroundImage: `url(${URL.createObjectURL(file)})` }}
                >
                  <div className="uploadedPhoto__remove" onClick={() => removePhotoToUpload(index)}>
                    <HighlightOffIcon
                      style={{ fontSize: 23 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-100" type="submit">
              Upload photos
            </Button>
          </>
        )}
      </Form>
    </>
  );
}
