import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';

import './header.css';
import avatar from '../../assets/avatar.png';

import { FiHome, FiUser, FiSettings } from "react-icons/fi";

function Header() {

    const { user } = useContext(AuthContext);

    return (
        <div className='sidebar'>

            <div>
                <img src={user.avatarUrl == null ? avatar : user.avatarUrl} alt="Foto de perfil" />
            </div>

            <Link to="/dashboard">
                <FiHome color='#FFF' size={24}/> 
                Chamados
            </Link>

            <Link to="/dashboard">
                <FiUser color='#FFF' size={24}/> 
                Clientes
            </Link>

            <Link to="/dashboard">
                <FiSettings color='#FFF' size={24}/>
                Configurações
            </Link>
        </div>
    )
}

export default Header;




