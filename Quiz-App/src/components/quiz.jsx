import React, { useState, useEffect } from 'react';
import QuizList from './Quizlist';
import './QuizApp.css';

const Quiz = () => {
    const [data, setdata] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null); 
    const [score, setScore] = useState(0); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://quizapi.io/api/v1/questions?api_key=qa_sk_32d6913efdff0f7d8f3226447e61a520c83edcf0&limit=10');
                const result = await response.json();
                if (result && result.data) setdata(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    
    const handleClick = (optionObj) => {
        setCurrentAnswer(optionObj.id);  
        if (optionObj.isCorrect && currentAnswer === null) {
            setScore(score + 1);
        }
    };

    
    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer(null); 
    };

    return (
        <div className="quiz-container">
            
            {currentQuestionIndex < data.length ? (
                <div>
                    <QuizList 
                        question={data[currentQuestionIndex]?.text} 
                        option={data[currentQuestionIndex]?.answers}
                        handleClick={handleClick} 
                        currentAnswer={currentAnswer} 
                    />
                    
                    <button 
                        disabled={currentAnswer === null} 
                        className={currentAnswer === null ? 'button-disable' : 'button'}
                        onClick={handleNextQuestion}
                    >
                        Next Question
                    </button>
                </div>
            ) : (
                
                <div>
                    <h2>Quiz Completed!</h2>
                    <div>Your Score is {score} out of {data.length}</div>
                </div>
            )}
        </div>
    );
}

export default Quiz;