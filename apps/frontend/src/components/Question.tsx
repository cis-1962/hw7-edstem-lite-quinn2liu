import { useState, useEffect } from 'react';
import { useAuth } from './authentication';
import axios from 'axios';

interface QuestionProps {
    question: {
        _id: string;
        questionText: string;
        author: string;
        answer: string;
    };
    currQuestion: number;
    updateQuestions: (number, string) => void;
}

axios.defaults.withCredentials = true;

export const Question = ({question, currQuestion, updateQuestions}: QuestionProps) => {
    const _id = question._id;
    const { loggedIn } = useAuth();
    const [answer, setAnswer] = useState('');
    const [answered, setAnswered] = useState(false);
    const [answerMode, setAnswerMode] = useState(false);

    const answerHandler = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/questions/answer',
                {
                    _id,
                    answer: answer,
                }, {
                    withCredentials: true,
                }
            );
            if (response.data === 'Question answered.') {
                console.log(response.data);
                setAnswerMode(false);
                setAnswered(true);
                updateQuestions(currQuestion, answer);
            } else {
                alert('Question could not be answered.');
            }
        } catch (error) {
            console.log(error);
            alert(`Question could not be answered: ${error}`);
        }
    };

    useEffect(() => {
        if (answered) {
          setAnswered(false);
        }
    }, [answered]);
    
    return (
        <>
            <div className='flex flex-col border-2 border-gray-400 rounded-xl'>
                <p className='text-2xl font-bold pt-4 pl-4'>{question.questionText}</p>
                <p className='text-lg font-semibold pt-2 pl-4'>Author: {question.author}</p>
                <p className='py-2 pl-4 text-lg'>Answer: {question.answer}</p>
                {loggedIn ? (
                    <div className='pt-2 pl-4 pb-4'>
                        <button className='p-2 rounded-md bg-green-400 text-white' onClick = {() => {
                            setAnswerMode(!answerMode);
                        }}>
                            Answer Question
                        </button>
                    
                        {answerMode ? (
                            <div className='flex flex-col'>
                                <div className='flex flex-row py-4 items-center'>
                                    <p className='pr-2'>Answer Here:</p>
                                    <input className='border-2 border-gray-400 rounded-md w-2/3 px-2 py-4' type="text" placeholder={answer}
                                    value={answer}
                                    onChange={(evt) => {
                                        setAnswer(evt.target.value);
                                    }}/>
                                </div>
                                <div>
                                    <button className='p-2 bg-blue-400 text-white rounded-md' onClick={async (evt) => {
                                        evt.preventDefault;
                                        setAnswerMode(!answerMode);
                                        await answerHandler();
                                    }}>Post Answer</button>
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                ) : (
                    null
                )}
            </div>
        </>
    )
};

export default Question;