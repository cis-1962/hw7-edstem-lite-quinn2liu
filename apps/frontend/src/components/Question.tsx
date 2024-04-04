import { useState } from 'react';
import { useAuth } from './authentication';
import axios from 'axios';

interface QuestionProps {
    question: {
        _id: string;
        questionText: string;
        author: string;
        answer: string;
    };
}

axios.defaults.withCredentials = true;

export const Question = ({question}: QuestionProps) => {
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
                setAnswerMode(false);
                setAnswered(true);
            } else {
                alert('Question could not be answered.');
            }
        } catch (error) {
            console.log(error);
            alert(`Question could not be answered: ${error}`);
        }
    };
    
    return (
        <>
            <div>
                <p>{question.questionText}</p>
                <p>Author: {question.author}</p>
                <p>Answer: {question.answer}</p>
                {loggedIn ? (
                    <div>
                        <button onClick = {() => {
                            setAnswerMode(true);
                        }}>
                            Answer Question
                        </button>
                    
                        {answerMode ? (
                            <div>
                                <p>Answer Here:</p>
                                <div>
                                    <input type="text" placeholder={answer}
                                    value={answer}
                                    onChange={(evt) => {
                                        setAnswer(evt.target.value);
                                    }}/>
                                </div>
                                <div>
                                    <button onClick={async (evt) => {
                                        evt.preventDefault;
                                        await answerHandler();
                                    }}>Post Answer</button>
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
};

export default Question;