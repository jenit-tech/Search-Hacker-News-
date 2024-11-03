import React from 'react';

const SearchBar = (props) => {
  const {
    activeSearchOptionId,
    activePopularityOptionId,
    activeTimeOptionId,
    searchTypesList,
    popularityTypesList,
    timeTypesList,
    changeSearchOption,
    changePopularityOption,
    changeTimeOption,
  } = props;

  const onChangeSearchType = (event) => {
    changeSearchOption(event.target.value);
  };

  const onChangePopularityType = (event) => {
    changePopularityOption(event.target.value);
  };

  const onChangeTimeOption = (event) => {
    changeTimeOption(event.target.value);
  };

  const renderSearchTypesList = () => (
    <select className="filters-list" value={activeSearchOptionId} onChange={onChangeSearchType}>
      {searchTypesList.map((eachType) => (
        <option key={eachType.searchTypeId} value={eachType.searchTypeId} className="filter-label">
          {eachType.label}
        </option>
      ))}
    </select>
  );

  const renderPopularityTypeList = () => (
    <select className="filters-list" value={activePopularityOptionId} onChange={onChangePopularityType}>
      {popularityTypesList.map((eachType) => (
        <option key={eachType.popularityTypeId} value={eachType.popularityTypeId} className="filter-label">
          {eachType.label}
        </option>
      ))}
    </select>
  );

  const renderTimeTypesList = () => (
    <select className="filters-list" value={activeTimeOptionId} onChange={onChangeTimeOption}>
      {timeTypesList.map((eachType) => (
        <option key={eachType.timeTypeId} value={eachType.timeTypeId} className="filter-label">
          {eachType.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="home-header">
      <p>Search</p>
      {renderSearchTypesList()}
      <p>by</p>
      {renderPopularityTypeList()}
      <p>for</p>
      {renderTimeTypesList()}
    </div>
  );
};

export default SearchBar;
