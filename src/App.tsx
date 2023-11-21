import './App.css';
import React, { useState, useEffect } from 'react';
import { axiosWithNoToken } from './Axios';

type RequestSignup = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDataSignup = async ({
      name,
      email,
      password,
      passwordConfirm,
    }: RequestSignup) => {
      const data = await axiosWithNoToken.post('/api/signup', {
        name,
        email,
        password,
        passwordConfirm,
      });
      console.log(data);
    };

    fetchDataSignup({
      name: '최우혁',
      email: 'abc@gmail.com',
      password: 'abcabcabc',
      passwordConfirm: 'abcabcabc',
    });
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
