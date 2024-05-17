import './App.css';
import "./firebase.config"
import { useEffect } from 'react';
import { init } from './background';
import Topbar from './components/topbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from './components/todos';
import Create from './components/todos/create';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/login';
import Signup from './components/signup';

function App() {

  useEffect(() => {
    return init();
  }, [])

  return (
    <div className='font-mono' >
      <Topbar />
      <canvas
        style={{
          position: "absolute",
          zIndex: 0,
          width: "100%",
          height: "90vh"
        }}
        id="canvas"
      ></canvas>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/createTodo" element={<Create />} />
        </Routes>
      </Router> */}
      <Router>
        <AuthProvider>
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
            {/* <PrivateRoute path="/createTodo" element={<Create />} /> */}
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
