import { useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';

import Title from '../../components/Title';
import Header from '../../components/Header';

import { FiMessageCircle, FiPlus } from 'react-icons/fi';


function Dashboard() {

  const [chamados, setChamados] = useState([]);

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
          </>
        )


        }



      </div>
    </div>
  );
}

export default Dashboard;