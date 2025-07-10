// src/pages/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'quick' | 'custom' | 'puzzle'>('quick');
  const [timeControl, setTimeControl] = useState('5+0');
  const [variant, setVariant] = useState('standard');

  const startQuickGame = () => navigate('/game/standard?time=5+0');

  const createCustomGame = () => {
    navigate(`/game/${variant}?time=${timeControl}`);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Bem-vindo ao Chessy ♟️</h1>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <button onClick={() => setTab('quick')} style={tab === 'quick' ? activeBtn : btn}>Jogo Rápido</button>
        <button onClick={() => setTab('custom')} style={tab === 'custom' ? activeBtn : btn}>Criar Jogo</button>
        <button onClick={() => setTab('puzzle')} style={tab === 'puzzle' ? activeBtn : btn}>Treinar</button>
      </div>

      {tab === 'quick' && (
        <div style={card}>
          <h3>Encontre um oponente agora</h3>
          <p>Modo padrão: 5+0</p>
          <button onClick={startQuickGame} style={btn}>Jogar Agora</button>
        </div>
      )}

      {tab === 'custom' && (
        <div style={card}>
          <h3>Configurações do Jogo</h3>
          <div>
            <label>Tempo:</label>
            <select value={timeControl} onChange={(e) => setTimeControl(e.target.value)}>
              <option value="1+0">Bullet 1+0</option>
              <option value="3+0">Blitz 3+0</option>
              <option value="5+0">Blitz 5+0</option>
              <option value="10+0">Rapid 10+0</option>
              <option value="15+10">Rapid 15+10</option>
              <option value="30+0">Classical 30+0</option>
            </select>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Variante:</label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)}>
              <option value="standard">Standard</option>
              <option value="chess960">Chess960</option>
              <option value="crazyhouse">Crazyhouse</option>
              <option value="kingofthehill">King of the Hill</option>
            </select>
          </div>
          <button onClick={createCustomGame} style={{ ...btn, marginTop: '1rem' }}>Criar Jogo</button>
        </div>
      )}

      {tab === 'puzzle' && (
        <div style={card}>
          <h3>Treinar Táticas</h3>
          <button onClick={() => navigate('/puzzles/tactics')} style={btn}>Táticas</button>
          <button onClick={() => navigate('/puzzles/endgames')} style={btn}>Finais</button>
          <button onClick={() => navigate('/puzzles/openings')} style={btn}>Aberturas</button>
        </div>
      )}
    </div>
  );
};

const btn: React.CSSProperties = {
  padding: '0.5rem 1rem',
  border: '1px solid gray',
  borderRadius: '8px',
  backgroundColor: '#f0f0f0',
  cursor: 'pointer',
};

const activeBtn: React.CSSProperties = {
  ...btn,
  backgroundColor: '#333',
  color: 'white',
};

const card: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid #ccc',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
  textAlign: 'center',
};

export default Home;
