import React, { useState, useRef } from "react";
import "./SidebarUploadPhoto.scss";
import { Form, Button } from "react-bootstrap";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CircularProgress from "@material-ui/core/CircularProgress";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useSelector } from "react-redux";

export default function SidebarUploadPhoto({ onSubmit }) {
  const [photoToUpload, setPhotoToUpload] = useState([]);
  const uploadStatus = useSelector((state) => state.gallery.uploadStatus);
  const error = useSelector((state) => state.gallery.error);
  const photosRef = useRef();

  const onImageChange = (e) => {
    const uploadedFiles = [...e.target.files];
    setPhotoToUpload([...photoToUpload, ...uploadedFiles]);
  };

  const isUploadedPhoto = photoToUpload.length > 0;
  const isUploadSectionShowing =
    photoToUpload.length > 0 ||
    uploadStatus === "pending" ||
    uploadStatus === "failed";

  const removePhotoToUpload = (index) => {
    const tempPhotoArr = [...photoToUpload];
    tempPhotoArr.splice(index, 1);
    setPhotoToUpload(tempPhotoArr);
  };

  const onSubmitHandler = (e) => {
    onSubmit(e, photoToUpload);
    setPhotoToUpload([]);
  };

  let uploadSectionInfoContent;

  if (uploadStatus === "pending") {
    uploadSectionInfoContent = (
      <div className="sidebarUploadPhoto__uploadedInfoSection">
        <CircularProgress />
      </div>
    );
  } else if (uploadStatus === "failed") {
    uploadSectionInfoContent = (
      <div className="sidebarUploadPhoto__uploadedInfoSection sidebarUploadPhoto__uploadedInfoSection--error">
        Error while uploading photos
      </div>
    );
  }

  return (
    <div className="sidebarUploadPhoto">
      <Form noValidate onSubmit={(e) => onSubmitHandler(e)}>
        <Form.Group id="photos">
          <label
            htmlFor="file-upload"
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
            disabled={uploadStatus === "pending"}
            onChange={onImageChange}
          />
        </Form.Group>

        {isUploadSectionShowing && (
          <>
            {uploadSectionInfoContent}
            <div className="sidebarUploadPhoto__uploadedPhotoRow">
              {photoToUpload.map((file, index) => (
                <div
                  key={file.name}
                  className="sidebarUploadPhoto__uploadedPhoto"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                  }}
                >
                  <div
                    className="uploadedPhoto__remove"
                    onClick={() => removePhotoToUpload(index)}
                  >
                    <HighlightOffIcon style={{ fontSize: 23 }} />
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
    </div>
  );
}
