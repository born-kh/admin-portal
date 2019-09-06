import React, { useState } from 'react';
import cx from 'classnames';
import { changeSearch } from 'actions/settingsActions';
import { connect } from 'react-redux';

const SearchInput = props => {
  const [activeSearch, toggleSearch] = useState(props.isActive);
  const searchWrapperClass = cx('search-wrapper', {
    active: activeSearch
  });
  const handleToggleSearch = () => {
    toggleSearch(!activeSearch);
  };

  return (
    <div className={searchWrapperClass}>
      <div className="input-holder">
        <input
          onChange={props.onChangeSearchValue}
          type="text"
          className="search-input"
          onKeyPress={props.keyPressed}
          placeholder={props.placeholder}
        />
        <button className="search-icon" onClick={handleToggleSearch}>
          <span />
        </button>
      </div>
      <button className="close" onClick={handleToggleSearch} />
    </div>
  );
};

const mapStateToProps = state => ({
  search: state.settings.search
});

const mapDispatchToProps = dispatch => {
  return {
    onChangeSearchValue: e => {
      dispatch(changeSearch(e.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);
