import React, { Fragment } from 'react';

import cx from 'classnames';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSearch: false
    };
  }

  render() {
    return (
      <Fragment>
        <div
          className={cx('search-wrapper', {
            active: this.state.activeSearch
          })}
        >
          <div className="input-holder">
            <input
              className="search-input"
              placeholder="Type to search"
              type="text"
            />
            <button
              className="search-icon"
              onClick={() =>
                this.setState({ activeSearch: !this.state.activeSearch })
              }
            >
              <span />
            </button>
          </div>
          <button
            className="close"
            onClick={() =>
              this.setState({ activeSearch: !this.state.activeSearch })
            }
          />
        </div>
      </Fragment>
    );
  }
}

export default SearchBox;
