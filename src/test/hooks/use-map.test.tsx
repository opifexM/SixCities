import {render, screen} from '@testing-library/react';
import {useRef} from 'react';
import {describe, expect, it} from 'vitest';
import useMap from '../../hooks/use-map.tsx';

function TestMapComponent() {
  const mapRef = useRef(null);
  const map = useMap(mapRef, { id: 'test1', lat: 52.38333, lng: 4.9, zoom: 12 });

  return (
    <div data-testid="map-container" ref={mapRef} style={{ height: '100px', width: '100px' }}>
      {map ? <span data-testid="map-created">Map Created</span> : <span data-testid="map-not-created">Map Not Created</span>}
    </div>
  );
}

describe('Hook: useMap', () => {
  it('should create a map', () => {
    render(<TestMapComponent />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('map-created')).toBeInTheDocument();
  });
});
