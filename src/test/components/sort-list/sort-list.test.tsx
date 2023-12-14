import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import SortList from '../../../components/sort-list/sort-list.tsx';
import {SortOptions, SortOptionsType} from '../../../components/sort-list/sort-offers.ts';
import {NameSpace} from '../../../const.ts';
import {withStore} from '../../utils/mock-component.tsx';

describe('Component: SortList', () => {
  it('should display the current sort type correctly', () => {
    const currentSortOption = 'TOP_RATED_FIRST' as SortOptionsType;
    const overrideState = {
      [NameSpace.SessionState]: {
        currentSortType: currentSortOption,
      }
    };
    const { withStoreComponent } = withStore(<SortList />, overrideState);
    render(withStoreComponent, {wrapper: MemoryRouter});

    const sortTypeElement = screen.getByText(SortOptions[currentSortOption].title, { selector: '.places__sorting-type' });
    expect(sortTypeElement).toBeInTheDocument();
  });

  it('should toggle the sort menu on click', () => {
    const currentSortOption = 'TOP_RATED_FIRST' as SortOptionsType;
    const overrideState = {
      [NameSpace.SessionState]: {
        currentSortType: currentSortOption,
      }
    };
    const { withStoreComponent } = withStore(<SortList />, overrideState);
    render(withStoreComponent, {wrapper: MemoryRouter});

    const sortTypeButton = screen.getByText(SortOptions[currentSortOption].title, { selector: '.places__sorting-type' });
    fireEvent.click(sortTypeButton);

    const sortMenu = screen.getByRole('list', { hidden: true });
    expect(sortMenu).toHaveClass('places__options--opened');

    fireEvent.click(sortTypeButton);
    expect(sortMenu).not.toHaveClass('places__options--opened');
  });
});
