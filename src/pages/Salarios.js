import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const Salarios = () => {
  const url = 'http://localhost:3001/api/salarios';
  const [salarios, setSalarios] = useState([]);
  const [id, setId] = useState('');
  const [costePorHora, setCostePorHora] = useState('');
  const [rol, setRol] = useState('');

  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getSalarios();
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  const getSalarios = async () => {
    const response = await axios.get(url);
    setSalarios(response.data);
  };

  const openModal = (
    op,
    id,
    costePorHora,
    rol
  ) => {
    setId('');
    setCostePorHora('');
    setRol('');
    setOperation(op);
    if (op === 1) {
      setTitle('Añadir Salario');
    } else if (op === 2) {
      setTitle('Editar Salario');
      setId(id);
      setCostePorHora(costePorHora);
      setRol(rol);
    }
    window.setTimeout(function () {
      document.getElementById('costePorHora').focus();
    }, 500);
  };

  const validar = () => {
    var parametros;
    var metodo;
    if (costePorHora.toString().trim() === '') {
      show_alerta('Por favor especifique el coste por hora', 'warning');
    } else if (rol.trim() === '') {
      show_alerta('Por favor especifique el rol asociado', 'warning');
    } else {
      if (operation === 1) {
        parametros = {
          coste_por_hora: parseInt(costePorHora),
          rol: rol.trim(),
        };
        metodo = 'POST';
      } else {
        parametros = {
          id_salario: id,
          coste_por_hora: parseInt(costePorHora),
          rol: rol.trim(),
        };
        metodo = 'PUT';
      }
      sendRequest(metodo, parametros);
    }
  };

  const sendRequest = async (metodo, parametros) => {
    await axios({
      method: metodo,
      url: metodo === 'PUT' ? `${url}/${parametros.id_salario}` : url,
      data: parametros,
    })
      .then(function (respuesta) {
        let msj = '';
        if (metodo === 'POST')
          msj = 'El salario se ha agregado de manera correcta';
        if (metodo === 'PUT')
          msj = 'El salario se ha actualizado de manera correcta';
        show_alerta(msj, 'success');
        document.getElementById('btnCerrar').click();
        getSalarios();
      })
      .catch(function (error) {
        show_alerta('Error en la solicitud', 'error');
        console.log(error);
      });
  };

  const deleteProduct = id => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro que desea eliminar el salario con id de ' + id + ' ?',
      icon: 'question',
      text: 'Después de esta acción el salario se perderá para siempre',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })
      .then(result => {
        if (result.isConfirmed) {
          setId(id);
          axios.delete(`${url}/${id}`).catch(error => {
            console.error('Error al borrar los datos:', error);
          });
          reloadPage();
        } else {
          show_alerta('El salario NO fue eliminado', 'info');
        }
      })
  };

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button
                onClick={() => openModal(1)}
                className='btn btn-dark'
                data-bs-toggle='modal'
                data-bs-target='#modalProducts'
              >
                <i className='fa-solid fa-circle-plus'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <table className='table table-bordered table-responsive'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>COSTE POR HORA</th>
                  <th>ROL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {salarios.map((salario, i) => (
                  <tr key={salario.id_salario + i}>
                    <td>{salario.id_salario}</td>
                    <td>{salario.coste_por_hora}</td>
                    <td>{salario.rol}</td>
                    <td>
                      <button
                        onClick={() =>
                          openModal(
                            2,
                            salario.id_salario,
                            salario.coste_por_hora,
                            salario.rol,
                          )
                        }
                        className='btn btn-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#modalProducts'
                      >
                        <i className='fa-solid fa-edit'></i>
                      </button>
                      &nbsp;
                      <button
                        onClick={() => deleteProduct(salario.id_salario)}
                        className='btn btn-danger'
                      >
                        <i className='fa-solid fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id='modalProducts' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-clock'></i>
                </span>
                <input
                  type='text'
                  id='costePorHora'
                  className='form-control'
                  placeholder='Coste Por Hora'
                  value={costePorHora}
                  onChange={e => setCostePorHora(e.target.value)}
                ></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-user'></i>
                </span>
                <input
                  type='text'
                  id='rol'
                  className='form-control'
                  placeholder='Rol'
                  value={rol}
                  onChange={e => setRol(e.target.value)}
                ></input>
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i> Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                id='btnCerrar'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salarios;