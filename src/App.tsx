// App.tsx
import React from 'react';

const App: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div style={styles.container}>
      <h1>Hello from TypeScript + React! 👋</h1>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  }
};

export default App;
