import React, {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {getCurrentSortType} from '../../store/ui-settings/ui-settings.selectors.ts';
import SortOptionList from '../sort-option-list/sort-option-list.tsx';
import {SortOptions} from './sort-offers.ts';

function SortList() {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const currentSortType = useAppSelector(getCurrentSortType);

  function handleToggleSortMenu() {
    setIsSortMenuOpen(!isSortMenuOpen);
  }

  function handleKeyDown(event: React.KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type"
        onClick={handleToggleSortMenu}
        onKeyDown={(event) => handleKeyDown(event, handleToggleSortMenu)}
        tabIndex={0}
      >{SortOptions[currentSortType].title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <SortOptionList
        isSortMenuOpen={isSortMenuOpen}
        handleToggleSortMenu={handleToggleSortMenu}
        currentSortType={currentSortType}
      />
    </form>
  );
}

export default SortList;
