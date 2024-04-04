import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const SignupHandler = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/account/signup',
                {
                    username,
                    password,
                }
            );

            if (response.data === 'User information saved correctly!') {
                navigate('/');
            } else {
                alert(`Signup failed: ${response.data}`);
            }
        } catch (error) {
            console.log(error);
            alert(`Signup failed: ${error.response.data}`);
        }
    }

    return (
        <>
            <div className='flex flex-col p-8'>
                <p className='font-semibold text-2xl text-blue-500 py-4'>Sign Up</p>
                <form onSubmit={async (evt) => {
                    evt.preventDefault();
                    await SignupHandler();
                }}>
                    <div className='flex flex-row py-2'>
                        <p className='pr-2'>Username:</p>
                        <input className='border-2 border-black rounded' type="text" value={username} 
                        onChange={(evt) => setUsername(evt.target.value)}/>
                    </div>
                    <div className='flex flex-row py-2'>
                        <p className='pr-2'>Password:</p>
                        <input className='border-2 border-black rounded' type="text" value={password} 
                        onChange={(evt) => setPassword(evt.target.value)}/>
                    </div>
                    <button className='py-2 px-4 rounded bg-blue-500 text-white' type='submit'>Sign Up</button>
                    <div className='flex flex-row'>
                        <p className='pr-2'>Already have an Account?</p>
                        <Link className='text-blue-500' to="/login">Log in here!</Link>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Signup;