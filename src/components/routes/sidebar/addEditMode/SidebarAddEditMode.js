import React, { useState, useEffect } from "react";
import "./SidebarAddEditMode.scss";
import { Form, Button } from "react-bootstrap";
import { saveRoute } from "../../../../redux/actions/routeActions";
import { useAuth } from "../../../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import useSidebarState from "../../../sidebar/useSidebarState";
import CircularProgress from "@material-ui/core/CircularProgress";
import URLManualModal from "../manualModal/URLManualModal";
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

  const getInitialValues = (fields, source) => {
    let obj = {};
    fields.forEach((field) => {
      source[field] ? (obj[field] = source[field]) : (obj[field] = "");
    });
    return obj;
  };

  const handleClickPaste = async () => {
    const text = await navigator.clipboard.readText();
    setRoute({ ...route, url: text });
  };

  const handleSubmit = (values) => {
    console.log("submit handleSubmit");

    const { name, description, length, level, routeType } = values;
    let url = validateMapValue(values.url);

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

  const VALIDATION_MESSAGE = {
    max: "The value may not be longer then 64 characters",
    required: "Field is required",
    incorrectUrl:
      "Value incorrect, you have to pass URL from www.google.com/maps domain or HTML code from google maps site",
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .max(64, VALIDATION_MESSAGE.max)
      .required(VALIDATION_MESSAGE.required),
    description: Yup.string()
      .max(64, VALIDATION_MESSAGE.max)
      .required(VALIDATION_MESSAGE.required),
    length: Yup.string().required(VALIDATION_MESSAGE.required),
    level: Yup.string().required(VALIDATION_MESSAGE.required),
    routeType: Yup.string().required(VALIDATION_MESSAGE.required),
    url: Yup.string()
      .required(VALIDATION_MESSAGE.required)
      .test(
        "validateMapValue",
        VALIDATION_MESSAGE.incorrectUrl,
        function (value) {
          return validateMapValue(value);
        }
      ),
  });

  let sidebarContent;

  if (saveStatus === "idle") {
    sidebarContent = (
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        initialValues={getInitialValues(
          ["name", "description", "length", "level", "routeType", "url"],
          route
        )}
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
                isInvalid={!!errors.name && touched.name}
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
                isInvalid={!!errors.description && touched.description}
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
                isInvalid={!!errors.length && touched.length}
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
                isInvalid={!!errors.level && touched.level}
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
                isInvalid={!!errors.routeType && touched.routeType}
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

            <div className="sidebarAddEditMode__warning">
              This version of app don't use Google Maps API yet, so please use
              the Google Maps page directly to embed a map. <URLManualModal />{" "}
              for manual.
            </div>
            <Form.Group controlId="url">
              <Form.Label>Link to map</Form.Label>
              <div className="sidebarAddEditMode__urlInput">
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.url}
                  isInvalid={!!errors.url && touched.url}
                  validateOnChange={true}
                ></Form.Control>
                <Button color="primary" onClick={handleClickPaste}>
                  PASTE
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.url}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <Button className="w-100" type="submit">
              {route.id ? "Save route" : "Create new route"}
            </Button>
          </Form>
        )}
      </Formik>
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
