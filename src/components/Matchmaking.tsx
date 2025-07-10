import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
  transports: ['websocket'],
  autoConnect: false,
});

interface MatchStatus {
  status: 'idle' | 'searching' | 'found' | 'error';
  message: string;
}

const Matchmaking: React.FC = () => {
  const [status, setStatus] = useState<MatchStatus>({
    status: 'idle',
    message: 'Click to find a match',
  });

  useEffect(() => {
    socket.connect();

    socket.on('match-found', (roomId: string) => {
      setStatus({ status: 'found', message: `Match found! Redirecting...` });
      setTimeout(() => {
        window.location.href = `/game/${roomId}`;
      }, 1500);
    });

    socket.on('match-error', (msg: string) => {
      setStatus({ status: 'error', message: msg });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startSearch = () => {
    if (status.status === 'idle' || status.status === 'error') {
      setStatus({ status: 'searching', message: 'Searching for an opponent...' });
      socket.emit('find-match');
    }
  };

  return (
    <div className="matchmaking-container" style={styles.container}>
      <h2>Matchmaking</h2>
      <p>{status.message}</p>
      <button
        style={styles.button}
        onClick={startSearch}
        disabled={status.status === 'searching' || status.status === 'found'}
      >
        {status.status === 'searching' ? 'Searching...' : 'Find Match'}
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    background: '#1e1e2f',
    borderRadius: '12px',
    color: '#fff',
    maxWidth: '400px',
    margin: '3rem auto',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Matchmaking;
