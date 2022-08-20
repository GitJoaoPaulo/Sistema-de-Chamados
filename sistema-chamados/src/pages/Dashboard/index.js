import { useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';

import Title from '../../components/Title';
import Header from '../../components/Header';

import { FiMessageCircle, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';


function Dashboard() {

  const [chamados, setChamados] = useState([1]);

  return (
    <div>
      <Header />

      <div className='content'>

        <Title name="Atendimentos">
          <FiMessageCircle size={24} />
        </Title>

        {chamados.length === 0 ? (

          <div className='container dashboard'>

            <span>Nenhum chamado registrado...</span>
            <Link to="/new" className='new'>
              <FiPlus color='#FFF' size={24} />
              Novo chamado
            </Link>

          </div>

        ) : (
          <>
            <Link to="/new" className='new'>
              <FiPlus color='#FFF' size={24} />
              Novo chamado
            </Link>

            <table>

              <thead>
                <tr>
                  <th scope='col'>Cliente</th>
                  <th scope='col'>Assunto</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Cadastrado em</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td data-label="Cliente">Sujeito Programador</td>
                  <td data-label="Assunto">Suporte</td>
                  <td data-label="Status">
                    <span className='badge' style={{ backgroundColor: "#5cb85c" }}>Em aberto</span>
                  </td>
                  <td data-label="Cadastrado">26/01/2019</td>
                  <td data-label="#">
                    <button className='action' style={{ backgroundColor: '#3583f6' }}>
                      <FiSearch color='#FFF' size={17} />
                    </button>

                    <button className='action' style={{ backgroundColor: '#F6a935' }}>
                      <FiEdit2 color='#FFF' size={17} />
                    </button>
                  </td>

                </tr>
              </tbody>

            </table>

          </>
        )


        }



      </div>
    </div>
  );
}

export default Dashboard;