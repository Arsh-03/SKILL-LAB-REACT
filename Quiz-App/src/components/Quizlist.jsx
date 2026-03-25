import React from 'react';

const QuizList = ({ question, option, handleClick, currentAnswer }) => {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {option && option.map((opt) => (
          <li 
            key={opt.id} 
            className={currentAnswer === opt.id ? 'selected' : ''} 
            onClick={() => handleClick(opt)}  
          >
            {opt.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;