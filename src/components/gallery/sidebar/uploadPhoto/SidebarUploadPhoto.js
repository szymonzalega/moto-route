import React, { useState, useRef } from "react";
import "./SidebarUploadPhoto.css";
import { Form, Button } from "react-bootstrap";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

export default function SidebarUploadPhoto({ onSubmit }) {
  const [validated, setValidated] = useState(false);
  const [photoToUpload, setPhotoToUpload] = useState([])
  const photosRef = useRef();

  const onImageChange = (e) => {
    // let reader = new FileReader();
    // reader.onload = e => {
    //   setPhotoToUpload([...ph]);
    // }
    // reader.readAsDataURL(e.target.files);
  }

  return (
    <>
    <Form
      noValidate
      validated={validated}
      onSubmit={(e) => onSubmit(e, photosRef)}
    >
      <Form.Group id="photos">
        {/* <Form.File ref={photosRef} multiple> */}
        <label
          for="file-upload"
          type="file"
          multiple
          className="sidebarUploadPhoto__uploadButton"
        >
          <InsertDriveFileIcon />
          Upload new photo
        </label>
        <input id="file-upload" type="file" multiple ref={photosRef} onChange={onImageChange}/>
        {/* </Form.File> */}
        {/* <Form.Control.Feedback type="invalid">
          To pole jest wymagane
        </Form.Control.Feedback> */}
      </Form.Group>

      <Button className="w-100" type="submit">
        Add photos
      </Button>
    </Form>


      <img alt="sdsd" src={photoToUpload[0]} />
      </>

  );
}
