import './modal.css';

import { FiX } from 'react-icons/fi';

function Modal({ conteudo, close }) {
    return (
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={() => close()}>
                    <FiX size={23} color='#fff' />
                    Voltar
                </button>

                <div className='div-spans'>
                    <h2>Detalhes do Chamado</h2>

                    <div className='row'>

                        <span>Empresa: <i>{conteudo.empresa}</i></span>

                    </div>

                    <div className='row'>

                        <span>Assunto: <i>{conteudo.assunto}</i></span>

                    </div>

                    <div className='row'>

                        <span>Cadastrado em: <i>{conteudo.createdFormated}</i></span>

                    </div>

                    <div className='row'>

                        <span>Status: <i style={{ color: '#FFF', backgroundColor: conteudo.status === 'Atendido' ? '#5cb85c' : '#EE0000' }}>{conteudo.status}</i></span>

                    </div>


                    {conteudo.complemento !== '' && (

                        <>
                            <h3>Complemento</h3>
                            <p>{conteudo.complemento}</p>
                        </>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Modal;