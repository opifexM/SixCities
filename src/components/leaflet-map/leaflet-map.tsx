import {Icon, layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';
import useMap from '../../hooks/use-map.tsx';
import {MapPoint} from '../../types/map-point.ts';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

type MapProps = {
  city: MapPoint;
  points: MapPoint[];
  selectedPoint: MapPoint | undefined;
  block: string;
};

function LeafletMap(props: Readonly<MapProps>) {
  const {city, points, selectedPoint, block} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });
        marker.setIcon(
          selectedPoint !== undefined && point.id === selectedPoint.id
            ? currentCustomIcon
            : defaultCustomIcon
        )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  useEffect(() => {
    if (map && selectedPoint) {
      map.setView([selectedPoint.lat, selectedPoint.lng], city.zoom);
    }
  }, [map, selectedPoint, city.zoom]);

  useEffect(() => {
    if (map && city.zoom) {
      map.setView([city.lat, city.lng], city.zoom);
    }
  }, [map, city.lat, city.lng, city.zoom]);

  return <section className={`${block}__map map`} ref={mapRef}></section>;
}

export default LeafletMap;
