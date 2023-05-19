import React, { useContext } from 'react';
import Sidebar from './SideBar.js';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.js';
import { Button } from 'react-bootstrap';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthorized } = useContext(AppContext);

  if (isAuthorized) {
    return (
      <div className='d-flex flex-row'>
        <Sidebar className='flex-item' />
        <div className='flex-item main-content' style={{marginLeft: 125}}>{children}</div>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column mt-4">
        <h1>Necesitas tener acceso para entrar a esta página</h1>
        <Button
          className='mt-3'
          variant='primary'
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </div>
    );
  }
};

export default Layout;
