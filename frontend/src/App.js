import './App.css';
import { BrowserRouter, Outlet, Routes, Route, useNavigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './contexts/auth.context';

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }/>
        </Routes>
      
        <Outlet />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
