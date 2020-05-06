import React, { memo } from 'react';
import cx from 'classnames';
import NavItem from './NavItem';

const NavsContainer = ({ items, visible = false }) => {
  const className = cx('metismenu-container', {
    visible: visible
  });

  return (
    <ul className={className}>
      {items.map((item, i) => (
        <NavItem
          key={item.id || i}
          {...item}
        />
      ))}
    </ul>
  );
};

export default memo(NavsContainer);
