import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import './profile.css';
import { FiSettings, FiUpload } from 'react-icons/fi'

import Header from '../../components/Header';
import Title from '../../components/Title';

import avatar from '../../assets/avatar.png';

function Profile() {

    const { user, signOut } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    return (
        <div>
            <Header />

            <div className='content'>

                <Title name="Meu perfil">
                    <FiSettings size={24} />
                </Title>

                <div className='container'>
                    <form className='form-avatar'>

                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={24} />
                            </span>

                            <input type="file" accept="image/*" /><br />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt="Foto do usuário" />
                                :
                                <img src={avatarUrl} width="250" height="250" alt="Foto do usuário" />
                            }
                        </label>

                        <labe>Nome</labe>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        
                        <labe>Email</labe>
                        <input type="email" value={email} disabled="true"/>

                        <button type='submit'>Salvar</button>

                    </form>

                </div>

                <div className='container' onClick={() => signOut()}>
                    <button className='logout-btn'>Sair</button>
                </div>

            </div>
        </div>
    )
}

export default Profile;