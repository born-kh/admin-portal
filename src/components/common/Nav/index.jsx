import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NavContext from './NavContext';
import NavsContainer from './NavsContainer';

class Nav extends Component {
  static propTypes = {
    content: PropTypes.array.isRequired,
    label: PropTypes.string
  };
  static defaultProps = {
    content: []
  };

  constructor(props) {
    super(props);

    const content = this.flattenContent(props.content);

    this.state = {
      content,
      activeItems: this.getActiveItems(content)
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        activeItems: this.getActiveItems(this.state.content)
      });
    }
  }

  render() {
    const { label = 'Menu', content } = this.props;

    return (
      <NavContext.Provider value={this.state}>
        <h5 className="app-sidebar__heading">{label}</h5>
        {content.length && (
          <div className="metismenu vertical-nav-menu">
            <NavsContainer items={content} />
          </div>
        )}
      </NavContext.Provider>
    );
  }

  flattenContent = (content, parentId, flat = []) => {
    content.forEach(item => {
      flat.push({
        id: item.id,
        to: item.path,
        parentId: parentId
      });

      if (Array.isArray(item.content)) {
        this.flattenContent(item.content, item.id, flat);
      }
    });

    return flat;
  };

  getActiveItems = (content, parentId = null, activeItems = []) => {
    const item = content.find(
      item =>
        (parentId && item.id === parentId) ||
        (item.to && this.isPathActive(item.to))
    );

    if (item) {
      activeItems.push(item.id);

      if (item.parentId) {
        return this.getActiveItems(content, item.parentId, activeItems);
      }
    }

    return activeItems;
  };

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);
