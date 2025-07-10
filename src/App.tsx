// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// Importe aqui os outros componentes/rotas quando estiverem prontos
// import About from './pages/About';
// import Game from './pages/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        {/* Adicione outras rotas aqui, por exemplo: */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/game" element={<Game />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
