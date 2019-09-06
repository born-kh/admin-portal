import React from 'react';

export const PageTitle = ({ icon, heading, subheading, children }) => (
  <div className="app-page-title">
    <div className="page-title-wrapper">
      <div className="page-title-heading">
        <div className="page-title-icon">
          <i className={icon} />
        </div>
        <div>
          {heading}
          <div className="page-title-subheading">{subheading}</div>
        </div>
      </div>
      <div className="page-title-actions">{children}</div>
    </div>
  </div>
);

export default PageTitle;
