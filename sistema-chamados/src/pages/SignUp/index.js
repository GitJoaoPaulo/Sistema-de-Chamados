import { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';

function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");


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
          <h1>Cadastrar uma conta</h1>
          <input type="text" placeholder='Digite seu nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
          <input type="text" placeholder='email@exemplo.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='Crie uma senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit'>Criar Conta</button>
        </form>

        <Link to="/">Já tem uma conta ? Entre </Link>

      </div>
    </div>
  );
}

export default SignUp;
  