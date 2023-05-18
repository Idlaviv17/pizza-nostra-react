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

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/auth', {
      user,
      password
    })
    .then((response) => {
      if(response.status === 200) {
        setIsAuthorized(true);
        navigate('/pagos');
      } else {
        console.log('Credenciales incorrectas');
      }
    })
    .catch((err) => {
      console.error(err);
    });
    
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3">
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUser">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de usuario"
                value={user}
                onChange={handleUserChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Button className='mt-3' variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;