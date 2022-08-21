import './new.css';
import { FiPlusCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';

function New() {

    function handleRegister(e){
        e.preventeDefault();
        alert("TESTE")
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
                        <select>
                            <option key={1} value={1}>
                                Sujeito Programador
                            </option>
                        </select>

                        <label>Assunto</label>
                        <select>
                            <option value="Suporte de Equipamentos">Suporte de Equipamentos</option>
                            <option value="Visita Tecnica">Visita Técnica</option>
                            <option value="Suporte Ar Condicionado">Suporte Ar Condicionado</option>
                            <option value="Limpeza e Jardinagem">Limpeza ou Jardinagem</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type="radio" name="radio" value="Aberto" />
                            <span>Em aberto</span>

                            <input type="radio" name="radio" value="Progresso" />
                            <span>Progresso</span>

                            <input type="radio" name="radio" value="Atendido" />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type="text" placeholder='Descreva seu problema (opcional).'></textarea>

                        <button type='submit'>Registrar Chamado</button>
                    </form>
                </div>

            </div>



        </div>
    )
}

export default New;