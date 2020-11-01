import React, {useState} from "react";
import "./RouteElementMap.css";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function RouteElementMap({url}) {
    const [loading, setLoading] = useState(true);

    const onIframeLoad = (event) => {
        setLoading(false);
      };

  return (
    <div className="route__map">
        {loading && <CircularProgress />}
      <iframe
        title="map"
        className={`route__iframe ${loading && 'route__iframe--hidden'}`}
        src={url}
        frameborder="0"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
        onLoad={onIframeLoad}
      ></iframe>
    </div>
  );
}
