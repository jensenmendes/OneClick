import './App.css';
import './assets/Formulario.css'
import './assets/EsquecerPassword.css'
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Vendas from './pages/Vendas';
import Pagamento from './pages/Pagamento';
import Devolucao from './pages/Devolucao';
import Transacao from './pages/Transacao';
import Produto from './pages/Produto';
import Caixa from './pages/Caixa';
import Utilizador from './pages/Utilizador';
import Funcionario from './pages/Funcionario';
import Loja from './pages/Loja';
import Fornecedor from './pages/Fornecedor';
import Categoria from './pages/Categoria';
import Report from './pages/Report';
import Administrador from './pages/Administrador';
import RegFuncCaixa from './pages/RegFuncCaixa';
import EsquecerPassword from './pages/EsquecerPassword';
import EnvioToken from './components/EnvioToken';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import Desconto from './pages/Desconto';
import Cliente from './pages/Cliente';
import GestaoCaixa from './pages/GestaoCaixa';
import FluxoCaixa from './pages/FluxoCaixa';
import MetodoPagamento from './pages/MetodoPagamento';

function App() {

  const userType = 'Gerente'
  let dPath = ''
  if(userType === 'Gerente') dPath = '/vendedor'
  else if(userType === 'Admin') dPath = '/utilizador'
  //else dPath
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/dashboard' element={<Sidebar><Dashboard /></Sidebar>} />
          <Route path='/venda' element={<Sidebar><Vendas /></Sidebar>} />
          <Route path='/pagamento' element={<Sidebar><Pagamento /></Sidebar>} />
          <Route path='/devolucao' element={<Sidebar><Devolucao /></Sidebar>} />
          <Route path='/transacao' element={<Sidebar> <Transacao /></Sidebar>} />
          <Route path='/produto' element={<Sidebar> <Produto /></Sidebar>} />
          <Route path='/fluxoCaixa' element={<Sidebar> <Caixa /></Sidebar>} />
          <Route path='/caixa' element={<Sidebar> <GestaoCaixa /></Sidebar>} />
          <Route path= {dPath} element={<Sidebar> <Utilizador userType={userType} /></Sidebar>} />
          <Route path='/funcionario' element={<Sidebar> <Funcionario /></Sidebar>} />
          <Route path='/loja' element={<Sidebar> <Loja /></Sidebar>} />
          <Route path='/fornecedor' element={<Sidebar> <Fornecedor /></Sidebar>} />
          <Route path='/categoria' element={<Sidebar> <Categoria /></Sidebar>} />
          <Route path='/report' element={<Sidebar> <Report /></Sidebar>} />
          <Route path='/adminPage' element={<Sidebar> <Administrador /></Sidebar>} />
          <Route path='/registoFuncionario' element={<Sidebar> <RegFuncCaixa /></Sidebar>} />
          <Route path='/esquecerPassword' element={<EsquecerPassword />} />
          <Route path='/getToken' element={<EnvioToken />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/settings' element={<Sidebar> <Settings /></Sidebar>} />
          <Route path='/desconto' element={<Sidebar> <Desconto /></Sidebar>} />
          <Route path='/cliente' element={<Sidebar> <Cliente /></Sidebar>} />
          <Route path='/devolucao' element={<Sidebar> <Cliente /></Sidebar>} />
          <Route path='/movimento' element={<Sidebar> <FluxoCaixa /></Sidebar>} />
          <Route path='/metodoPagamento' element={<Sidebar> <MetodoPagamento /></Sidebar>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
