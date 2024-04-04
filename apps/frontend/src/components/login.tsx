import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './authentication';

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const LoginHandler = async () => {
        try {
            await login(username, password);
        } catch (error) {
            console.log(error);
            alert(`Login failed: ${error.response.data}`)
        }
    }

    return (
        <>
            <div className='flex flex-col p-8'>
                <p className=' font-semibold text-lg text-blue-500'>Log In</p>
                <form onSubmit={async (evt) => {
                    evt.preventDefault();
                    await LoginHandler();
                }}>
                    <div className=''>
                        Username: 
                        <input className='border-2 border-black rounded' type="text" value={username} 
                        onChange={(evt) => setUsername(evt.target.value)}/>
                    </div>
                    <div>
                        Password:
                        <input className='border-2 border-black rounded' type="text" value={password} 
                        onChange={(evt) => setPassword(evt.target.value)}/>
                    </div>
                    <button className='p-2 rounded bg-blue-500 text-white' type='submit'>Log In</button>
                    <div className='flex flex-row'>
                        <p className='pr-2'>Don&apos;t have an Account?</p>
                        <Link className='text-blue-500' to="/signup">Sign up here!</Link>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Login;