import React from "react";
interface IProps extends google.maps.MarkerOptions {
  type?: "myLocation" | "store";
}

export const Marker: React.FC<IProps> = ({ type = "store", ...options }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    const image = "/assets/images/myLocation.svg";
    if (marker) {
      marker.setOptions({
        position: options.position,
        map: options.map,
        icon: type === "myLocation" ? image : null,
      });
    }
  }, [marker, options]);

  return null;
};
