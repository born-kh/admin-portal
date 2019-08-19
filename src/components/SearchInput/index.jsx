import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Input } from '@material-ui/core';

// Material icons
import { Search as SearchIcon } from '@material-ui/icons';

// Component styles
import styles from './styles';

import { connect } from 'react-redux';
import { changeSearch } from 'actions/settingsActions';

const SearchInput = props => {
  const {
    classes,
    className,
    onChangeSearchValue,
    search,
    style,
    ...rest
  } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={onChangeSearchValue}
      />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object
};

const mapStateToProps = state => ({
  search: state.settings.search
});

const mapDispatchToProps = dispatch => {
  return {
    onChangeSearchValue: e => {
      console.log(e.target.value);
      dispatch(changeSearch(e.target.value));
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchInput)
);
