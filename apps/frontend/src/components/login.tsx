import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './authentication';

export const Login = () => {
    const { login } = useAuth();
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
                <p className=' font-semibold text-2xl text-blue-500 py-4'>Log In</p>
                <form onSubmit={async (evt) => {
                    evt.preventDefault();
                    await LoginHandler();
                }}>
                    <div className='flex flex-row py-2'>
                        <p className='pr-2'>Username: </p>
                        <input className='border-2 border-black rounded' type="text" value={username} 
                        onChange={(evt) => setUsername(evt.target.value)}/>
                    </div>
                    <div className='flex flex-row py-2'>
                        <p className='pr-2'>Password:</p>
                        <input className='border-2 border-black rounded' type="text" value={password} 
                        onChange={(evt) => setPassword(evt.target.value)}/>
                    </div>
                    <button className='py-2 px-4 rounded bg-blue-500 text-white' type='submit'>Log In</button>
                    <div className='flex flex-row py-2'>
                        <p className='pr-2'>Don&apos;t have an Account?</p>
                        <Link className='text-blue-500' to="/signup">Sign up here!</Link>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Login;