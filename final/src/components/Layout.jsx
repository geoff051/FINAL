import React from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="Layout">
      <Sidebar />
      <div className="Content">{children}</div>
    </div>
  );
}

export default Layout;
