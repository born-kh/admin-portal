import React, { Fragment, useState, useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import NavContext from './NavContext';
import NavsContainer from './NavsContainer';
import { useTranslation } from 'react-i18next';

const NavItem = ({ id, path, label, content }) => {
  const hasSubMenu = content && Array.isArray(content) && content.length;
  const { activeItems } = useContext(NavContext);
  const [visible, toggle] = useState(activeItems.includes(id));
  const { t } = useTranslation();
  const className = cx('metismenu-link', {
    'has-active-child': visible
  });

  if (!hasSubMenu && !path) {
    return;
  }

  return (
    <li className="metismenu-item">
      {hasSubMenu ? (
        <Fragment>
          <span
            className={className}
            onClick={() => toggle(!visible)}
          >
            <i className="metismenu-icon pe-7s-compass" />
            {t(label)}
            <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
          </span>
          <NavsContainer
            items={content}
            visible={visible}
          />
        </Fragment>
      ) : (
        <NavLink
          className="metismenu-link"
          to={path}
        >
          {t(label)}
        </NavLink>
      )}
    </li>
  );
};

export default memo(NavItem);
