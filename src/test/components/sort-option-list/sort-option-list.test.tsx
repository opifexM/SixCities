import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {SortOptions} from '../../../components/sort-list/sort-offers.ts';
import SortOptionList from '../../../components/sort-option-list/sort-option-list.tsx';
import {withStore} from '../../utils/mock-component.tsx';

describe('Component: SortOptionList', () => {
  it('should render sort options correctly', () => {
    const handleToggleSortMenuMock = vi.fn();
    const currentSortType = 'POPULAR';

    const { withStoreComponent } = withStore(
      <SortOptionList
        isSortMenuOpen
        handleToggleSortMenu={handleToggleSortMenuMock}
        currentSortType={currentSortType}
      />
    );
    render(withStoreComponent);

    const popularSortTitle = screen.getByText(SortOptions.POPULAR.title);
    expect(popularSortTitle).toBeInTheDocument();
    const listItem = popularSortTitle.closest('li');
    expect(listItem).toHaveClass('places__option--active');
  });
});
