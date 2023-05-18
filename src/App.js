import React from 'react';
//import Layout from './components/Layout.js';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Pagos from './pages/Pagos.js';
import Salarios from './pages/Salarios.js';
import Missing from './pages/Missing.js';

const App = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path='/login' element={<Login />} />

      {/* Pagos */}
      <Route>
        <Route exact path='/pagos' element={<Pagos />} />
      </Route>
      {/* Salarios */}
      <Route>
        <Route exact path='/salarios' element={<Salarios />} />
      </Route>

      {/* In case a page that doesn't exist is trying to get reached*/}
      <Route path='*' element={<Missing />} />
    </Routes>
  );
};

export default App;
