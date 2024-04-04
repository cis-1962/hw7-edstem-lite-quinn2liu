import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginProvider } from './components/authentication'
import Signup from './components/signup';
import Login from './components/login';
import QuinnStem from './components/quinnstem';
import NewQuestion from './components/NewQuestion';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/questions/add" element={<NewQuestion />} />
          <Route path="/" element={<QuinnStem/>} />
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
