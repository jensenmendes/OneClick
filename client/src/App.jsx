import './App.css';
import Login from './components/LoginPage'
import EnvioEmailRS from './components/EnvioEmailRS';
import ConfirmacaoTokenRS from './components/ConfirmacaoTokenRS';
import { ResetPassword } from './components/ResetPassword';
import { Dashboard } from './components/Dashboard';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/ForgotPassword" element={<EnvioEmailRS />} />
        <Route path="/ConfirmacaoToken" element={<ConfirmacaoTokenRS />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
