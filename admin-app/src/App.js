import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/admin' element={<MainLayout/>}>
              <Route index element={<Dashboard/>}></Route>
            </Route> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
