import React, { useRef, useState, useEffect } from "react";
import "./SidebarAddEditMode.scss";
import { Form, Button } from "react-bootstrap";
import { saveRoute } from "../../../../redux/actions/routeActions";
import { useAuth } from "../../../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import useSidebarState from "../../../sidebar/useSidebarState";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SidebarAddEditMode({ routeId }) {
  const [route, setRoute] = useState({});
  const { currentUser } = useAuth();
  const { openSidebar } = useSidebarState();
  const dispatch = useDispatch();

  const saveStatus = useSelector((state) => state.routes.saveStatus);
  const routes = useSelector((state) => state.routes.routes);

  useEffect(() => {
    const getRouteDetails = (routeId) =>
      routes.find((route) => route.id === routeId);
    if (routeId) {
      setRoute(getRouteDetails(routeId));
    } else {
      setRoute({});
    }
  }, [routes, routeId]);

  useEffect(() => {
    if (saveStatus === "succeeded") {
      redirectToRoute();
    }
  }, [saveStatus]);

  const redirectToRoute = () => {
    const createSidebar = (routeId) => {
      return {
        isOpen: true,
        mode: "details",
        routeId,
      };
    };

    if (routeId === undefined) {
      const routeIdCreatedElement = routes[routes.length - 1];
      openSidebar(createSidebar(routeIdCreatedElement.id));
    } else {
      openSidebar(createSidebar(route.id));
    }
  };

  const handleSubmit = (values) => {
    console.log("submit handleSubmit");

    const { name, description, length, level, routeType } = values;
    let url = validateMapValue(values.url);
    console.log(url);

    let routeToSave = {
      ...route,
      name,
      description,
      length,
      level,
      routeType,
      url,
    };

    dispatch(saveRoute(currentUser, routeToSave));
  };

  const validateMapValue = (value) => {
    const isValidHttpUrl = (string) => {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    };

    const getDomainFromURL = (value) => {
      try {
        const { protocol, hostname, pathname } = new URL(value);
        return `${protocol}//${hostname}${pathname}`;
      } catch {
        return false;
      }
    };

    const isCorrectDomain = (urlToCheck, domain) => urlToCheck === domain;

    const getUrlFromHTMLCode = (code) => {
      try {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = code;
        const iframe = wrapper.firstChild;
        return iframe.getAttribute("src");
      } catch (e) {
        return false;
      }
    };

    const ifValueIsURL = (value) => {
      const domainFromURL = getDomainFromURL(value);

      return isCorrectDomain(domainFromURL, "https://www.google.com/maps/embed")
        ? value
        : false;
    };

    const ifValueIsHTML = (value) => {
      const urlFromHTML = getUrlFromHTMLCode(value);

      return isValidHttpUrl(urlFromHTML) ? ifValueIsURL(urlFromHTML) : false;
    };

    return isValidHttpUrl(value) ? ifValueIsURL(value) : ifValueIsHTML(value);
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    description: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    length: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
    routeType: Yup.string().required("Required"),
    url: Yup.string().test("test", "zle", function (value) {
      return validateMapValue(value);
    }),
  });

  let sidebarContent;

  if (saveStatus === "idle") {
    sidebarContent = (
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
          description: "",
          length: "",
          level: "",
          routeType: "",
          url: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group id="name" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                isInvalid={!!errors.name}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="description" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                isInvalid={!!errors.description}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="length" controlId="length">
              <Form.Label>Length in kilometers</Form.Label>
              <Form.Control
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.length}
                isInvalid={!!errors.length}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.length}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="level" controlId="level">
              <Form.Label>An advanced level</Form.Label>
              <Form.Control
                as="select"
                name="level"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.level}
                isInvalid={!!errors.level}
              >
                <option value="">Select route level...</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="very-hard">Ninja</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.level}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="routeType" controlId="routeType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.routeType}
                isInvalid={!!errors.routeType}
              >
                <option value="">Select route type...</option>
                <option value="turist">Tourist</option>
                <option value="sport">Sport</option>
                <option value="enduro">Enduro</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.routeType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="url">
              <Form.Label>Link to map</Form.Label>
              <Form.Control
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.url}
                isInvalid={!!errors.url}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.url}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="w-100" type="submit">
              {route.id ? "Save route" : "Create new route"}
            </Button>

            {/* <pre style={{ margin: "0 auto" }}>
              {JSON.stringify({ ...values, ...errors }, null, 2)}
            </pre> */}
          </Form>
        )}
      </Formik>

      // <Form noValidate validated={validated} onSubmit={handleSubmit}>
      //   <Form.Group id="name">
      //     <Form.Label>Name</Form.Label>
      //     <Form.Control
      //       ref={name}
      //       defaultValue={route.name}
      //       required
      //     ></Form.Control>
      //     <Form.Control.Feedback type="invalid">
      //       This field is required
      //     </Form.Control.Feedback>
      //   </Form.Group>

      //   <Form.Group id="description">
      //     <Form.Label>Description</Form.Label>
      //     <Form.Control
      //       ref={description}
      //       defaultValue={route.description}
      //       required
      //     ></Form.Control>
      //     <Form.Control.Feedback type="invalid">
      //       This field is required
      //     </Form.Control.Feedback>
      //   </Form.Group>

      //   <Form.Group id="length">
      //     <Form.Label>Length in kilometers</Form.Label>
      //     <Form.Control
      //       type="number"
      //       ref={length}
      //       defaultValue={route.length}
      //       required
      //     ></Form.Control>
      //     <Form.Control.Feedback type="invalid">
      //       This field is required
      //     </Form.Control.Feedback>
      //   </Form.Group>

      //   <Form.Group id="level">
      //     <Form.Label>An advanced level</Form.Label>
      //     <Form.Control
      //       as="select"
      //       ref={level}
      //       defaultValue={route.level}
      //       required
      //     >
      //       <option value="easy">Easy</option>
      //       <option value="medium">Medium</option>
      //       <option value="hard">Hard</option>
      //       <option value="very-hard">Ninja</option>
      //     </Form.Control>
      //     <Form.Control.Feedback type="invalid">
      //       This field is required
      //     </Form.Control.Feedback>
      //   </Form.Group>

      //   <Form.Group id="routeType">
      //     <Form.Label>Type</Form.Label>
      //     <Form.Control as="select" ref={routeType} defaultValue={route.type}>
      //       <option value="turist">Tourist</option>
      //       <option value="sport">Sport</option>
      //       <option value="enduro">Enduro</option>
      //     </Form.Control>
      //   </Form.Group>

      //   <Form.Group id="url">
      //     <Form.Label>Link to map</Form.Label>
      //     <Form.Control
      //       ref={url}
      //       defaultValue={route.url}
      //       required
      //     ></Form.Control>
      //     <Form.Control.Feedback type="invalid">
      //       This field is incorrect
      //     </Form.Control.Feedback>
      //   </Form.Group>

      //   <Button className="w-100" type="submit">
      //     {route.id ? "Save route" : "Create new route"}
      //   </Button>
      // </Form>
    );
  } else if (saveStatus === "pending") {
    sidebarContent = (
      <div className="sidebarAddEditMode__preloader">
        <CircularProgress />
      </div>
    );
  } else if (saveStatus === "failed") {
    sidebarContent = (
      <div className="routePage__message--error">Error while saving route</div>
    );
  }

  return <div className="sidebarAddEditMode">{sidebarContent}</div>;
}
