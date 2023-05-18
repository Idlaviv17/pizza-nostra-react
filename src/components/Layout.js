import Sidebar from './SideBar.js';

const Layout = ({ children }) => {
  return (
    <div className='d-flex flex-row'>
      <Sidebar className='flex-item' />
      <div className='flex-item main-content'>{children}</div>
    </div>
  );
};

export default Layout;
