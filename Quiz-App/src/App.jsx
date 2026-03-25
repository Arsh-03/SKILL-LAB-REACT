import React, { useState, useEffect} from 'react'
import Quiz from './components/quiz'
const App = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://quizapi.io/api/v1/questions?api_key=qa_sk_32d6913efdff0f7d8f3226447e61a520c83edcf0&limit=10', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setdata(await response.json());
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Quiz />
    </>
  );
}

export default App