import { Link, useNavigate } from 'react-router-dom';
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

    const logoutHandler = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuestions = (currQuestion, newAnswer) => {
        questions[currQuestion].answer = newAnswer;
    }

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
    }, [data, error]);

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
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                    {!loggedIn ?(
                    <div>
                        <button className='p-2 bg-blue-400 text-white rounded-md' type='submit'>
                            <Link to={'/login'}>
                                Log in to submit a question
                            </Link>
                        </button>
                    </div>) : (
                    <div>
                        <button type='submit'>
                            <Link className='w-auto p-2 bg-green-400 rounded text-white' to={"/questions/add"}>Post a question! +</Link>
                        </button>
                    </div>
                    )}
                    <ul className='pt-4 flex flex-col'>
                    {questions.map((question, index) => {
                        return (
                            <button className='px-20 border-2 py-8 mb-4 border-gray-400 rounded-lg'
                                key={question._id} 
                                onClick={() => setCurrQuestion(index)}
                                >
                                <p>{question.questionText}</p>
                            </button>
                        );
                    })}
                    </ul>
                </div>
                <div className='p-8 flex-grow'>
                    {questions.length > 0 ? (
                        <Question updateQuestions={updateQuestions} currQuestion={currQuestion} question={questions[currQuestion]} />
                    ) : (
                        null
                    )}
                </div>
            </div>
            
        </div>
    </>
    );
}