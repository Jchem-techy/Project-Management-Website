import { BrowserRouter, Routes, Route } from 'react-router-dom';

// styles
import './App.css';
import { useAuthContext } from './hooks/useAuthContext';
// pages & components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Login />} />
              <Route path='/create' element={user ? <Create /> : <Login />} />
              <Route path='/login' element={user ? <Dashboard /> : <Login />} />
              <Route
                path='/signup'
                element={user ? <Dashboard /> : <Signup />}
              />
              <Route
                path='/projects/:projectID'
                element={user ? <Project /> : <Login />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
