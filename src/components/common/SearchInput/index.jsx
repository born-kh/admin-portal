import React, { useState } from 'react';
import cx from 'classnames';
import { changeSearch } from 'store/actions/settingsActions';
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
          className="search-input"
          onChange={props.onChangeSearchValue}
          onKeyPress={props.keyPressed}
          placeholder={props.placeholder}
          type="text"
        />
        <button
          className="search-icon"
          onClick={handleToggleSearch}
        >
          <span />
        </button>
      </div>
      <button
        className="close"
        onClick={handleToggleSearch}
      />
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
