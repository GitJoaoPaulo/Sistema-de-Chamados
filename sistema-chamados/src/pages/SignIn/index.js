import { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';
import './signin.css';

function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleSubimit(e){
    e.preventDefault();
    alert('Teste')
  }

  return (
    <div className='container-center'>
      <div className='login'>
        
        <div className='logo-area'>
          <img src={logo} alt="Sistema-Logo"/>
        </div>

        <form onSubmit={handleSubimit}>
          <h1>Entrar</h1>
          <input type="text" placeholder='email@exemplo.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit'>Acessar</button>
        </form>

        <Link to="/register">Criar uma conta</Link>

      </div>
    </div>
  );
}

export default SignIn;
