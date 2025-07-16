import { useDeepCompareEffectForMaps } from "utils/hooks/useDeepCompareEffectForMaps";
import React from "react";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  onShowCurrentLocation: (data: any) => void;
  children?: React.ReactNode;
}

export const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  onShowCurrentLocation,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        })
      );
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      const locationImg = document.createElement("img");
      // locationImg.src = "/assets/images/target.png";
      locationImg.src = "../../images/target.png";

      locationImg.alt = "";

      locationImg.classList.add("map-current-location-icon");

      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationImg);
      locationImg.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              onShowCurrentLocation(pos);
            },
            (err) => {
              alert(err.message);
            }
          );
        }
      });
    }
  }, [map]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};
