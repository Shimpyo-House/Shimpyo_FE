import './App.css';
import React, { useState, useEffect } from 'react';
import { axiosWithAccessToken, axiosWithNoToken } from './Axios';

type RequestSignup = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type RequestSignin = {
  email: string;
  password: string;
};

type RequestMembers = {
  password?: string;
  passwordConfirm?: string;
  photoURL?: string;
};

type RequestOrders = {
  memberId: string;
  productId: string;
  checkInTime: string;
  checkOutTime: string;
  payMethod: string;
  totalAmount: number;
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
      console.log('Signup', data);
    };

    const fetchDataSignin = async ({ email, password }: RequestSignin) => {
      const data = await axiosWithNoToken.post('/api/signin', {
        email,
        password,
      });
      console.log('Signin', data);
    };

    const fetchDataRefresh = async () => {
      const data = await axiosWithNoToken.post('/api/refresh');
      console.log('refresh', data);
    };

    const fetchDataMembers = async ({
      password,
      passwordConfirm,
      photoURL,
    }: RequestMembers) => {
      const data = await axiosWithAccessToken.patch('/api/members', {
        password,
        passwordConfirm,
        photoURL,
      });
      console.log('members', data);
    };

    const fetchDataOrders = async ({
      memberId,
      productId,
      checkInTime,
      checkOutTime,
      payMethod,
      totalAmount,
    }: RequestOrders) => {
      const data = await axiosWithAccessToken.post('/api/orders', {
        memberId,
        productId,
        checkInTime,
        checkOutTime,
        payMethod,
        totalAmount,
      });
      console.log('orders', data);
    };

    fetchDataSignup({
      name: '최우혁',
      email: 'abc@gmail.com',
      password: 'abcabcabc',
      passwordConfirm: 'abcabcabc',
    });
    fetchDataSignin({
      email: 'abc@gmail.com',
      password: 'abcabcabc',
    });
    fetchDataRefresh();
    fetchDataMembers({
      photoURL: '',
      password: 'abcabcabc',
      passwordConfirm: 'abcabcabc',
    });
    // API 명세에 checkInTime이 LocalDateTime이라 돼있는데 확실하지 않아 일단 string 타입으로 넣어놨습니다 추후 백엔드분과 얘기가 필요해 보입니다
    fetchDataOrders({
      memberId: '123',
      productId: '456',
      checkInTime: '2023-11-20 13:00:00',
      checkOutTime: '2023-11-22 12:00:00',
      payMethod: 'KAKAO_PAY',
      totalAmount: 95000,
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
