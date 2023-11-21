import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const fetchData = async ({ name, email, password, passwordConfirm }) => {
  //     const data = await axiosWithNoToken.post('/api/signup', {
  //       name,
  //       email,
  //       password,
  //       passwordConfirm,
  //     });
  //     data.json().then((jsonData) => {
  //       console.log(jsonData);
  //     });
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/products');
      data.json().then((jsonData) => {
        console.log(jsonData);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p className="header">
          🚀 Vite + React + Typescript 🤘 & <br />
          Eslint 🔥+ Prettier
        </p>

        <div className="body">
          <button type="button" onClick={() => setCount((prev) => prev + 1)}>
            🪂 Click me : {count}
          </button>

          <p>
            {' '}
            Don&apos;t forgot to install Eslint and Prettier in Your Vscode.
          </p>

          <p>
            Mess up the code in <code>App.tsx </code> and save the file.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {' | '}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
