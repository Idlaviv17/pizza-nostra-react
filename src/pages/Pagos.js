import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const Pagos = () => {
  const url = 'http://localhost:3001/api/pagos';
  const [pagos, setPagos] = useState([]);
  const [id, setId] = useState('');
  const [estado, setEstado] = useState('');
  const [fecha, setFecha] = useState('');
  const [inicioPeriodo, setInicioPeriodo] = useState('');
  const [finPeriodo, setFinPeriodo] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');
  const [idSalario, setIdSalario] = useState('');
  const [comentario, setComentario] = useState('');

  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getPagos();
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  const getPagos = async () => {
    const response = await axios.get(url);
    setPagos(response.data);
  };

  const openModal = (
    op,
    id,
    estado,
    fecha,
    inicioPeriodo,
    finPeriodo,
    horasTrabajadas,
    idEmpleado,
    idSalario,
    comentario
  ) => {
    setId('');
    setEstado('');
    setFecha('');
    setInicioPeriodo('');
    setFinPeriodo('');
    setHorasTrabajadas('');
    setIdEmpleado('');
    setIdSalario('');
    setComentario('');
    setOperation(op);
    if (op === 1) {
      setTitle('Añadir Pago');
    } else if (op === 2) {
      setTitle('Editar Pago');
      setId(id);
      setEstado(estado);
      setFecha(fecha);
      setInicioPeriodo(inicioPeriodo);
      setFinPeriodo(finPeriodo);
      setHorasTrabajadas(horasTrabajadas);
      setIdEmpleado(idEmpleado);
      setIdSalario(idSalario);
      setComentario(comentario);
    }
    window.setTimeout(function () {
      document.getElementById('comentario').focus();
    }, 500);
  };

  const validar = () => {
    var parametros;
    var metodo;
    if (estado.trim() === '') {
      show_alerta('Por favor especifique un estado', 'warning');
    } else if (fecha.trim() === '') {
      show_alerta('Por favor especifique la fecha del pago', 'warning');
    } else if (inicioPeriodo === '') {
      show_alerta(
        'Por favor especifique el inicio del periodo del pago',
        'warning'
      );
    } else if (finPeriodo === '') {
      show_alerta(
        'Por favor especifique el fin del periodo del pago',
        'warning'
      );
    } else if (horasTrabajadas === '') {
      show_alerta(
        'Por favor inidique el número de horas trabajadas',
        'warning'
      );
    } else if (idEmpleado === '') {
      show_alerta('Por favor proporcione el id del empleado', 'warning');
    } else if (idSalario === '') {
      show_alerta('Por favor proporcione el id del salario', 'warning');
    } else {
      if (operation === 1) {
        parametros = {
          comentario: comentario.trim(),
          estado: estado.trim(),
          fecha: fecha.trim(),
          fin_periodo: finPeriodo.trim(),
          horas_trabajadas: parseInt(horasTrabajadas),
          inicio_periodo: inicioPeriodo.trim(),
          id_empleado: parseInt(idEmpleado),
          id_salario: parseInt(idSalario),
        };
        metodo = 'POST';
      } else {
        parametros = {
          id_pago: id,
          comentario: comentario.trim(),
          estado: estado.trim(),
          fecha: fecha.trim(),
          fin_periodo: finPeriodo.trim(),
          horas_trabajadas: parseInt(horasTrabajadas),
          inicio_periodo: inicioPeriodo.trim(),
          id_empleado: parseInt(idEmpleado),
          id_salario: parseInt(idSalario),
        };
        metodo = 'PUT';
      }
      sendRequest(metodo, parametros);
    }
  };

  const sendRequest = async (metodo, parametros) => {
    await axios({
      method: metodo,
      url: metodo === 'PUT' ? `${url}/${parametros.id_pago}` : url,
      data: parametros,
    })
      .then(function (respuesta) {
        let msj = '';
        if (metodo === 'POST')
          msj = 'El pago se ha agregado de manera correcta';
        if (metodo === 'PUT')
          msj = 'El pago se ha actualizado de manera correcta';
        show_alerta(msj, 'success');
        document.getElementById('btnCerrar').click();
        getPagos();
      })
      .catch(function (error) {
        show_alerta('Error en la solicitud', 'error');
        console.log(error);
      });
  };

  const deleteProduct = id => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro que desea eliminar el pago con id de ' + id + ' ?',
      icon: 'question',
      text: 'Después de esta acción el pago se perderá para siempre',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        setId(id);
        axios.delete(`${url}/${id}`).catch(error => {
          console.error('Error al borrar los datos:', error);
        });
        reloadPage();
      } else {
        show_alerta('El pago NO fue eliminado', 'info');
      }
    });
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
                  <th>ESTADO</th>
                  <th>FECHA</th>
                  <th>INICIO PERIODO</th>
                  <th>FIN PERIODO</th>
                  <th>HORAS TRABAJADAS</th>
                  <th>ID EMPLEADO</th>
                  <th>ID SALARIO</th>
                  <th>COMENTARIO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {pagos.map((pagos, i) => (
                  <tr key={pagos.id_pago + i}>
                    <td>{pagos.id_pago}</td>
                    <td>{pagos.estado}</td>
                    <td>{pagos.fecha}</td>
                    <td>{pagos.inicio_periodo}</td>
                    <td>{pagos.fin_periodo}</td>
                    <td>{pagos.horas_trabajadas}</td>
                    <td>{pagos.id_empleado}</td>
                    <td>{pagos.id_salario}</td>
                    <td>{pagos.comentario}</td>
                    <td>
                      <button
                        onClick={() =>
                          openModal(
                            2,
                            pagos.id_pago,
                            pagos.estado,
                            pagos.fecha,
                            pagos.inicio_periodo,
                            pagos.fin_periodo,
                            pagos.horas_trabajadas,
                            pagos.id_empleado,
                            pagos.id_salario,
                            pagos.comentario
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
                        onClick={() => deleteProduct(pagos.id_pago)}
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
                  <i className='fa-solid fa-credit-card'></i>
                </span>
                <input
                  type='text'
                  id='estado'
                  className='form-control'
                  placeholder='Estado'
                  value={estado}
                  onChange={e => setEstado(e.target.value)}
                ></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-calendar-days'></i>
                </span>
                <input
                  type='text'
                  id='fecha'
                  className='form-control'
                  placeholder='Fecha'
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                ></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-calendar-days'></i>
                </span>
                <input
                  type='text'
                  id='inicioPeriodo'
                  className='form-control'
                  placeholder='Inicio Periodo'
                  value={inicioPeriodo}
                  onChange={e => setInicioPeriodo(e.target.value)}
                ></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-calendar-days'></i>
                </span>
                <input
                  type='text'
                  id='finPeriodo'
                  className='form-control'
                  placeholder='Fin Periodo'
                  value={finPeriodo}
                  onChange={e => setFinPeriodo(e.target.value)}
                ></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-clock'></i>
                </span>
                <input
                  type='text'
                  id='horasTrabajadas'
                  className='form-control'
                  placeholder='Horas Trabajadas'
                  value={horasTrabajadas}
                  onChange={e => setHorasTrabajadas(e.target.value)}
                ></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-id-card'></i>
                </span>
                <input
                  type='text'
                  id='idEmpleado'
                  className='form-control'
                  placeholder='ID Empleado'
                  value={idEmpleado}
                  onChange={e => setIdEmpleado(e.target.value)}
                ></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-id-card'></i>
                </span>
                <input
                  type='text'
                  id='idSalario'
                  className='form-control'
                  placeholder='ID Salario'
                  value={idSalario}
                  onChange={e => setIdSalario(e.target.value)}
                ></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-comment'></i>
                </span>
                <input
                  type='text'
                  id='comentario'
                  className='form-control'
                  placeholder='Comentario'
                  value={comentario}
                  onChange={e => setComentario(e.target.value)}
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

export default Pagos;
