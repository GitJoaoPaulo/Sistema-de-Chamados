import { useState, useEffect } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import firebase from '../../service/firebaseConnection';

import Title from '../../components/Title';
import Header from '../../components/Header';

import { FiMessageCircle, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { format } from 'date-fns';

const listRef = firebase.firestore().collection("called").orderBy('created', 'desc');


function Dashboard() {

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  useEffect(() => {

    loadChaamdos();

    return () => {

    }

  }, []);

  async function loadChaamdos() {
    await listRef.limit(5).get()
      .then((snapshot) => {
        updateState(snapshot);

      })
      .catch((error) => {
        console.log("Deu algum erro: ", error)
        setLoadingMore(false);
      })

    setLoading(false);

  }

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          empresa: doc.data().empresa,
          empresaId: doc.data().empresaId,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento

        })
      })

      //Pegando o ultimo documento buscado
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];

      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);

    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);

  }

  if (loading) {
    return (
      <div>
        <Header />

        <div className='content'>

          <Title name="Atendimentos">
            <FiMessageCircle size={24} />
          </Title>

          <div className='container dashboard'>

            <span>Buscando chamados...</span>

          </div>

        </div>

      </div>
    )
  }

  async function handleMore(){
    setLoadingMore(true);
    await listRef.startAfter(lastDocs).limit(5).get()
    .then((snapshot) => {
      updateState(snapshot);
    })
  }

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
                {chamados.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Cliente">{item.empresa}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span className='badge' style={{ backgroundColor: item.status === 'Atendido' ? '#5cb85c' : '#EE0000'}}>{item.status}</span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormated}</td>
                      <td data-label="#">
                        <button className='action' style={{ backgroundColor: '#3583f6' }}>
                          <FiSearch color='#FFF' size={17} />
                        </button>

                        <button className='action' style={{ backgroundColor: '#F6a935' }}>
                          <FiEdit2 color='#FFF' size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando chamados...</h3>}
            { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar Mais</button>}

          </>
        )
        }

      </div>
    </div>
  );
}

export default Dashboard;