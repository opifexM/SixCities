import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import LeafletMap from '../../../components/leaflet-map/leaflet-map.tsx';
import {MapPoint} from '../../../types/map-point.ts';

describe('Component: LeafletMap', () => {
  it('should render map correctly', () => {
    const city: MapPoint = { id: 'city1', lat: 48.8566, lng: 2.3522, zoom: 13 };
    const points: MapPoint[] = [
      { id: 'point1', lat: 48.8566, lng: 2.3522, zoom: 13 },
      { id: 'point2', lat: 48.8584, lng: 2.2945, zoom: 13 }
    ];

    const { container } = render(
      <LeafletMap city={city} points={points} selectedPoint={undefined} block="test-block" />
    );

    const mapElement = container.querySelector('.test-block__map');
    expect(mapElement).toBeInTheDocument();
  });
});
