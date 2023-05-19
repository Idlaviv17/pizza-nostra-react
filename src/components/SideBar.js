import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.js';
import { MdPayments } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { GiReceiveMoney } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const { setIsAuthorized } = useContext(AppContext);

  const handleLogout = () => {
    setIsAuthorized(false);
    navigate('/login');
  };

  return (
    <div
      className='container-fluid m-0 p-3 main-sidebar'
      style={{ width: 250 }}
    >
      <img
        src='https://scontent.fcen1-1.fna.fbcdn.net/v/t39.30808-6/274480393_2347032522106694_8218106908479344001_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4luuQHJrGlwAX-u4a6E&_nc_ht=scontent.fcen1-1.fna&oh=00_AfDTrjPfFS989ax1uooLxpEK_S9CasJCwfbliXYwxQBghQ&oe=646A4DC2'
        alt='Pizza Nostra Image'
        className='rounded-circle'
        style={{
          width: 75,
          height: 75,
          marginLeft: 60,
          marginTop: 25,
          marginBottom: 5,
        }}
      />
      <p
        className='font-weight-bold'
        style={{ width: 50, height: 50, marginLeft: 75 }}
      >
        Admin
      </p>
      <div className='sidebar' style={{ marginTop: -25 }}>
        <ul className='nav flex-column d-flex'>
          <li className='nav-item element'>
            <a className='nav-link' onClick={() => navigate('/pagos')}>
              <MdPayments className='bi me-2' width='16' height='16' />
              Pagos
            </a>
          </li>
          <li className='nav-item element'>
            <a className='nav-link' onClick={() => navigate('/salarios')}>
              <GiReceiveMoney className='bi me-2' width='16' height='16' />
              Salarios
            </a>
          </li>
          <li className='nav-item element position-fixed bottom-0 start-0 p-1 m-2'>
            <a className='nav-link' onClick={() => handleLogout()}>
              <BiLogOut className='bi me-2' width='16' height='16' />
              LogOut
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
