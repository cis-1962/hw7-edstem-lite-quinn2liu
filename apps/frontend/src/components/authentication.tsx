import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';

interface LoginContextProps {
  loggedIn: boolean;
  user: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState('');

    const fetcher = url => axios.get(url).then(res => res.data);

    
    const {mutate} = useSWRConfig();
    const { data, error } = useSWR(
        'http://localhost:8000/account/userstatus', 
        fetcher
    );

    useEffect(() => {
        if (data && data !== 'User logged out.') {
          setLoggedIn(true);
          setUser(data);
        } else if (data) {
          setLoggedIn(false);
          setUser('');
        }
      }, [data]);

    const login = async (username: string, password: string) => {
        try {
        const response = await axios.post('http://localhost:8000/account/login', {
            username,
            password,
        });

        if (response.data === 'Login successful.') {
            console.log(response.data);
            setLoggedIn(true);
            setUser(username);
            navigate('/');
        } else {
            alert(`Login failed: ${response.data}`);
        }
        } catch (error) {
        console.log(error);
        alert(`Login failed: ${err.response.data}`);
        }
    };

    const logout = async () => {
        try {
        const response = await axios.post(
            'http://localhost:8000/account/logout',
            {},
        );
        if (response.data === 'User logged out.') {
            setLoggedIn(false);
            setUser('');
        } else {
            alert(`Logout failed!\n${response.data}`);
        }
        } catch (err) {
            console.log(err);
            alert(`Logout failed!\n${err.response.data}`);
        }
    };

  return (
    <LoginContext.Provider value={{ loggedIn, user, login, logout }}>
        {children}
    </LoginContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('Need LoginProvider with useAuth');
  }
  return context;
};