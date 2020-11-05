import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";

export default function Gallery() {
  const photos = useRef();
  const [validated, setValidated] = useState(false);

  const photoObj = {
    photos: photos.current.files,
  };

  const handleSubmit = () => {
      console.log(photoObj);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group id="photos">
          <Form.Label>Photos</Form.Label>
          {/* <Form.Control ref={url} required></Form.Control> */}
          <Form.File
            id="exampleFormControlFile1"
            label="Example file input"
            ref={photos}
            multiple
          />
          {/* <Form.Control.Feedback type="invalid">
              To pole jest wymagane
            </Form.Control.Feedback> */}
        </Form.Group>
      </Form>
    </div>
  );
}
