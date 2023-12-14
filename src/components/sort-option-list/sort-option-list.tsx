import classNames from 'classnames';
import React from 'react';
import {useAppDispatch} from '../../hooks';
import {setSortType} from '../../store/ui-settings/ui-settings.slice.ts';
import {SortOptions, SortOptionsType} from '../sort-list/sort-offers.ts';

interface SortOptionListProps {
  isSortMenuOpen: boolean;
  handleToggleSortMenu: () => void;
  currentSortType: SortOptionsType;
}

function SortOptionList({ isSortMenuOpen, handleToggleSortMenu, currentSortType }: Readonly<SortOptionListProps>) {
  const dispatch = useAppDispatch();

  const handleSortChange = (value: keyof typeof SortOptions) => () => {
    dispatch(setSortType(value));
    handleToggleSortMenu();
  };

  function handleKeyDown(event: React.KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }

  const sortOptionElements = Object.entries(SortOptions).map(([key , {title}], index) => (
    <li
      key={key}
      className={classNames('places__option', {'places__option--active': currentSortType === key})}
      tabIndex={index}
      onClick={handleSortChange(key as keyof typeof SortOptions)}
      onKeyDown={(event) => handleKeyDown(event, handleSortChange(key as keyof typeof SortOptions))}
    >
      {title}
    </li>
  ));

  return (
    <ul className={classNames('places__options', 'places__options--custom', {'places__options--opened': isSortMenuOpen})}>
      {sortOptionElements}
    </ul>
  );
}

export default SortOptionList;
