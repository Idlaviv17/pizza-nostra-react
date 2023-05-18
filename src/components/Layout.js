import Sidebar from "./SideBar.js";

// The 'children' in this case will be the APP component
const Layout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="main-container">{children}</div>
    </div>
  );
};

export default Layout;