// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'; // funciona se o arquivo for "home.tsx"



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Adicione outras rotas aqui, por exemplo: */}
        {/* <Route path="/play" element={<Play />} /> */}
        {/* <Route path="/tournaments" element={<Tournaments />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
