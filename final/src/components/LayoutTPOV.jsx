import React from 'react';
import SidebarTPOV from './SidebarTPOV';


function Layout({ children }) {
  return (
    <div className="Layout">
      <SidebarTPOV />
      <div className="Content">{children}</div>
    </div>
  );
}

export default Layout;
