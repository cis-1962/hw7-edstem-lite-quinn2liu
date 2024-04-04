import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authentication';
import axios from 'axios';

export const NewQuestion = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [question, setQuestion] = useState('');
    
    const addQuestion = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/questions/add',
                {
                    author: user,
                    questionText: question,
                },
            );
            if (response.data === 'Question saved.') {
                navigate('/');
            } else {
                alert('Question could not be added.');
            }
        } catch (error) {
            console.log(error);
            alert(`Question could not be added: ${error}`);
        }
    };
    
    return (
        <>
            <div className='bg-gray-400 w-screen h-screen flex flex-col items-center justify-center'>
                <div className='w-1/2 rounded-3xl bg-white flex flex-col p-8'>
                    <p className='text-black font-bold text-2xl'>Add Question!</p>
                    <input className='h-1/4 py-8 border-2 box-border' value={question} onChange={(evt) => setQuestion(evt.target.value)}/>
                    <button className='p-2 bg-green-400 text-white rounded w-1/2' type='submit' onClick={async (evt) => {
                        evt.preventDefault;
                        await addQuestion();
                    }}>Post Question</button>
                </div>
            </div>
        </>
    )
};

export default NewQuestion;