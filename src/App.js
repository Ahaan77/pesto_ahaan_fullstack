import './App.css';
import "./firebase.config"
import { useEffect } from 'react';
import { init } from './background';
import Topbar from './components/topbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from './components/todos';
import Create from './components/todos/create';

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
      <Router>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/createTodo" element={<Create />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
