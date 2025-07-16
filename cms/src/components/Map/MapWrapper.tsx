import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { Map } from "./Map";
import { Marker } from "./Marker";
import configs from "constants/config";

const render = (status: Status) => {
  return <Spin />;
};

interface ILatlng {
  lat: number;
  lng: number;
}

interface IProps {
  currentLocation?: ILatlng;
  onClick?: (param?: any) => void;
}

function MapWrapper({ currentLocation, onClick: onSelectAddress }: IProps) {
  const [clickOnly, setClickOnly] = React.useState<any>();
  const [zoom, setZoom] = React.useState(10); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 35.6598747651321,
    lng: 139.74571848297902,
  });
  const [myLocation, setMyLocation] = React.useState<
    google.maps.LatLngLiteral | undefined
  >(undefined);

  useEffect(() => {
    if (currentLocation) {
      setCenter(currentLocation);
      setMyLocation(currentLocation);
      setClickOnly(undefined);
    }
  }, [currentLocation]);

  const onClick = async (e: google.maps.MapMouseEvent) => {
    setClickOnly(e.latLng);
    onSelectAddress?.(e.latLng!.toJSON());
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <Wrapper
      apiKey={configs.GOOGLE_API_KEY as string}
      render={render}
      libraries={["places"]}
    >
      <Map
        center={center}
        onClick={onClick}
        onShowCurrentLocation={(data) => {
          // setCenter(data);
          // setMyLocation(data);
        }}
        onIdle={onIdle}
        zoom={zoom}
        style={{
          flexGrow: "1",
          height: "500px",
          width: "100%",
        }}
      >
        {myLocation && currentLocation && <Marker position={myLocation} />}
        {clickOnly && <Marker position={clickOnly} />}
      </Map>
    </Wrapper>
  );
}

export default MapWrapper;
