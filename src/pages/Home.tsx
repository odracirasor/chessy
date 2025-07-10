// src/pages/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'quick' | 'custom' | 'puzzle'>('quick');
  const [timeControl, setTimeControl] = useState('5+0');
  const [variant, setVariant] = useState('standard');

  const quickPlay = () => navigate('/game/standard?time=5+0');
  const createGame = () => navigate(`/game/${variant}?time=${timeControl}`);

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>♟️ Bem-vindo ao <strong>Chessy</strong></h1>
      <p style={styles.subtitle}>Como deseja jogar hoje?</p>

      <div style={styles.tabs}>
        <TabButton label="Jogo Rápido" active={tab === 'quick'} onClick={() => setTab('quick')} />
        <TabButton label="Criar Jogo" active={tab === 'custom'} onClick={() => setTab('custom')} />
        <TabButton label="Treinar" active={tab === 'puzzle'} onClick={() => setTab('puzzle')} />
      </div>

      <section style={styles.panel}>
        {tab === 'quick' && (
          <QuickPlay onPlay={quickPlay} />
        )}

        {tab === 'custom' && (
          <CustomGame
            timeControl={timeControl}
            setTimeControl={setTimeControl}
            variant={variant}
            setVariant={setVariant}
            onCreate={createGame}
          />
        )}

        {tab === 'puzzle' && (
          <PuzzleSection onNavigate={navigate} />
        )}
      </section>
    </main>
  );
};

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.tab,
      backgroundColor: active ? '#1e293b' : '#e2e8f0',
      color: active ? '#fff' : '#1e293b',
      fontWeight: active ? 600 : 400,
    }}
  >
    {label}
  </button>
);

const QuickPlay: React.FC<{ onPlay: () => void }> = ({ onPlay }) => (
  <div style={styles.card}>
    <h3>🎯 Partida Rápida</h3>
    <p>Combine-se rapidamente com alguém no modo padrão (5+0).</p>
    <button style={styles.playButton} onClick={onPlay}>Jogar Agora</button>
  </div>
);

const CustomGame: React.FC<{
  timeControl: string;
  setTimeControl: (value: string) => void;
  variant: string;
  setVariant: (value: string) => void;
  onCreate: () => void;
}> = ({ timeControl, setTimeControl, variant, setVariant, onCreate }) => (
  <div style={styles.card}>
    <h3>⚙️ Jogo Personalizado</h3>

    <div style={styles.inputGroup}>
      <label>Controle de Tempo:</label>
      <select style={styles.select} value={timeControl} onChange={(e) => setTimeControl(e.target.value)}>
        {['1+0', '3+0', '5+0', '10+0', '15+10', '30+0'].map((tc) => (
          <option key={tc} value={tc}>{tc}</option>
        ))}
      </select>
    </div>

    <div style={styles.inputGroup}>
      <label>Variante:</label>
      <select style={styles.select} value={variant} onChange={(e) => setVariant(e.target.value)}>
        {['standard', 'chess960', 'crazyhouse', 'kingofthehill'].map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>

    <button style={styles.playButton} onClick={onCreate}>Criar Jogo</button>
  </div>
);

const PuzzleSection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => (
  <div style={styles.card}>
    <h3>🧩 Treinar</h3>
    <p>Melhore suas habilidades com exercícios:</p>
    <div style={styles.puzzleList}>
      <PuzzleCard emoji="🧠" label="Táticas" path="/puzzles/tactics" onClick={onNavigate} />
      <PuzzleCard emoji="👑" label="Finais" path="/puzzles/endgames" onClick={onNavigate} />
      <PuzzleCard emoji="🚪" label="Aberturas" path="/puzzles/openings" onClick={onNavigate} />
    </div>
  </div>
);

const PuzzleCard: React.FC<{ emoji: string; label: string; path: string; onClick: (p: string) => void }> = ({
  emoji,
  label,
  path,
  onClick,
}) => (
  <div onClick={() => onClick(path)} style={styles.puzzleCard}>
    <div style={{ fontSize: '2rem' }}>{emoji}</div>
    <h4>{label}</h4>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#555',
    marginBottom: '2rem',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  tab: {
    padding: '0.6rem 1.2rem',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    transition: '0.2s ease',
  },
  panel: {
    animation: 'fadeIn 0.3s ease-in-out',
  },
  card: {
    background: '#f8fafc',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
  },
  playButton: {
    marginTop: '1rem',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
  },
  inputGroup: {
    marginTop: '1rem',
    textAlign: 'left',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.3rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  puzzleList: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  puzzleCard: {
    flex: 1,
    minWidth: '100px',
    background: '#e2e8f0',
    borderRadius: '10px',
    padding: '1rem',
    cursor: 'pointer',
    transition: '0.2s ease',
    textAlign: 'center',
  },
};

export default Home;
