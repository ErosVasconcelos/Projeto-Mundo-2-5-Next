import React from 'react';
import { Menu } from './Menu';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Menu />
      <div>{children}</div>
    </>
  );
};

export default Layout;