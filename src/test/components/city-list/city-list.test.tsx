import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';
import CityList from '../../../components/city-list/city-list.tsx';
import {makeFakeCity} from '../../utils/mocks.ts';

describe('Component: CityList', () => {
  it('should render city list and highlight the selected city', () => {
    const cities = [makeFakeCity(), makeFakeCity(), makeFakeCity()];
    const selectedCity = cities[1];
    const mockOnSelect = vi.fn();

    render(
      <MemoryRouter>
        <CityList cities={cities} selectedCity={selectedCity} onSelect={mockOnSelect} />
      </MemoryRouter>
    );

    cities.forEach((city) => {
      const cityElement = screen.getByText(city.name);
      expect(cityElement).toBeInTheDocument();

      if (city.name === selectedCity.name) {
        expect(cityElement.closest('a')).toHaveClass('tabs__item--active');
      } else {
        expect(cityElement.closest('a')).not.toHaveClass('tabs__item--active');
      }
    });

    fireEvent.click(screen.getByText(cities[0].name));
    expect(mockOnSelect).toHaveBeenCalledWith(cities[0]);
  });
});
