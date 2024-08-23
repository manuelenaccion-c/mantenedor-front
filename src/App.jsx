
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Clients } from './pages/Clients';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import './App.css'
import { ProtectedRoutes } from './utils/ProtectedRoutes';
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify
import { DashboardPage } from './pages/DashboardPage';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className='app'>
          <NavBar />
          <main className='main-content'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/dashboard/clients' element={<Clients />} />
              </Route>
            </Routes>

          </main>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
