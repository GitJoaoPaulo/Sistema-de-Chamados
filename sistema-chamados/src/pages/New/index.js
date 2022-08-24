import './new.css';
import { FiPlusCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import firebase from '../../service/firebaseConnection';
import { toast } from 'react-toastify';

function New() {

    const [loadCompanies, setLoadCompanies] = useState(true);
    const [companiesSelected, setCompaniesSelected] = useState(0);
    const [companies, setCompanies] = useState([]);

    const [assunto, setAssunto] = useState("Suporte de Equipamentos");
    const [status, setStatus] = useState("Aberto");
    const [complemento, setComplemento] = useState("");

    const { user } = useContext(AuthContext);


    useEffect(() => {

        async function loadCompanies() {
            await firebase.firestore().collection("companies").get()
                .then((snapshot) => {
                    let lista = [];
    
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nome: doc.data().nome
                        })
                    })
    
                    if (lista === 0) {
                        console.log("Nenhuma empresa cadastrada");
                        setCompanies([{ id: '1', nome: "FREELA" }]);
                        setLoadCompanies(false);
                        return;
                    }
    
                    setCompanies(lista);
                    setLoadCompanies(false);
    
                })
                .catch((error) => {
                    console.log("Ops ocorrreu um erro: ", error);
                    setLoadCompanies(false);
                    setCompanies([{ id: '1', nome: "" }]);
                })
    
        }

        loadCompanies();

    }, []);

   

    async function handleRegister(e) {
        e.preventDefault();
        await firebase.firestore().collection("called").add({
            created: new Date(),
            empresa: companies[companiesSelected].nome,
            empresaId: companies[companiesSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(() => {
            toast.success("Chamado registrado com sucesso!");
            setComplemento("");
            setCompaniesSelected(0);
        })
        .catch((error) => {
            toast.error("Ops ocorreu um erro!", error);
        })
    }

    //Chamado quando troca o assunto
    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    //Chamado quando troca o status
    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    //Chamado quando troca de empresa
    function handleChangeCompanies(e){
        setCompaniesSelected(e.target.value);
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Novo chamado">
                    <FiPlusCircle size={24} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>

                        <label>Empresa</label>

                        {loadCompanies ? (
                            <input type="text" disabled={true} value="Carregando empresas..."/>
                        ) : (

                            <select value={companiesSelected} onChange={handleChangeCompanies}>
                            {companies.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.nome}
                                    </option>
                                )
                            })}
                        </select>
                        )}

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte de Equipamentos">Suporte de Equipamentos</option>
                            <option value="Visita Tecnica">Visita Técnica</option>
                            <option value="Suporte Ar Condicionado">Suporte Ar Condicionado</option>
                            <option value="Limpeza e Jardinagem">Limpeza ou Jardinagem</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={status === "Aberto"} />
                            <span>Em aberto</span>

                            <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} checked={status === "Progresso"} />
                            <span>Progresso</span>

                            <input type="radio" name="radio" value="Atendido" onChange={handleOptionChange} checked={status === "Atendido"} />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type="text" placeholder='Descreva seu problema (opcional).' value={complemento} onChange={(e) => setComplemento(e.target.value)}></textarea>

                        <button type='submit'>Registrar Chamado</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default New;