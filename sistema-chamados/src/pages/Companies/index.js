import { useState } from 'react';
import firebase from '../../service/firebaseConnection';
import './companies.css';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';

function Companies() {

    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");


    async function handleAdd(e) {
        e.preventDefault();

        if (nomeEmpresa !== "" && cnpj.length >= 14 && cnpj !== "" && endereco !== "") {
            await firebase.firestore().collection("companies").add({
                nome: nomeEmpresa,
                cnpj: cnpj,
                endereco: endereco
            })
                .then(() => {
                    setNomeEmpresa("");
                    setCnpj("");
                    setEndereco("");
                    toast.success("Empresa cadastrada com sucesso");
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Erro ao cadastrar a empresa")
                })
        } else {
            console.log("erro")
            toast.error("Verifique se o CNPJ tem 14 digitos ou se os campos foram preenchidos corretamente ")
        }

    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Nova empresa">
                    <FiUser size={24} />
                </Title>

                <div className='container'>
                    <form className='form-profile companies' onSubmit={handleAdd}>
                        <label>Nome da Empresa</label>
                        <input type="text" placeholder='Nome da sua empresa' value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} />

                        <label>CNPJ</label>
                        <input type="text" placeholder='CNPJ da sua empresa' value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type="text" placeholder='Rua número, vila, estado, CEP' value={endereco} onChange={(e) => setEndereco(e.target.value)} />

                        <button type='submit'>Cadastrar</button>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default Companies;