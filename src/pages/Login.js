import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.js';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthorized } = useContext(AppContext);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = e => {
    setUser(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios
      .post('http://localhost:3001/api/auth', {
        user,
        password,
      })
      .then(response => {
        if (response.status === 200) {
          setIsAuthorized(true);
          navigate('/pagos');
        } else {
          console.log('Credenciales incorrectas');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center flex-column mt-4'>
        <img
          src='https://scontent.fcen1-1.fna.fbcdn.net/v/t39.30808-6/274480393_2347032522106694_8218106908479344001_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4luuQHJrGlwAX-u4a6E&_nc_ht=scontent.fcen1-1.fna&oh=00_AfDTrjPfFS989ax1uooLxpEK_S9CasJCwfbliXYwxQBghQ&oe=646A4DC2'
          alt='Pizza Nostra Image'
          className='rounded-circle'
          style={{
            width: 200,
            height: 200,
          }}
        />
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-6 mt-3'>
          <div className='d-flex justify-content-center align-items-center flex-column mt-4'>
            <h2>Login</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUser'>
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nombre de usuario'
                value={user}
                onChange={handleUserChange}
              />
            </Form.Group>

            <Form.Group className='mt-2' controlId='formPassword'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='Contraseña'
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <div className='d-flex justify-content-center align-items-center flex-column mt-4 fs-5'>
              <Button className='mt-3 w-5' variant='primary' type='submit' style={{width: 200}}>
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
