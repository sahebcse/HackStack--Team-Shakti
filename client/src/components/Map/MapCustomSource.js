import * as React from 'react';
import Map, {Source, Layer} from 'react-map-gl';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

export default function MapCustomSource() {
    const [viewport, setViewport] = React.useState();
  return (
    <Map initialViewState={{
      longitude: -122.45,
      latitude: 37.78,
      zoom: 14
    }}>
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
  
}
