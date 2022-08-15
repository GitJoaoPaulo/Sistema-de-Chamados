import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';


function Dashboard() {

  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <h1>Página de Dashboard</h1>
      <button onClick={() => signOut()}>Sair da conta</button>
    </div>
  );
}

export default Dashboard;