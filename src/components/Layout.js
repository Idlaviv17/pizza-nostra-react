import React, { useContext } from 'react';
import Sidebar from './SideBar.js';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.js';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthorized } = useContext(AppContext);
    
    if (isAuthorized) {
      return (
        <div className='d-flex flex-row'>
          <Sidebar className='flex-item' />
          <div className='flex-item main-content'>{children}</div>
        </div>
      );
    } else {
      return (
        <>
          <h1>Necesitas tener acceso para entrar a esta página</h1>
          <button onClick={() => navigate('/login')}>Log In</button>
        </>
      );
    }
};

export default Layout;
