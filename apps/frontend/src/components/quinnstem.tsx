import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../components/authentication';
import useSWR from 'swr';
import Question from './Question';

export default function QuinnStem() {
    const { loggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currQuestion, setCurrQuestion] = useState(0);
    let updateQuestion = 0;
    
    const logoutHandler = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const fetcher = url => axios.get(url).then(res => res.data);

    const {data, error} = useSWR(
        'http://localhost:8000/questions/questions',
        fetcher);
    
    useEffect(() => {
        if (!data || error) {
            console.log(`Question fetching error: ${error}`)
        } else if (data) {
            setQuestions(data);
        }
    }, );

    return (
        <>  
        <div className='p-8'>
            <div className='flex flex-row justify-between items-start'>
                <div className='text-xl font-semibold text-blue-500 pb-8'>Welcome to QuinnStem!</div>
                {loggedIn ?(
                <div className='flex flex-row items-center'>
                    <p className='pr-4 text-semibold '>Hello, {user}</p>
                    <button className='p-1 bg-blue-500 text-white rounded' onClick={async (evt) => {
                        evt.preventDefault;
                        logoutHandler();
                    }} >Logout</button>
                </div>) : (
                    null
                )
                }
            </div>
            <div className='flex flex-col'>
                {!loggedIn ?(
                <div>
                    <button type='submit'>
                        <Link to={'/login'}>
                            Log in to submit a question
                        </Link>
                    </button>
                </div>) : (
                <div>
                    <button type='submit'>
                        <Link className='p-2 bg-green-400 rounded text-white' to={"/questions/add"}>Post a question! +</Link>
                    </button>
                </div>
                )}
            </div>
            <div>
                {questions.length > 0 ? (
                    <Question key={updateQuestion} question={questions[currQuestion]}/>
                ) : (
                    <div>question does not exist</div>
                )}
            </div>
        </div>
    </>
    );
}