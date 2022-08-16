import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Flip } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={2000} theme="dark" transition={Flip}/>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
