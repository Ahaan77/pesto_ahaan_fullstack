import './App.css';
import "./firebase.config"
import { useEffect } from 'react';
import { init } from './background';
import Topbar from './components/Topbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from './components/Todos';
import Create from './components/Todos/create';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  useEffect(() => {
    return init();
  }, [])

  return (
    <div className='font-mono' >
     
      <canvas
        style={{
          position: "absolute",
          zIndex: 0,
          width: "100%",
          height: "90vh"
        }}
        id="canvas"
      ></canvas>
      <Router>
        <AuthProvider>
        <Topbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Todos />
                </PrivateRoute>
              }
            />
            <Route
              path="/createTodo"
              element={
                <PrivateRoute>
                  <Create />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
