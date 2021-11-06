import React from 'react';
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';

const Maps = ({
  apiKey,
  pos,
  zoom,
}: {
  apiKey: string;
  pos: google.maps.LatLng | google.maps.LatLngLiteral;
  zoom: number;
}) => {
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '50vh',
      }}
      center={pos}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {<Marker visible={true} position={pos} />}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Maps;
